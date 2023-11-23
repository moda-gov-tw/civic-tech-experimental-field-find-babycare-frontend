<script setup>
import { ref } from 'vue';
import FullButton from '../components/FullButton.vue';
import InputField from './form/InputField.vue';
import PasswordField from './form/PasswordField.vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('login click');
  console.log(email.value, password.value);
};
</script>

<template>
  <div :class="$style.loginPanel" class="px-6 py-7 grid gap-6 min-w-max">
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

    <div class="flex justify-between">
      <fieldset>
        <div class="space-y-5">
          <div class="relative flex gap-3 items-center">
            <input id="rememberMyAccount" name="rememberMyAccount" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="rememberMyAccount" class="font-medium text-gray-900">{{ $t('button.remember_me') }}</label>
          </div>
        </div>
      </fieldset>

      <RouterLink :to="{ name: 'forgotPassword' }">{{ $t('button.forgot_password') }}</RouterLink>
    </div>

    <div class="grid gap-5">
      <FullButton :text="$t('button.login')" @click="handleLogin" />
      <RouterLink :to="{ name: 'signup' }">
        <FullButton :text="$t('button.signup')" isGhost />
      </RouterLink>
    </div>
  </div>
</template>

<style module>
.loginPanel {
  background-color: var(--bb-color-white);
}
</style>
