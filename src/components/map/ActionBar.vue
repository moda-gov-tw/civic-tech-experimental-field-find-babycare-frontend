<template>
  <div
    class="grid grid-flow-col overflow-x-auto gap-5 items-center py-4 px-6 md:px-8 justify-start"
    :class="$style.actionBar"
  >
    <span
      class="hidden md:block"
      :class="$style.actionBarTitle"
    >
      {{ $t('map.show') }}
    </span>
    <FilterCheckbox
      v-for="item in filterList"
      :key="item.id"
      :label="item.label"
      :value="item.id"
      :type="item.type"
      v-model="selectedFilter"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import FilterCheckbox from './FilterCheckbox.vue';
import { DAYCARE_TYPE } from '../../enums/daycare.js';
import { useMapStore } from '../../stores/map.js';
import { storeToRefs } from 'pinia';

const { t } = useI18n();
const store = useMapStore();
const {
  selectedFilter,
} = storeToRefs(store);
const filterList = computed(() => [
  {
    id: DAYCARE_TYPE[0],
    label: t('daycare.type_public'),
    type: 0,
  },
  {
    id: DAYCARE_TYPE[1],
    label: t('daycare.type_semipublic'),
    type: 1,
  },
  {
    id: DAYCARE_TYPE[2],
    label: t('daycare.type_private'),
    type: 2,
  },
]);
</script>

<style module>
.actionBar {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  background: rgba(75, 85, 99, 0.80);

  color: var(--bb-color-white);
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}

.actionBarTitle {
}
</style>
