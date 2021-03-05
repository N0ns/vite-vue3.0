<template>
  <son />
</template>

<script>
import { provide, reactive, watch, readonly } from 'vue'
import son from './son/son.vue'
export default {
  components: {
    son
  },
  setup() {
    const obj = {
      name: 'test',
      age: 18,
      gender: '0'
    }
    const list = reactive([1, 2, 3, 4])
    const person = reactive(obj)
    watch([person, list], ([n, o], [n1, o1]) => {
      console.log(n)
      console.log(n1)
    })
    provide('obj', readonly(person))
    provide('list', list)
    return {
      person,
      list
    }
  }
}
</script>
