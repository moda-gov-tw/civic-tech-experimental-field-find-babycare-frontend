<script setup>
import {
  PopoverGroup,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'
import IconChevronDown from '../icons/IconChevronDown.vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  hasSubnav: {
    type: Boolean,
    default: false,
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
  <PopoverGroup class="hidden lg:flex lg:gap-x-12 text-white">
    <Popover class="relative">
      <!-- 下拉式選單 -->
      <template v-if="hasSubnav">
        <PopoverButton class="flex items-center gap-2 text-base font-semibold leading-6 focus:outline-none ">
          {{ label }}
          <IconChevronDown aria-hidden="true" />
        </PopoverButton>

        <!-- 下拉式選單: 子選單 -->
        <PopoverPanel class="absolute grid gap-3 top-full z-10 mt-3 max-w-md overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 px-5 py-3">
          <slot />
        </PopoverPanel>
      </template>

      <!-- 非下拉式選單 -->
      <RouterLink
        v-else
        :to="{ name: pageName, query }"
        :class="$style.link"
        class="text-base"
      >
        {{ label }}
      </RouterLink>
    </Popover>
  </PopoverGroup>
</template>

<style module>
.link {
  color: var(--bb-color-white);
  border-bottom: 2px solid ;
  border-color: transparent;
  padding: 4px;
  font-weight: 600;

  &:hover {
    color: currentColor;
    border-color: currentColor;
    text-decoration: none;
  }
}
</style>
