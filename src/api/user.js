import request from '@/utiles/request'
import store from '@/store'
/**
 *登录
 */
export const getSMS = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 * 登录
 * @param {*} mobile
 * @param {*} code
 * @returns
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
