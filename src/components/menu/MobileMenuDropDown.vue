<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import IconChevronDown from '../icons/IconChevronDown.vue';

defineProps({
  label: {
    type: String,
    default: "",
  },
  open: {
    type: Boolean,
    default: false,
  },
  hasSubnav: {
    type: Boolean,
    default: false,
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
  <div class="py-3 text-lg">
    <!-- 下拉式按鈕 -->
    <Disclosure
      v-if="hasSubnav"
      as="div"
      class="grid gap-2"
      v-slot="{ open }"
    >
      <DisclosureButton class="flex gap-2 w-full items-center py-3 px-6 leading-7 text-gray-600 hover:text-primary hover:bg-gray-50 focus:outline-none">
        {{ label }}
        <IconChevronDown
          :class="[
            open ? 'rotate-180' : '',
            'h-5 w-5 flex-none focus:outline-none duration-300',
          ]"
          aria-hidden="true"
        />
      </DisclosureButton>
      <!--下拉式選單:子選單 -->
      <DisclosurePanel class="gap-2 grid">
        <slot/>
      </DisclosurePanel>
    </Disclosure>

    <!-- 非下拉式按鈕 -->
    <Component
      v-else
      :is="routeName ? 'RouterLink' : 'a'"
      :to="routeName ? { name: routeName, params: routeParams, query: routeQuery } : null"
      :href="href"
      class="block rounded-lg px-6 py-3 leading-7 text-gray-600 hover:text-primary hover:bg-gray-50 flex gap-3 items-center"
      role="button"
    >
      <Component v-if="leadingIcon" :is="leadingIcon" />
      {{ label }}
    </Component>
  </div>
</template>
