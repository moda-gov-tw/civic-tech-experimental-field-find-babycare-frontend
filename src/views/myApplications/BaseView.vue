<template>
  <CreateNewApplyBar />
  <div class="px-8 py-7 grid gap-7">
    <MainTitle :text="$t('title.my_applications')" divider />
    <RouterView />
  </div>
</template>

<script setup>
import MainTitle from '../../components/MainTitle.vue';
import CreateNewApplyBar from '../../components/apply/CreateNewApplyBar.vue';
</script>

<style>
.vue3-easy-data-table__body {
  tr {
    cursor: pointer;
  }
}
</style>
