<script setup>
defineProps({
  name: {
    type: String,
    default: '',
  },
  routeName: {
    type: String,
    default: '',
  },
  routeParams: {
    type: Object,
    default: () => ({}),
  },
  routeQuery: {
    type: Object,
    default: () => ({}),
  },
  href: {
    type: String,
    default: '',
  },
  leadingIcon: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <Component
    :is="routeName ? 'RouterLink' : 'a'"
    :to="routeName ? { name: routeName, params: routeParams, query: routeQuery } : null"
    :href="href"
    :target="routeName ? '_self' : '_blank'"
    class="text-gray-600 hover:bg-gray-50 px-5 py-3 flex gap-3 items-center"
    role="button"
  >
    <Component v-if="leadingIcon" :is="leadingIcon" />
    <div class="rounded-sm text-sm whitespace-nowrap">
      {{ name }}
    </div>
  </Component>
</template>
