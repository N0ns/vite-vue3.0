
const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const params = { username: username.trim(), password }
    console.log(params)
    const res = { name: 'test', age: 18, gender: '1' }
    commit('userInfo', res)
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password }).then(res => {
    //     const { data } = res
    //     resolve(res)
    //     if (data.authorization) {
    //       localStorage.set('accessToken', data.authorization)
    //       commit('userCode', data.userCode)
    //       commit('userType', data.userType)
    //       commit('userRoles', data.roles)
    //     }
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  }
}

export default actions
