<template>
  <div>
    <div><button @click="setType('toRef')">toRef</button><button @click="setType('reactive')">reactive</button><button @click="setType('toRefs')">toRefs</button></div>
    <ToRef v-if="type==='toRef'" />
    <reactiveCom v-if="type==='reactive'" />
    <ToRefs v-if="type==='toRefs'" />
  </div>

</template>

<script>
import { reactive, ref } from 'vue'
import ToRef from './toRef.vue'
import reactiveCom from './reactive.vue'
import ToRefs from './toRefs.vue'
function change(params) {
  const type = ref('')
  const setType = (params) => {
    type.value = params
  }
  console.log(type)
  return { type, setType }
}
export default {
  name: '',
  /** 组件 */
  components: {
    ToRef,
    reactiveCom,
    ToRefs
  },

  setup() {
    /** 数据 */
    const data = reactive({})
    const { type, setType } = change()
    return {
      data,
      type,
      setType
    }
  }
}
</script>

<style lang="scss" scoped></style>
