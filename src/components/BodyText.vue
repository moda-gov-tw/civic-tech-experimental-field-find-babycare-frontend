<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-2" :class="$style.text">
    {{ text }}
  </div>
</template>

<style module>
.text {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bb-color-gray-600);
}
</style>
