<template>
  <div>
    响应式数据对象data：{{ data1.name }}
  </div>
  <div>
    响应式数据name：{{ data2.name }}
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  setup() {
    const obj = {
      name: 'xiaoming',
      age: 19
    }
    const data1 = reactive(obj)
    const data2 = ref(obj) // 可以理解为reactive({value:obj})
    console.log(data1)
    console.log(data2)
    return {
      data1,
      data2
    }
  }
}
// 基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref
// 引用类型值（Object 、Array）使用 reactive
</script>
