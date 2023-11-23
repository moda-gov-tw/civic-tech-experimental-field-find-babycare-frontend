<script setup>
import { ref } from 'vue';
import FullButton from '../components/FullButton.vue';
import MainTitle from './MainTitle.vue';
import InputField from './form/InputField.vue';
import PasswordField from './form/PasswordField.vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSignup = () => {
  console.log('signup click');
  console.log(
    username.value,
    email.value,
    password.value,
    confirmPassword.value,
  );
};
</script>

<template>
  <div class="px-6 py-7 grid gap-6">
    <MainTitle :text="$t('title.create_account')" divider />
    <!-- username -->
    <InputField
      type="text"
      name="username"
      id="username"
      :label="$t('user.name')"
      v-model="username"
    />
    <!-- email -->
    <InputField
      type="email"
      name="email"
      id="email"
      :label="$t('user.email')"
      v-model="email"
    />

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

    <div class="grid gap-5">
      <FullButton :text="$t('button.signup')" @click="handleSignup" />
      <RouterLink :to="{ name: 'login' }">
        <FullButton :text="$t('button.already_have_account')" isGhost />
      </RouterLink>
    </div>
  </div>
</template>
