<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  isGhost: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <button :class="[$style.btn, isGhost && $style.isGhost]">{{ text }}</button>
</template>

<style module>
.btn {
  width: 100%;
  background: var(--bb-color-orange-700);
  color: var(--bb-color-white);
  padding: 8px 16px;
  border-radius: 6px;
}

.isGhost {
  background: transparent;
  color: var(--bb-color-orange-700);
  border: 1px solid var(--bb-color-orange-700);
}
</style>
