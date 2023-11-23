<script setup>
import { ref } from 'vue';
import InputField from '../../components/form/InputField.vue';
import FullButton from '../../components/FullButton.vue';

const email = ref('');

const handleResetPassword = () => {
  console.log('reset password click');
  console.log(email.value);
};
</script>

<template>
  <div class="px-6 py-7 grid gap-6">
    <!-- email -->
    <InputField
      type="email"
      name="email"
      id="email"
      :label="$t('user.email')"
      v-model="email"
    />

    <div class="grid gap-5">
      <FullButton :text="$t('button.reset_password')" @click="handleResetPassword" />
      <a @click="$router.go(-1)">
        <FullButton :text="$t('button.cancel')" isGhost />
      </a>
    </div>
  </div>
</template>
