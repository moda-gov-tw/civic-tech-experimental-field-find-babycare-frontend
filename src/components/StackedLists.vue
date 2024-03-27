<template>
  <div
    :class="$style.list"
    v-for="(stackItem, idx) in data"
    :key="idx"
    @click="$emit('click:stack-list', stackItem);"
  >
    <div :class="$style.stackList">
      <StackedListItem
        v-for="(item, stackItemIdx) in stackItem"
        :key="`${idx}__stacked-list-item-${item.title}-${stackItemIdx}`"
        :title="item.title"
        :text="item.value"
        :class="[
          (stackItemIdx === 1) && $style.itemStrong,
        ]"
      />
    </div>
    <IconChevronRight v-if="hasArrow" />
  </div>
</template>

<script setup>
import IconChevronRight from '../components/icons/IconChevronRight.vue';
import StackedListItem from './StackedListItem.vue';''

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  hasArrow: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click:stack-list']);
</script>

<style module>
.list {
  border-bottom: 1px solid var(--bb-color-gray-200, #DEE0E3);
  padding: 20px 0;

  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
}

.stackList {
  flex: 1;
}

.itemStrong {
  color: #111827;
}
</style>
