<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseButton
  },

  data() {
    return {
      activeColor: 'red',
      fontSize: 30,
      count: 0,
      nameUser: ''
    }
  },

  computed: {
    rootStyles() {
      return {
        color: this.activeColor,
        fontSize: (this.fontSize) + 'px'
      }
    },

    lengthNameUser() {
      return this.nameUser.length
    },
  },

  created() {
    console.log(this.$route.params)

    fetch(`https://jsonplaceholder.typicode.com/todos/${this.$route.params.id || ''}`)
      .then(response => response.json())
      .then(json => console.log(json))
  },

  methods: {
    incrementCount() {
      this.count++;
    },

    send() {
      console.log('send')
      this.nameUser
    }
  },
}
</script>

<template>
  
  <div class="about" :style="rootStyles">
    <h1>This is an about page</h1>

  <form action="">
    <input 
      placeholder="input yuor name" 
      type="text" 
      v-model.lazy="nameUser"
    >
    <button class="btn" @click.prevent="send">Send button</button>
  </form>

  <BaseButton 
    class="btn" 
    @click="incrementCount" 
    text-button="increase button"
  />
    
  </div>
</template>
 
<style scoped>
input {
  border: solid 1px grey;
}

form {
  margin-bottom: 32px;
}

.btn {
  max-width: 360px;
}

@media (min-width: 1024px) {
  .about {
    /* min-height: 100vh; */
    /* display: flex; */
    align-items: center;
  }
}
</style>
