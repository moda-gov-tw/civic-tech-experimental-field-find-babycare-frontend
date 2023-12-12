<template>
  <div :class="$style.bar">
    <div :class="$style.text">{{ applicantName }} 您好</div>
    <RouterLink :to="{ name: 'apply.step0' }">
      <button :class="$style.btn">開始新的報名</button>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const applicantName = ref('吳俊傑');
</script>

<style module>
.bar {
  width: 100%;
  top: 0;
  padding: 16px 48px;
  background: var(--bb-color-gray-600);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--bb-color-white);
}

.text {
  color: var(--bb-color-white, #FFF);
  font-family: Noto Sans CJK TC;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 160% */
  user-select: none;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  background: var(--bb-color-white, #FFF);

  /* shadow/sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  color: var(--black, #111827);
  font-family: Noto Sans CJK TC;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 142.857% */

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
}
</style>

