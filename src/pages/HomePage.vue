<script>
import { useAuth } from '@/stores/auth'; 

import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostList
  },
  data() {
    return {
      storeAuth: useAuth()
    }
  },

  methods: {
    
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
