<script>
import { useAuth } from "@/stores/auth";
import BaseButton from '@/components/BaseButton.vue';

export default {
  components: {
    BaseButton
  },

  data() {
    return {
      email: '',
      password: '',
      passwordFieldType: 'password',
      emailMsgErr: '',
      passwordMsgErr: '',
      loading: false, 
      postList: null,
      tokenData: null,
      authStore: useAuth()
    }
  },

  methods: {
    changeEmail(value) {
      this.email = value
    },

    changePassword(value) {
      this.password = value
    },

    switchVisibilityPassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    async login() {
      await this.authStore.signIn(this.email, this.password)
    }
  }
}

</script>

<template>
  <BaseLayout class="login-page">
    <div class="sign-in-form-wrapper">

      <form class="sign-in-form">
        <h2>Sign in</h2>

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
      </form>
    </div>
  </BaseLayout>
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
    }
  }

</style>