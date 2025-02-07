<script>
import { useAuth } from '@/stores/auth'; 

import BaseLayout from '@/components/BaseLayout.vue';
import SharedButton from '@/components/SharedButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import PostList from '@/components/PostList.vue';

export default {
  components: {
    BaseLayout,
    SharedButton,
    BaseModal,
    BaseButton,
    PostList
  },
  data() {
    return {
      themeButton: 'success',
      currentComponent: 'SharedButton',
      storeAuth: useAuth()
    }
  },

  methods: {
    changeThemeButton() {
      this.themeButton = 'danger'
    },

    toggleCurrentComponent() {
      this.currentComponent = this.currentComponent === 'SharedButton' ? 'BaseModal' : 'SharedButton'
    },

    goToAboutPage(id) {
      this.$router.push({name: 'about', params: { id: '12' }, query: 'vue'})
    }
  }
}

</script>

<template>
  <div>
    <BaseLayout>
      <h1>Home page</h1>
      <PostList />
    </BaseLayout>
  </div>
</template>
