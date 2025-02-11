<script>
import { useAuth } from "@/stores/auth";

export default {
  data() {
    return {
      title: 'Registration form',
      authStore: useAuth(),
      
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
    }
  }
}
</script>

<template>
  <div class="registration-form-wrapper">
    <form class="registration-form">
      <h2>{{ title }}</h2>

      <button @click.prevent="create">Create</button>
      <button @click.prevent="authStore.authUserActivation()">Activation</button>

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
