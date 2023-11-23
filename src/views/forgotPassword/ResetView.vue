<script setup>
import { ref } from 'vue';
import FullButton from '../../components/FullButton.vue';
import MainTitle from '../../components/MainTitle.vue';
import PasswordField from '../../components/form/PasswordField.vue';

const password = ref('');
const confirmPassword = ref('');

const handleResetPassword = () => {
  console.log('reset password click');
  console.log(
    password.value,
    confirmPassword.value,
  );
};
</script>
<template>
  <div :class="$style.page" class="h-screen flex items-center justify-center">
    <div :class="$style.resetPasswordPanel" class="px-6 py-7 grid gap-6 min-w-max">
      <MainTitle :text="$t('title.reset_password')" divider />

      <!-- password -->
      <PasswordField
        id="password"
        name="password"
        :label="$t('user.password')"
        v-model="password"
      />

      <!-- confirm password -->
      <PasswordField
        id="confirm_password"
        name="confirm_password"
        :label="$t('user.reenter_password')"
        v-model="confirmPassword"
      />

      <FullButton :text="$t('button.reset_password')" @click="handleResetPassword" />
    </div>

  </div>
</template>

<style module>
.page {
  background-color: var(--bb-color-white);

  @media (min-width: 1024px) {
    background-color: transparent;
  }
}

.resetPasswordPanel {
  background-color: var(--bb-color-white);
}
</style>
