import _ from 'lodash'
import host from './host'
import baseConfig from './config'
import { promisify } from './helper'

const black = []

export const defaultHeaders = {}

class BaseAxios {
  async login () {
    const res = await promisify('login')
    const result = await this.request(
      host.user.login,
      {
        ...baseConfig,
        code: res.code
      },
      false
    )
    wx.setStorageSync('token', result.data.token)
    return result.data.token
  }

  async request (url, data = {}, auth = true, method = 'POST', headers = {}) {
    headers = _.merge(defaultHeaders, headers)
    method = method.toUpperCase()
    data = _.merge(data, baseConfig)
    if (auth) {
      data.token = await this.getToken()
    }
    const result = await promisify('request', {
      url,
      data,
      method,
      headers
    })
    if (result.data.code === 101) {
      await this.login()
      return
    }
    if (result.data.code !== 0 && black.indexOf(url) < 0) {
      return wx.showModal({
        title: '温馨提示',
        content: result.data.msg,
        showCancel: false
      })
    }
    return result.data
  }

  /**
   * get token
   */
  async getToken () {
    let token = wx.getStorageSync('token')
    if (!token) {
      token = await this.login()
    }
    return token
  }
}

export default new BaseAxios()
