<script>
import { useAuth } from '@/stores/auth';

import BaseLayout from './BaseLayout.vue';

export default {
    components: { BaseLayout },

    data() {
      return {
        authStore: useAuth()
      }
    }
}
</script>

<template>
  <div class="app-header">
    <BaseLayout class="header-section">
      <img class="logo" src="/src/assets/logo.svg" alt="logo Vue">
      <nav class="d-flex" v-if="authStore.accessToken">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to=" { name: 'about' } ">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </BaseLayout>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
    background: var(--color-background-header);
}

.header-section {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.logo {
    width: 30px;
    height: auto;
    margin-right: 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);

  &:first-of-type {
    border: 0;
  }

  &.router-link-exact-active,
  &.router-link-active {
    color: var(--color-text);

    &:hover {
      background-color: transparent;
    }
  }
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>