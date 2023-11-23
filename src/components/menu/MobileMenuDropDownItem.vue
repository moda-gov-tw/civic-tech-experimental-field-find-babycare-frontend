<script setup>
import {
  DisclosureButton,
} from '@headlessui/vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  href: {
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
  <RouterLink :to="{ name: pageName, query }">
    <DisclosureButton
      :key="name"
       class="
        focus:outline-none
        block rounded-lg py-3 pl-8 pr-3 leading-7 text-gray-600 hover:text-primary hover:bg-gray-50">
      {{ name }}
    </DisclosureButton>
  </RouterLink>
</template>
