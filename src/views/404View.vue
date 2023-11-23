<template>
  <div :class="$style.wrapper">
    <IconNotFound :class="$style.icon" />
    <h2 :class="$style.text">{{ $t('message["404"]') }}</h2>
  </div>
</template>

<script setup>
import IconNotFound from '../components/icons/IconNotFound.vue';
</script>

<style module>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 56px);
  gap: 40px;
  padding: 32px;
}

.icon {
  width: 100%;
  max-width: 580px;
}

.text {
  color: var(--bb-color-gray-600);
  font-family: Noto Sans CJK TC;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 100% */

  @media (min-width: 768px) {
    font-size: 32px;
  }
}
</style>
