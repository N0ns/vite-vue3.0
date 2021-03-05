<template>
  <div>

  </div>
</template>
<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  setup() {
    const obj = {
      name: 'qianduan',
      age: 18,
      gender: '0'
    }
    const state1 = ref(obj)
    const state2 = reactive(obj)
    const state3 = toRefs(obj)
    console.log('ref:', state1)
    console.log('reactive:', state2)
    console.log('toRefs:', state3)
    return {
      state1,
      state2,
      state3
    }
  }
}
</script>
