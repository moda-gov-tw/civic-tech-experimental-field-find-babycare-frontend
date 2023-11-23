<script setup>
import IconSendingPasswordLink from '../../components/icons/IconSendingPasswordLink.vue';
import MainTitle from '../../components/MainTitle.vue';
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.card" class="grid gap-8 justify-center p-10">
      <IconSendingPasswordLink />
      <div class="grid gap-3 text-center">
        <MainTitle :text="$t('message.password_url_sent')" />
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
>
