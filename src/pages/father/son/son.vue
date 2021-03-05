<template>
  <div>
    姓名：{{ obj.name }}
    年龄：{{ obj.age }}
    <button @click="add">add</button>

    <div v-for="it in list" :key="it" class="flex">{{ it }} <button @click="addIt(it)">add</button></div>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'
export default {
  setup(props) {
    console.log(inject)
    const obj = inject('obj')
    // const list = inject('list')
    const list = reactive([1, 2, 3, 4])
    const add = () => {
      obj.age++
    }
    const addIt = (it) => {
      it = it + 1
      console.log(list)
    }
    return { obj, add, list, addIt }
  }
}
</script>

<style lang="scss" scoped>

</style>
