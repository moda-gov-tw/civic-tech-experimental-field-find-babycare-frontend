<script setup>
defineProps({
  name: {
    type: String,
    default: '',
  },
  pageName: {
    type: String,
    default: '',
  },
  query: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <RouterLink
    :to="{ name: pageName, query }"
    class="text-gray-600 hover:bg-gray-50 px-5 py-3"
  >
    <div class="rounded-sm text-sm whitespace-nowrap">
      {{ name }}
    </div>
  </RouterLink>
</template>
