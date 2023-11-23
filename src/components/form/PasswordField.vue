<script setup>
import { ref, unref, computed } from 'vue';
import IconEye from '../icons/IconEye.vue';
import IconEyeOff from '../icons/IconEyeOff.vue';

const isShow = ref(false);
const fieldIcon = computed(() => unref(isShow) ? IconEye : IconEyeOff);
const fieldType = computed(() => unref(isShow) ? 'text' : 'password');

const toggleShow = () => {
  isShow.value = !isShow.value;
};

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
});

defineEmits([
  'update:modelValue',
]);
</script>

<template>
  <div class="grid gap-2">
    <label :for="$attrs.name" class="block text-sm font-medium leading-6">{{ label }}</label>
    <div class="relative w-full">
      <div class="absolute inset-y-0 right-0 px-4 flex items-center">
        <button class="cursor-pointer" @click="toggleShow">
          <Component :is="fieldIcon" />
        </button>
      </div>
      <input
        :type="fieldType"
        :value="modelValue"
        v-bind="$attrs"
        class="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="instruction text"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
