<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    openPostPage() {

    }
  }
}

</script>

<template>
  <div class="post-list-item" @click="openPagePost">
    <div class="post-list-item__content">
      <h2 class="post-list-item__title">{{ model.title }}</h2>
      <p class="post-list-item__description">{{ model.description }}</p>
    </div>
    <img :src="model.image" alt="post image">
  </div>

</template>

<style lang="scss" scoped>
.post-list-item {
  display: flex;
  max-width: 100%;
  margin-bottom: 20px;
  cursor: pointer;

  &__content {
    flex-grow: 1;
  }

  &__title {
    text-align: center;
  }

  &__description {
    color: var(--vt-c-black-mute)
  }

  img {
    width: 200px;
    height: fit-content;
  }
}

</style>