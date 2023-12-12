<template>
  <div :class="$style.mapWrapper">
    <ActionBar />
    <DaycareDetail
      v-if="!isEmpty(currentDaycareInfo)"
      :key="currentDaycareInfo.id"
      :daycare-info="currentDaycareInfo"
      :is-open="isDetailOpen"
      @toggle="toggleDetail"
      @close="closeDetail"
    />
    <div id="olmap" :class="$style.olMap"></div>
  </div>
</template>

<script setup>
import { ref, unref, onMounted, watch, computed } from 'vue';
import isEmpty from 'lodash.isempty';
import find from 'lodash.find';
import ActionBar from './ActionBar.vue';
import DaycareDetail from './DaycareDetail.vue';

// openlayers map
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { OSM, Vector as VectorSource } from 'ol/source';
import {
  Icon,
  Style,
} from 'ol/style';
import {
  Modify,
  Select,
  defaults as defaultInteractions,
} from 'ol/interaction';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import { DAYCARE_TYPE } from '../../enums/daycare';
import { useMapStore } from '../../stores/map.js';
import { storeToRefs } from 'pinia';
import { daycares } from '../../api/daycare.js';

const isDetailOpen = ref(false);
const toggleDetail = () => {
  isDetailOpen.value = !unref(isDetailOpen);
};
const closeDetail = () => {
  isDetailOpen.value = false;
};

// format data from API
const daycareInfoListData = daycares.map(d => {
  const {
    daycare_name: name,
    Latitude,
    Longitude,
    type,
    address_city,
    address_district,
    address_street,
    infant_capacity: capacity,
    phone: phoneNumber,
    monthly_fee: fee,
    operation_hours: operationHours,
    facebook_url: facebookUrl,
    daycare_photo_url: daycarePhotoUrl,
    status,
    current_waitlist_count: currentWaitlistCount,
  } = d.fields;
  const coordinate = [Longitude, Latitude];
  const address = `${address_city}${address_district}${address_street}`;
  const getDaycareType = type => {
    if(type === '公設民營') return 0;
    if(type === '準公共') return 1;
    if(type === '私立') return 2;
  };

  return {
    id: d.id,
    coordinate,
    daycareType: getDaycareType(type),
    daycarePhotoUrl,
    name,
    currentWaitlistCount,
    phoneNumber,
    address,
    capacity,
    operationHours,
    fee,
    facebookUrl,
    status,
  };
});
console.log(daycareInfoListData);

const daycareInfoList = computed(() => {
  const result = DAYCARE_TYPE.reduce((acc, type) => {
    acc[type] = [];
    return acc;
  }, {});
  daycareInfoListData.forEach(daycareInfo => {
    const currentDaycareType = daycareInfo.daycareType;
    result[DAYCARE_TYPE[currentDaycareType]].push(daycareInfo);
  });
  return result;
});

const getMarkerIconColorByDaycareType = daycareType => {
  if(daycareType === 0) return '#EA580C'; // public
  if(daycareType === 1) return '#9A3412'; // semi-public
  if(daycareType === 2) return '#374151'; // private
  if(daycareType === 3) return '#9CA3AF'; // public (coming soon)
  return 'white'; // default
}

function changeFillColor(svgString, newColor) {
    console.log(newColor);
    return svgString.replace(/variable/g, `${newColor}`);
}

function svgToDataURL(svgString) {
    return "data:image/svg+xml;base64," + btoa(svgString);
}


/**
 * @typedef {Object} DaycareInfo
 * @property {string} id - unique identifier of the daycare
 * @property {Array} coordinate - [lng, lat]
 */

/**
 * Create a marker based on latitude and longitude coordinates.
 *
 * @param {DaycareInfo} daycareInfo
 * @returns {Feature}
 */
// svg's color property (fill, stroke) should be `white` by default
const createDaycareFeature = daycareInfo => {
  const feature = new Feature({
    geometry: new Point(fromLonLat(daycareInfo.coordinate))
  })
  const { id, daycareType } = daycareInfo;
  
  feature.setId(id);
  feature.set('daycareId', id);
  feature.set('daycareType', daycareType);
  feature.set('daycareInfo', daycareInfo);
  // can't import from svg file
  const locationMarkerSvg= '<svg id="Layer_1" data-name="Layer 1" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.25 46.49"><defs><style>.cls-1{fill:#fff;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:variable;}</style></defs><path class="cls-1" d="M41.56,9.93a19.69,19.69,0,0,0-20.8-8.61,18.43,18.43,0,0,0-6.33,2.62,19.65,19.65,0,0,0-9,17.12,20.23,20.23,0,0,0,6.07,13.65l12,12a2.15,2.15,0,0,0,3,0L38.88,34.38a19.65,19.65,0,0,0,5.35-17.91A18.64,18.64,0,0,0,41.56,9.93Z" transform="translate(-5.37 -0.87)"/><path class="cls-2" d="M12.63,8.13A17.49,17.49,0,0,1,37.37,32.87L25,45.25,12.63,32.87A17.48,17.48,0,0,1,12.63,8.13ZM25,25.5a5,5,0,1,0-5-5A5,5,0,0,0,25,25.5Z" transform="translate(-5.37 -0.87)"/></svg>'
  const color = getMarkerIconColorByDaycareType(daycareType)
  const locationMarker = changeFillColor(locationMarkerSvg, color)


  const style = new Style({
    image: new Icon({
      scale: 0.8,
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: svgToDataURL(locationMarker),
    }),
  });
  feature.setStyle(style)
  return feature;
};

/**
 * Create features for a list of daycareInfos.
 *
 * @param {Array} daycareInfoList - array of DaycareInfo objects.
 * @returns {Array.<Feature>}
 */
const createDaycareFeatures = daycareInfoList => {
  const featureList = [];
  unref(daycareInfoList).forEach(daycareInfo => {
    featureList.push(createDaycareFeature(daycareInfo));
  });
  return featureList;
};

const clickHandler = ({ coordinate, feature }) => {
  console.log('icon clicked!', {
    feature,
    coordinate,
  });
  openDaycareDetail(feature);
};

const getDaycareInfoById = ({ daycareId, daycareType }) => {
  return find(unref(daycareInfoList)[DAYCARE_TYPE[daycareType]], daycareInfo => daycareInfo.id === daycareId);
};

const currentDaycareInfo = ref({});
const openDaycareDetail = (feature) => {
  const daycareId = feature.get('daycareId');
  const daycareType = feature.get('daycareType');

  currentDaycareInfo.value = getDaycareInfoById({ daycareId, daycareType });
  isDetailOpen.value = true;

  console.log('openDaycareDetail', {
    feature,
    daycareId,
    daycareType,
  });
};

function getOlMapInteractions() {
  const getStyle = (feature) => {
    const daycareType = feature.get('daycareType');
    // can't import from svg file
    const locationSelectedMarkerSvg= '<svg id="Layer_1" data-name="Layer 1" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.26 47.49"><defs><style>.cls-1{fill:#fff;}.cls-1,.cls-3{fill-rule:evenodd;}.cls-2,.cls-3{fill:variable;}</style></defs><path class="cls-1" d="M41.56,9.93a19.69,19.69,0,0,0-20.8-8.61,18.43,18.43,0,0,0-6.33,2.62,19.65,19.65,0,0,0-9,17.12,20.23,20.23,0,0,0,6.07,13.65l12,12a2.15,2.15,0,0,0,3,0L38.88,34.38a19.65,19.65,0,0,0,5.35-17.91A18.64,18.64,0,0,0,41.56,9.93Z" transform="translate(-4.87 -0.37)"/><path class="cls-2" d="M25,47.86a2.68,2.68,0,0,1-1.88-.77l-12-12a20.6,20.6,0,0,1-6.22-14A20.22,20.22,0,0,1,14.16,3.52,18.67,18.67,0,0,1,20.66.83,20.12,20.12,0,0,1,42,9.65a19,19,0,0,1,2.74,6.72,20,20,0,0,1-5.49,18.36L26.88,47.09A2.68,2.68,0,0,1,25,47.86ZM25,1.37a19.91,19.91,0,0,0-4.17.44A17.73,17.73,0,0,0,14.7,4.36,19.26,19.26,0,0,0,5.88,21a19.62,19.62,0,0,0,5.93,13.31l12,12a1.67,1.67,0,0,0,2.34,0L38.52,34a19.08,19.08,0,0,0,5.22-17.46,18.27,18.27,0,0,0-2.6-6.36h0A19.07,19.07,0,0,0,25,1.37Z" transform="translate(-4.87 -0.37)"/><path class="cls-3" d="M12.63,8.13A17.49,17.49,0,0,1,37.37,32.87L25,45.25,12.63,32.87A17.48,17.48,0,0,1,12.63,8.13ZM25,25.5a5,5,0,1,0-5-5A5,5,0,0,0,25,25.5Z" transform="translate(-4.87 -0.37)"/></svg>'
    const color = getMarkerIconColorByDaycareType(daycareType)
    const locationSelectedMarker = changeFillColor(locationSelectedMarkerSvg, color)
      
    return new Style({
      zIndex: 100,
      image: new Icon({
        scale: 0.8,
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: svgToDataURL(locationSelectedMarker),
      }),
    });
  }
  const select = new Select({
    wrapX: false,
    style: getStyle,
  });
  const modify = new Modify({
    features: select.getFeatures(),
    style: null, // Set style to null to use the default styling for modify interaction
  })
  return defaultInteractions().extend([select, modify]);
}

let olMap;
onMounted(() => {
  // Tile style
  const tile = new TileLayer({
    source: new OSM() // use OpenStreetMap as the base layer
  });
  tile.on('prerender', (e) => {
    if(e.context) {
      const context = e.context;
      context.filter = 'grayscale(85%)';
      context.globalCompositeOperation = 'source-over';
    }
  });
  tile.on('postrender', (e) => {
    if(e.context) {
      const context = e.context;
      context.filter = 'none';
    }
  });

  // Create a new OpenLayers Map
  olMap = new OlMap({
    interactions: getOlMapInteractions(),
    target: 'olmap',
    layers: [tile],
    view: new View({
      center: fromLonLat([120.6198330, 24.1772109]),
      zoom: 15, // Set an initial zoom level
    })
  });

  // 在地圖上添加一個放置圖標的 Vector 圖層
  const createVectorLayer = (daycareType) => {
    const vectorLayer = new VectorLayer({ source: new VectorSource() });
    vectorLayer.setProperties({ daycareType });
    olMap.addLayer(vectorLayer);
    return vectorLayer.getSource();
  };

  const addFeaturesToVectorSource = (vectorSource, features) => {
    vectorSource.addFeatures(features);
  };

  DAYCARE_TYPE.forEach(type => {
    const vectorSource = createVectorLayer(type);
    const featureList = createDaycareFeatures(unref(daycareInfoList)[type]);
    addFeaturesToVectorSource(vectorSource, featureList);
  });

  // handle feature click
  olMap.on('click', (event) => {
    const [lng, lat] = fromLonLat(event.coordinate);
    const feature = olMap.forEachFeatureAtPixel(event.pixel, feature => {
      return feature;
    });
    if(feature) {
      return clickHandler({
        coordinate: [lng, lat],
        feature,
      });
    }
  });

  olMap.on('pointermove', (event) => {
    const pixel = olMap.getEventPixel(event.originalEvent);
    const hit = olMap.hasFeatureAtPixel(pixel);
    olMap.getViewport().style.cursor = hit ? 'pointer' : '';
  });
});

const store = useMapStore();
const {
  selectedFilter,
} = storeToRefs(store);
watch(() => unref(selectedFilter).size, () => {
  olMap.getLayers().forEach((layer) => {
    const daycareType = layer.get('daycareType');
    if(daycareType === undefined) return;
    if(unref(selectedFilter).has(daycareType)) {
      layer.setVisible(true);
    } else {
      layer.setVisible(false);
    }
  });
});
</script>

<style>
.ol-zoom {
  top: auto;
  bottom: 100px;
  border-radius: 9px;
  font-size: 32px;
  background: transparent;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background: transparent;
  }

  .ol-zoom-in,
  .ol-zoom-out {
    border-radius: 4px;
  }
}
</style>

<style module>
.mapWrapper {
  position: relative;
  width: 100%;
  /* TODO: hardcoded 56px */
  height: calc(100vh - 56px);

  @media (min-width: 768px) {
    height: calc(100vh - 48px);
  }
}

.olMap {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
