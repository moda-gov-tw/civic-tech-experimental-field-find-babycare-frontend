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
  placeholder:{
    type: String,
    default: 'instruction text',  
  }
});

defineEmits([
  'update:modelValue',
]);
</script>

<template>
  <div class="grid gap-2">
    <label :for="$attrs.name" class="block text-sm font-medium leading-6">{{ label }}</label>
    <input
      :value="modelValue"
      v-bind="$attrs"
      class="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
