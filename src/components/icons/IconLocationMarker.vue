<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.04059 2.60019C6.22753 0.413258 9.77325 0.413257 11.9602 2.60019C14.1471 4.78713 14.1471 8.33285 11.9602 10.5198L8.00039 14.4796L4.04059 10.5198C1.85366 8.33285 1.85366 4.78713 4.04059 2.60019ZM8.00039 8.15999C8.88405 8.15999 9.60039 7.44365 9.60039 6.55999C9.60039 5.67634 8.88405 4.95999 8.00039 4.95999C7.11674 4.95999 6.40039 5.67634 6.40039 6.55999C6.40039 7.44365 7.11674 8.15999 8.00039 8.15999Z" :fill="color"/>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: Number,
    default: 0,
  },
});

const color = computed(() => {
  switch (props.type) {
    case 1:
      return '#9A3412';
    case 2:
      return '#374151';
    case 0:
    default:
      return '#EA580C';
  }
});
</script>
