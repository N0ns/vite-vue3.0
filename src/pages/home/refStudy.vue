<template>
   <div></div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ref',
  setup() {
    /** 数据 */
    const data = ref(0) // 响应式数据

    return {
      data
    }
  }
}
</script>
