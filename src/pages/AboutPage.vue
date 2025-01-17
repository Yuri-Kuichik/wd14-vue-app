<script>
export default {
  data() {
    return {
      nameUser: '',
      count: 0,
      arrBooks: [],
      activeColor: 'red',
      fontSize: 30,
      books: [
          {
            name: 'Vue 2 - Advanced Guide',
            id: 11
          },
          {
            name: 'Vue 3 - Basic Guide',
            id: 22
          },
          {
            name: 'Vue 4 - The Mystery',
            id: 33
          },
        ]
    }
  },

  methods: {
    incrementCount() {
      this.count++
    },

    send() {
      console.log('send')
      this.nameUser
    }

  },

  computed: {
    rootStyles() {
      return {
        color: this.activeColor,
        fontSize: (this.fontSize + this.count) + 'px'
      }
    },

    styleObject() {
      return {
        color: 'red',
        fontSize: '13px'
      }
    },

    lengthNameUser() {
      return this.nameUser.length
    }
  }
}
</script>

<template>
  
  <div class="about" :class="{ active: !count }" @click="incrementCount" :style="rootStyles">
    <select>
      <option disabled value="">Выберите один из вариантов</option>
      <option>А</option>
      <option>Б</option>
      <option>В</option>
    </select>

   <form action="">
    <input 
      placeholder="input yuor name" 
      type="text" 
      v-model.lazy="nameUser"
    >
    <button @click.prevent="send">Send button</button>
   </form>
    
    <h1>This is an about page</h1>
  </div>
</template>
 
<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
