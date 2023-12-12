<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="$event => handleSelect($event.target.selectedIndex)"
      >
        <option
          v-for="tab in tabs"
          :key="tab.name"
          :selected="tab.current"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <RouterLink
            v-for="(tab, idx) in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              $style.tab,
              tab.current && $style.tabCurrent,
              'flex gap-3 whitespace-nowrap border-transparent border-b-2 pb-5 px-2 text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
            @click="$emit('update:activeTab', idx)"
          >
            {{ tab.name }}
            <span
              v-if="tab.count > 0"
              :class="[
                tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                'hidden rounded-full p-1 px-3 text-xs font-medium md:inline-block',
                $style.count,
                tab.current && $style.count,
              ]"
            >
              {{ tab.count }}
            </span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
});

defineEmits([
  'update:activeTab',
]);

import router from '../router/index.js';
const handleSelect = (tabIdx) => {
  router.push({
    path: props.tabs[tabIdx].href,
  });
}
</script>

<style module>
.tab {
  color: var(--bb-color-gray-600);

  /* Form Text Styles/Input Title */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
}

.tabCurrent {
  color: var(--bb-color-orange-700);
  border-color: var(--bb-color-orange-600);
}

.count {
  color: var(--bb-color-black);
  background: var(--bb-color-gray-50);
  border-radius: 10px;

  text-align: center;

  /* Webpage Text Styles/Additional Explanation */
  font-family: Noto Sans CJK TC;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
}

.labelCurrent {
  color: var(--bb-color-orange-700);
}
</style>
