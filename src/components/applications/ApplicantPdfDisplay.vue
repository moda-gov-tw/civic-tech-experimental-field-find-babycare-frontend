<template>
  <div class="flex justify-between">
    <div :class="$style.title" class="flex gap-3">
      <IconPaperClip />
      {{ title }}
    </div>
    <TextLink :link="src" text="檢視文件" />
  </div>
</template>

<script setup>
import IconPaperClip from '../icons/IconPaperClip.vue';
import TextLink from '../TextLink.vue';

defineProps({
  title: {
    type: String,
  },
  src: {
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
</style>
