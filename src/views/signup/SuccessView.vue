<script setup>
import IconSuccess from '../../components/icons/IconSuccess.vue';
import MainTitle from '../../components/MainTitle.vue';
import BodyText from '../../components/BodyText.vue';
import FullButton from '../../components/FullButton.vue';
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.card" class="grid gap-8 justify-center p-10">
      <IconSuccess />
      <div class="grid gap-3 text-center">
        <MainTitle :text="$t('message.verification_success')" />
        <BodyText :text="$t('message.redirecting')" />
      </div>
      <RouterLink :to="{ name: 'login' }">
        <FullButton :text="$t('button.login')" />
      </RouterLink>
    </div>
  </div>
</template>

<style module>
.card {
  background-color: var(--bb-color-white);
}

.page {
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}
</style>
