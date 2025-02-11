<script>
import { usePosts } from '@/stores/posts';

import PostListItem from './PostListItem.vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

export default {
  components: {
    PostListItem,
    BaseInput,
    BaseButton
  },

  data() {
    return {
      postsStore: usePosts(),
      searchString: '',
      postsLimit: 5
    }
  },

  async created() {
    await this.postsStore.getPostList()
  },

  methods: {
    openPagePost(id) {
      this.$router.push({ name: 'post', params: { id } })
    },

    changeSearchString(value) {
      console.log('changeSearchString', value)
      this.searchString = value;
    },

    async searchPostList() {
      console.log(this.postsLimit)
      await this.postsStore.getPostList(this.searchString, this.postsLimit)
    },

    async changeLimit(num) {
      this.postsLimit = num;
      this.searchPostList();
    }
  },

  watch: {
    postsLimit(newSerch) {
      this.searchPostList();
    }
  }
}

</script>

<template>
  <section class="post-list">
    <div class="post-list__search-wrapper">
      <BaseInput 
        class="post-list__search-input" 
        placeholder="Input post text"
        @change-value="changeSearchString" 
        :value="serchString"
      />
      <BaseButton 
        class="post-list__search-button" 
        text-button="Search"
        @click="searchPostList"
      />
    </div>
    
    <template v-if="postsStore.postListData?.results.length">
      <div v-for="post in postsStore.postListData.results" :key="post.id">
        <PostListItem :model="post" @click="openPagePost(post.id)"/>
      </div>
    </template>

    <section>
      <span class="limit" @click="postsLimit=5" >5</span>
      <span class="limit" @click="postsLimit=10">10</span>
      <span class="limit" @click="postsLimit=15">15</span>
    </section>
  </section>

</template>

<style lang="scss" scoped>
.post-list {
  padding: 16px;  

  &__search-input {
    padding-bottom: 20px;
  }

  &__search-wrapper {
    display: flex; 
    gap: 12px;

    .post-list__search-input {
      flex-grow: 1;
    }

    .post-list__search-button {
      max-width: 200px;
    }
  }

  .limit {
    margin-right: 12px; 
    cursor: pointer;
  }
}

</style>