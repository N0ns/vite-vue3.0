<template>
  <div class="flex_f">
    <div>
      原始值:{{ obj.value }}
    </div>
    <div>
      ref:{{ state1 }}
    </div>
    <button @click="add1">add1</button>
    <div>
      toRef:{{ state2 }}
    </div>
    <button @click="add2">add2</button>
  </div>

</template>

<script setup>
import { ref, toRef } from 'vue'

const obj = { value: 0 }
const state1 = ref(obj.value) //
const state2 = toRef(obj, 'value') // toRef方法是将对象中的某个值转化成响应式数据
const add1 = () => {
  state1.value++
  console.log('原始值：', obj.value)
  console.log('响应式数据：', state1.value)
}
const add2 = () => {
  state2.value++
  console.log('原始值：', obj.value)
  console.log('响应式数据：', state2.value)
}
// ref 是对传入数据的拷贝；toRef 是对传入数据的引用
// ref 的值改变会更新视图；toRef 的值改变不会更新视图
</script>

