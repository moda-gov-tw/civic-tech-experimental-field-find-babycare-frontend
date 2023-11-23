<script setup>
import IconSuccess from '../../components/icons/IconSuccess.vue';
import BodyText from '../../components/BodyText.vue';
import FullButton from '../../components/FullButton.vue';
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.card" class="grid gap-8  justify-center p-3">
      <div class="flex justify-center">
        <IconSuccess />
      </div>
      <div class="grid gap-3 text-center justify-center">
        <h1 class="font-bold">報名送出成功！</h1>
        <BodyText :text="'您申請的各公托將儘速審查您的報名，一但受理，將依照您這次送出報名的時間戳記安排候補，謝謝。'" />
      </div>
      <RouterLink :to="{ name: 'apply.step0' }">
        <FullButton :text="'回到我的報名'" />
      </RouterLink>
    </div>
  </div>
</template>

<style module>
.card {
  background-color: var(--bb-color-white);
  width: 500px;
}

.page {
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}
</style>
