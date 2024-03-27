<template>
  <div v-if="title || text">{{ title }}：{{ text }}</div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: [String, Number],
    default: '',
  },
});
</script>
