<template>
  <div :class="$style.applyWrapper">
    <ApplyActionBar/>
    <RouterView />
  </div>
</template>

<script setup>
import ApplyActionBar from '../../components/apply/ApplyActionBar.vue';


</script>

<style module>
.applyWrapper {
  position: relative;
  width: 100%;
}
</style>
