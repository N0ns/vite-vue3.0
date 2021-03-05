<template>
  <div>鼠标x轴坐标 >>> {{ x }}</div>
  <div>鼠标y轴坐标 >>> {{ y }}</div>
</template>
<script>
import { reactive, toRefs, onMounted, onUnmounted, getCurrentInstance } from 'vue'
export default {
  setup(props) {
    const position = reactive({ x: 0, y: 0 })
    const { x, y } = toRefs(position)
    const update = (page) => {
      // position
      position.x = page.pageX
      position.y = page.pageY
    }
    const { ctx } = getCurrentInstance()
    onMounted(() => {
      console.log(ctx)
      window.addEventListener('mousemove', update)
    })
    onUnmounted(() => {
      window.removeEventListener('mousemove', update)
    })
    return {
      x, y, update
    }
  }
}
</script>
