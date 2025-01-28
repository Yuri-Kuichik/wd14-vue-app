<script>
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
      postList: null
    }
  },

  mounted() {
    console.log(`компонент теперь примонтирован.`)
  },

  updated() {
    console.log('updated from login page', this)
  },

  methods: {
    // signIn() {
    //   console.log(this.nameUser, this.passwordUser)
    // },

    changeEmail(value) {
      this.email = value
    },

    changePassword(value) {
      this.password = value
    },

    switchVisibilityPassword() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },

    async getPostList(limit, search, author__course_group) {
      await fetch(`https://studapi.teachmeskills.by/blog/posts/`)
      .then((response) => response.json())
      .then((json) => { 
        this.postList = json
        console.log(json)
      });
    },

    async signIn() {
      this.loading = true

      // await this.getPostList()

      const data = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await fetch('https://studapi.teachmeskills.by/auth/jwt/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const tokenData = await response.json();
          console.log('tokenData: ', tokenData)

        this.$router.push('/');
      } catch (error) {
          console.log(error.message)

      } finally {
          this.loading = false;
      }

    },
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
            :loading="loading"
            @click.prevent="signIn"
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