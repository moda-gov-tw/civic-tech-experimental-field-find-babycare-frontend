<script setup>
import IconSending from '../../components/icons/IconSending.vue';
import MainTitle from '../../components/MainTitle.vue';
import BodyText from '../../components/BodyText.vue';
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.card" class="grid gap-8 justify-center p-10">
      <IconSending />
      <div class="grid gap-3 text-center">
        <MainTitle :text="$t('message.verification_email_sent')" />
        <BodyText :text="$t('message.check_email')" />
      </div>
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
