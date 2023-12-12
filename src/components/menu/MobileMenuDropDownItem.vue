<script setup>
import {
  DisclosureButton,
} from '@headlessui/vue'

defineProps({
  name: {
    type: String,
    default: '',
  },
  href: {
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
});

</script>

<template>
  <Component
    :is="routeName ? 'RouterLink' : 'a'"
    :to="routeName ? { name: routeName, params: routeParams, query: routeQuery } : null"
    :href="href"
    role="button"
  >
    <DisclosureButton
      :key="name"
       class="
        focus:outline-none
        block rounded-lg py-3 pl-8 pr-3 leading-7 text-gray-600 hover:text-primary hover:bg-gray-50">
      {{ name }}
    </DisclosureButton>
  </Component>
</template>
