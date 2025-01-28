<script>
export default {
  data() {
    return {
      count: 0
    }
  },

  props: {
    theme: {
      type: String,
      default: 'danger',
      validator(value) {
        // Значение должно соответствовать одной из этих строк
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  },

  computed: {
    rootClass() {
      return {
        [`shared-button--${this.theme}`]: true
      }
    }
  },

  methods: {
    changeTheme() {
      this.count++
      console.log('changeTheme')
      this.$emit('changeParam')
    }
  }
  
}
</script>

<template>
  <button class="shared-button" @click="changeTheme" :class="rootClass">
    <div>
      <slot></slot>
    </div>
  </button>

</template>

<style scoped>
.shared-button {
  padding: 8px 16px;
  border: solid 1px grey;
  border-radius: 4px;
}

.shared-button--danger {
  background-color: rgba(255, 0, 0, .2)
}

.shared-button--warning {
  background-color: rgba(255, 0, 0, .2)
}

.shared-button--success {
  background-color: rgba(0, 0, 255, .2)
}

</style>





