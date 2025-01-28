<script>
import BaseLayout from '@/components/BaseLayout.vue';
import SharedButton from '@/components/SharedButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  components: {
    BaseLayout,
    SharedButton,
    BaseModal,
    BaseButton
  },
  data() {
    return {
      themeButton: 'success',
      currentComponent: 'SharedButton',
    }
  },

  methods: {
    changeThemeButton() {
      this.themeButton = 'danger'
    },

    toggleCurrentComponent() {
      this.currentComponent = this.currentComponent === 'SharedButton' ? 'BaseModal' : 'SharedButton'
    },

    goToAboutPage() {
      console.log('router: ', this.$router)
      console.log('route: ', this.$route)

      this.$router.push({name: 'about', params: { id: '12' }})
    }
  }
}

</script>

<template>
  <main>
    <BaseLayout>
      <h1>Home page</h1>

      <BaseButton @click="goToAboutPage" text-button="Go to about page"/>

      <KeepAlive>
        <component :is="currentComponent"></component>
      </KeepAlive>
      

      <SharedButton @click="toggleCurrentComponent" :theme="themeButton" @change-param="changeThemeButton">
        Change component
      </SharedButton>

      <MySharedButton>
        I am button
      </MySharedButton>
    </BaseLayout>
  </main>
</template>
