<script setup>
import {
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'
import IconChevronDown from '../icons/IconChevronDown.vue';

defineProps({
  hasChevronDownIcon: {
    type: Boolean,
    default: true,
  },
  subNavPosition: {
    type: String,
    default: 'left',
    validator(val) {
      return ['left', 'right'].includes(val);
    },
  },
  label: {
    type: [String, Object],
    default: '',
  },
  hasSubnav: {
    type: Boolean,
    default: false,
  },
  subnav: {
    type: Array,
    default: () => [],
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
});
</script>

<template>
  <PopoverGroup class="hidden lg:flex lg:gap-x-12 text-white">
    <Popover class="relative">
      <!-- 下拉式選單 -->
      <template v-if="hasSubnav">
        <PopoverButton
          class="flex items-center gap-2 text-base font-semibold leading-6 focus:outline-none"
          :class="$style.link"
          as="button"
        >
          <Component v-if="typeof label === 'object'" :is="label" />
          <span v-else>{{ label }}</span>
          <IconChevronDown v-if="hasChevronDownIcon" aria-hidden="true" />
        </PopoverButton>

        <!-- 下拉式選單: 子選單 -->
        <PopoverPanel
          class="absolute grid gap-3 top-full z-10 mt-3 max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 px-5 py-3"
          :class="[
            subNavPosition === 'left' && 'left-0',
            subNavPosition === 'right' && 'right-0',
          ]"
        >
          <slot />
        </PopoverPanel>
      </template>

      <!-- 非下拉式選單 -->
      <Component
        v-else
        :is="routeName ? 'RouterLink' : 'a'"
        :to="routeName ? { name: routeName, params: routeParams, query: routeQuery } : null"
        :href="href"
        :class="$style.link"
        class="text-base"
        role="button"
        :target="routeName ? null : '_blank'"
      >
        {{ label }}
      </Component>
    </Popover>
  </PopoverGroup>
</template>

<style module>
.link {
  color: var(--bb-color-gray-50);
  border-bottom: 2px solid;
  border-color: transparent;
  text-align: center;
  transition: .1s ease-in-out;
  padding: 4px;

  /* Form Text Styles/Input Title */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */

  &:hover {
    color: var(--bb-color-white);
    border-color: currentColor;
    text-decoration: none;
  }
}
</style>
