<script>
import PostListItem from './PostListItem.vue'

export default {
  components: {
    PostListItem
  },

  data() {
    return {
      postListData: null
    }
  },

  async created() {
     const response = await fetch('https://studapi.teachmeskills.by/blog/posts/?author__course_group=15&limit=5')

     this.postListData = await response.json()
  }
}

</script>

<template>
  <section class="post-list">
    <template v-if="postListData?.results.length">
      <div v-for="post in postListData.results" :key="post.id">
        <PostListItem :model="post" />
      </div>
    </template>
  </section>

</template>

<style lang="scss" scoped>
.post-list {
  padding: 16px;  
}

</style>