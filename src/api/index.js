import http from '@/utils/http'

// 登录接口
export const login = params => http({ url: `/login/json`, method: 'post', data: params })