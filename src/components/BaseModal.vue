<script>


export default {
  components: {
    
  },

  data() {
    return {
      count: 0
    }
  },

  methods: {
    changeCount() {
      console.log('changeCount')
      this.count++
    }
  }
}

</script>

<template>
  <div>
    <!-- title -->
    <div>
      <slot name="title"></slot>
    </div>

    <!-- description -->
    <div>
      <slot name="description"></slot>
    </div>

      <!-- buttons -->
    <div>
      <button>Ok</button>
      <button @click="changeCount">Change count</button>
    </div>
   
  </div>
</template>

<style scoped>

</style>