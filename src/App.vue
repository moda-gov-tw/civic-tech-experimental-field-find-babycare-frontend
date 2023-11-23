<script setup>
import { RouterView } from 'vue-router'
import AppMenu from './components/AppMenu.vue'
</script>

<template>
  <AppMenu />
  <div :class="$style.content">
    <RouterView />
  </div>
</template>

<style module>
.root {
  font-family: 'Noto Sans TC';
}

.content {
  width: 100%;
  background: var(--bb-color-white);
}
</style>
