<template>
  <div class="container flex">
    <div class="content flex_ce">
      <div class="login-box">
        <el-form ref="form" :model="loginForm" :rules="rules" status-icon class="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button v-db-click :disabled="!loginForm.username||!loginForm.password" style="width:100%" type="primary" :loading="isLogin" @click="submitForm">{{ isLogin?'登录中':'登录' }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref, getCurrentInstance, onMounted } from 'vue'
import { useStore, mapActions } from 'vuex'
export default {
  setup(props, obj) {
    const isLogin = ref(false)
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [{ message: '请输入账号', required: true }],
      password: [{ message: '请输入密码', required: true }]
    })

    const form = ref(null)
    // 获取当前组件实例
    // const actions = { ...mapActions(['login']) }
    const store = useStore()
    const router = useRouter()
    const submitForm = () => {
      const params = {
        ...loginForm
      }
      store.dispatch('login', params)
      console.log(store)
      // console.log(actions.login(params))
      // ctx.$message.success('登录成功')
      // toHome()
    }
    const toHome = () => {
      router.push('/home')
    }
    return {

      submitForm,
      toHome,
      loginForm,
      rules,
      form,
      isLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100vh;
  width: 100%;
  .content{
    padding: 130px;
    width: 60%;
    border-radius:5px;
    box-shadow:0 0 20px rgb(0 0 0 / 10%);
    .login-box{
      width: 400px;
    }
  }
}

</style>
