<script>
import { usePosts } from '@/stores/posts';

export default {
  data() {
    return {
      postsStore: usePosts()
    }
  },

  async created() {
    const id = this.$route.params.id;
    this.postsStore.getPostItem(id)
  }
}
</script>

<template>
   <BaseLayout class="post-page">
    <div class="title-wrapper">
      <h1>{{ postsStore.postItemData?.title }}</h1> 
      <span>{{ postsStore.postItemData?.date }}</span>
    </div>
  
    <img :src="postsStore.postItemData?.image" alt="post image"/>
    <p>{{postsStore.postItemData?.text }}</p>
  
  </BaseLayout>  
</template>

<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;

  h1 {
    font-size: 32px;
  }
}



  img {
    padding-bottom: 20px;
    max-width: 50%;
    height: auto;
    margin: 0 auto;
  }



</style>
