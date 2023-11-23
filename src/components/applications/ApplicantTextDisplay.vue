<template>
  <div class="grid gap-2">
    <div :class="$style.title">{{ title }}</div>
    <div :class="$style.text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>

<style module>
.title {
  color: var(--bb-color-gray-600, #565B66);

  /* Webpage Text Styles/Body Text */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}

.text {
  color: #111827;

  /* Webpage Text Styles/Body Text */
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
}
</style>
