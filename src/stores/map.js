import { ref } from 'vue';
import { defineStore } from "pinia";

export const useMapStore = defineStore('map', () => {
  const selectedFilter = ref(new Set(['PUBLIC', 'SEMI_PUBLIC', 'PRIVATE']));

  return {
    selectedFilter,
  };
});
