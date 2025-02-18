<script setup>
import { ref } from 'vue';
import { useAuth } from "@/stores/auth";

import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

const email = ref(''); // { value: '' }
const password = ref('');
const passwordFieldType = ref('password');
const emailMsgErr = ref('');
const passwordMsgErr = ref('');
const loading = ref(false);
const authStore = useAuth();

function changeEmail(value) {
  email.value = value
}

function changePassword(value) {
  password.value = value
}

function switchVisibilityPassword() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}

async function login() {
  await authStore.signIn(email.value, password.value)
}
</script>

<template>
  <div class="sign-in-form-wrapper">
    <form class="sign-in-form">
      <h2>Sign In</h2>

      <BaseInput
        class="sign-in-form__input"
        name="email"
        label="Email"
        placeholder="Input your email"
        :value="email"
        @change-value="changeEmail"
        :error-message="emailMsgErr"
      />

      <BaseInput 
        class="sign-in-form__input" 
        name="password"
        label="Password"
        placeholder="Input your passowrd"
        :value="password"
        :type="passwordFieldType"
        password-field
        @change-value="changePassword"
        @switch-type="switchVisibilityPassword"
        :error-message="passwordMsgErr"
      />

      <BaseButton 
        class="sign-in-form__button"
        text-button="Submit" 
        :loading="authStore.loading"
        @click.prevent="login"
      />

      <span class="sign-in-form__toggle" @click="$emit('toggle')">registration</span>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .sign-in-form-wrapper {
    padding: 2rem;
    margin: 0 auto;
    max-width: 480px;
    border: solid 1px rgba(0,0,0,.12);
    border-radius: 8px;
  }

  .sign-in-form {
    padding-top: 1rem;

    h2 {
      text-align: center;
    }

    &__input {
      margin-top: 20px;
    }

    &__button {
      margin-top: 32px;
      margin-bottom: 16px;
    }

    &__toggle {
      color: var(--color-primary);
      cursor: pointer;
    }
  }

</style>