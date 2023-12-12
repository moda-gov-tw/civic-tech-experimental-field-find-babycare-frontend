<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type:{
    type: String,
    default: 'default',
    validator(value) {
      return ['address', 'default'].includes(value)
    },
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder:{
    type: String,
    default: '',  
  }
});

defineEmits([
  'update:modelValue',
]);
</script>

<template>
  <div class="grid gap-2 mb-3">
    <label 
      v-if="label" 
      class="block text-sm font-medium leading-6">{{ label }}</label>
    <input
      :value="modelValue"
      v-bind="$attrs"
      :class="[
        $style.input,
        disabled && $style.disabled,
      ]"
      class="block w-full rounded-md py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style module>

.input {
  width: 100%;
} 

.disabled {
  opacity: 0.5;
}

</style>