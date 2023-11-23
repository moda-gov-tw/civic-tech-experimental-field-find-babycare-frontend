<script setup>
import { computed, unref } from 'vue';
import LogoMain from '../components/logos/LogoMain.vue';
import LoginPanel from '../components/LoginPanel.vue';
import { useMedia } from '../hooks/useMedia.js';

const isDesktop = useMedia('(min-width: 1024px)');
const size = computed(() => unref(isDesktop) ? 'lg' : 'sm');
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div class="w-full grid gap-7" :class="$style.layout">
      <div class="grid justify-center items-center">
        <LogoMain :size="size" />
      </div>
      <LoginPanel />
    </div>
  </div>
</template>

<style module>
.layout {
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

.page {
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}
</style>
