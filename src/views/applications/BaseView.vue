<template>
  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="$t('title.application_management')" divider />
    <RouterView />
  </div>
</template>

<script setup>
import MainTitle from '../../components/MainTitle.vue';
</script>
