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

import LocationMarkerSemipublicUrl from '../../../src/components/icons/location-marker-semipublic.svg';
import LocationMarkerSemipublicSelectedUrl from '../../../src/components/icons/location-marker-semipublic-selected.svg';
import LocationMarkerPrivateUrl from '../../../src/components/icons/location-marker-private.svg';
import LocationMarkerPrivateSelectedUrl from '../../../src/components/icons/location-marker-private-selected.svg';
import LocationMarkerPublicUrl from '../../../src/components/icons/location-marker-public.svg';
import LocationMarkerPublicSelectedUrl from '../../../src/components/icons/location-marker-public-selected.svg';
import { mapData } from '../../api/daycare.js';

const isDetailOpen = ref(false);
const toggleDetail = () => {
  isDetailOpen.value = !unref(isDetailOpen);
};
const closeDetail = () => {
  isDetailOpen.value = false;
};

const daycareInfoListData = mapData.map(d => {
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
    imageUrl: 'https://placehold.co/336x190', // TODO
    name,
    currentWait: 0, // TODO
    phoneNumber,
    address,
    capacity,
    operationHours,
    fee,
    facebook: 'https://facebook.com', // TODO
  };
});
console.log(daycareInfoListData);

// TODO: call API to get real data
// const daycareInfoListData = [
//   {
//     id: 'A0001',
//     coordinate: [120.5268019, 24.2512537], // lng, lat
//     daycareType: 0,
//     imageUrl: 'https://placehold.co/336x190',
//     name: '臺中市公設民營梧棲三民托嬰中心',
//     currentWait: 16, // 目前候補人數
//     phoneNumber: '09123123123', // 聯絡電話
//     address: '臺中市地址', // 地址
//     capacity: 20, // 收托人數
//     operationHours: '一~五   8:00~18:00 延托最早自7:30，最晚至18:30', // 收托時間
//     fee: 15000, // 每月平均收費總額
//     facebook: 'https://facebook.com',
//   },
//   {
//     id: 'A0002',
//     coordinate: [120.5460794, 24.2486667],
//     daycareType: 2,
//     imageUrl: 'https://placehold.co/336x190',
//     name: '臺中市私立小梧桐托嬰中心',
//     currentWait: 16, // 目前候補人數
//     phoneNumber: '09123123123', // 聯絡電話
//     address: '臺北市地址', // 地址
//     capacity: 20, // 收托人數
//     operationHours: '一~五   8:00~18:00 延托最早自7:30，最晚至18:30', // 收托時間
//     fee: 35000, // 每月平均收費總額
//     facebook: 'https://facebook.com',
//   },
// ];

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

const getMarkerIconByDaycareType = (daycareType) => {
  switch (daycareType) {
    case 1:
      return LocationMarkerSemipublicUrl;
    case 2:
      return LocationMarkerPrivateUrl;
    case 0:
    default:
      return LocationMarkerPublicUrl;
  }
};

const getSelectedMarkerIconByDaycareType = (daycareType) => {
  switch (daycareType) {
    case 1:
      return LocationMarkerSemipublicSelectedUrl;
    case 2:
      return LocationMarkerPrivateSelectedUrl;
    case 0:
    default:
      return LocationMarkerPublicSelectedUrl;
  }
};

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
const createDaycareFeature = daycareInfo => {
  const feature = new Feature({
    geometry: new Point(fromLonLat(daycareInfo.coordinate))
  })
  const { id, daycareType } = daycareInfo;

  feature.setId(id);
  feature.set('daycareId', id);
  feature.set('daycareType', daycareType);
  feature.set('daycareInfo', daycareInfo);

  const style = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: getMarkerIconByDaycareType(daycareType),
    })
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
  const selectedStyle = new Style({
    zIndex: 100,
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: getSelectedMarkerIconByDaycareType(0),
    }),
  });
  const select = new Select({
    wrapX: false,
    style: selectedStyle,
  });
  const modify = new Modify({
    features: select.getFeatures(),
    style: selectedStyle,
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
      center: fromLonLat([120.5348712, 24.2495134]),
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
    addFeaturesToVectorSource(vectorSource, createDaycareFeatures(unref(daycareInfoList)[type]));
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
