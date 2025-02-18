<script>
import { useAuth } from "@/stores/auth";

import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseInput, BaseButton
  },

  data() {
    return {
      title: 'Registration form',
      authStore: useAuth(),
      name: '',
      email: '',
      password: '',
      passwordFieldType: 'password',
      emailMsgErr: '',
      passwordMsgErr: ''
    }
  },

  methods: {
    async create() {
      const data = {
        username: "",
        email: "",
        password: "",
        course_group: 15
      }

      const res = await this.authStore.createUser(data)
    },

    changeName(value) {
      this.name = value
    },

    changeEmail(value) {
      this.email = value
    },

    changePassword(value) {
      this.password = value
    },

    switchVisibilityPassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    async createUser() {
      const data = {
        "username": this.name,
        "email": this.email,
        "password": this.password,
        "course_group": 15
      }

      await this.authStore.createUser(data);
    },

    async activation() {
      await this.authStore.authUserActivation();
    } 
  }
}
</script>

<template>
  <div class="registration-form-wrapper">
    <form class="registration-form">
      <h2>{{ title }}</h2>

      <BaseInput
        class="registration-form__input"
        name="name"
        label="Name"
        placeholder="Input your name"
        :value="name"
        @change-value="changeName"
        :error-message="emailMsgErr"
      />

      <BaseInput
        class="registration-form__input"
        name="email"
        label="Email"
        placeholder="Input your email"
        :value="email"
        @change-value="changeEmail"
        :error-message="emailMsgErr"
      />

      <BaseInput 
        class="registration-form__input" 
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
        class="registration-form__button"
        text-button="Submit" 
        :loading="authStore.loading"
        @click.prevent="createUser"
      />

      <BaseButton 
        class="registration-form__button"
        text-button="Activate" 
        :loading="authStore.loading"
        @click.prevent="activation"
      />

      <!-- <button @click.prevent="create">Create</button>
      <button @click.prevent="authStore.authUserActivation()">Activation</button> -->

      <span class="registration-form__toggle" @click="$emit('toggle')">sign in</span>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  .registration-form-wrapper {
    padding: 2rem;
    margin: 0 auto;
    max-width: 480px;
    border: solid 1px rgba(0,0,0,.12);
    border-radius: 8px;
  }

  .registration-form {
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
