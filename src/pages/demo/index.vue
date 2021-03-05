<template>
  <div><button @click="add">add</button></div>
  <div>computed计算属性:{{comput}}</div>
</template>

<script>
import { computed, ref,watch, watchEffect } from 'vue'
export default {
  name: '',
  /** 组件 */
  components: {},
  /** 父组件传过来的值 */
  props: {},
  setup() {
    /** 数据 */
    let data = ref(0)
    let comput = computed(()=>data.value+1)
    watch(data,(n,o)=>{
      console.log(`原值为：`,o)
      console.log(`新值为：`,n)
    })
    watchEffect(()=>{
      console.log('watchEffect只能获取新值,初始化时执行一次',`新值为:`,data.value)
      console.log('使用计算属性时，注意可能需要解构',comput)
    })
    /** 自定义方法 */
    const add = ()=>{
      data.value++
    }
    /** 返回值 */
    return {
      data,
      add,
      comput
    }
  }
}
</script>

<style lang="scss" scoped></style>
