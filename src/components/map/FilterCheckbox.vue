<template>
  <label :class="$style.label">
    <input
      v-model="model"
      type="checkbox"
      :hidden="isSelected"
      :class="$style.input"
      :checked="value"
      :value="value"
      :id="$attrs.id"
      :disabled="$attrs.disabled"
    >
    <IconCheckbox
      v-if="isSelected"
      :class="$style.icon"
    />
    <span>{{ label }}</span>
    <IconLocationMarker :type="$attrs.type" />
  </label>
</template>

<script setup>
import { computed } from 'vue';
import IconCheckbox from '../../components/icons/IconCheckbox.vue';
import IconLocationMarker from '../icons/IconLocationMarker.vue';

const props = defineProps({
  modelValue: {
    type: Set,
  },
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});

const emit = defineEmits([
  'update:modelValue',
]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const isSelected  = computed(() => {
  return props.modelValue.has(props.value);
});
</script>

<style module>
.label {
  cursor: pointer;
  border-radius: 6px;
  background: var(--bb-color-white);
  padding: 4px 8px;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;

  color: #374151;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  &:hover {
    background: #E5E7EB;
  }
}

.input {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid var(--bb-color-gray-400);
  border-radius: 4px;
  background: var(--bb-color-white);
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
