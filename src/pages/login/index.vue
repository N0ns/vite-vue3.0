<template>
  <div>登录页</div>
  <el-button @click="login">登录</el-button>
</template>

<script>
import { useRouter,useRoute } from 'vue-router'
export default {
  setup(props,ctx){
    const router = useRouter()
    console.log(ctx,useRoute)
    const login = ()=>{
      router.push('/home')
    }
    return {
      login
    }
  }
}
</script>

<style>

</style>