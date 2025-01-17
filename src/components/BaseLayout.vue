<!-- <template>
    <section class="base-layout">
        <slot></slot>
    </section>
</template> -->

<script>
import { h } from 'vue'

export default {
  render() {
    return h(
      'section', // имя тега
      {class: 'base-layout'}, // входные параметры/атрибуты
      this.$slots.default() // массив дочерних элементов
    )
  }
}
</script>

<style scoped>
.base-layout  {
  width: 1280px;
  padding: 3rem 0;
  margin: 0 auto;
  max-width: 100%;
}
</style>