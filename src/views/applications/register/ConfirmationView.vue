<script setup>
import IconSuccess from '../../../components/icons/IconSuccess.vue';
import BodyText from '../../../components/BodyText.vue';
import FullButton from '../../../components/FullButton.vue';
</script>

<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.card" class="flex flex-col space-y-8 justify-center">
      <div class="flex justify-center">
        <IconSuccess />
      </div>
      <div class="grid gap-3 text-center justify-center">
        <h1 class="font-bold"> {{ $t("message.enroll_success") }}</h1>
        <BodyText :text="$t('message.enroll_success_detail')" />
      </div>
      <RouterLink :to="{ name: 'myApplicationsBase' }">
        <FullButton :text="$t('button.download_registration_document')" />
      </RouterLink>
    </div>
  </div>
</template>

<style module>
.page {
  background-color: #F8F8F8;
}

.card {
  width: 500px;
  border-radius: 8px;
  background-color:var(--bb-color-white);;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);
  padding: 80px 40px;
}
</style>
