import axios from '../utils/axios'
import host from '../utils/host'
import { promisify } from '../utils/helper'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    info: {},
    isShowAuth: false,
    callback: _.noop,
    share: {}
  },
  mutations: {
    MERGE_USER: (state, payload) => {
      state.info = _.merge({}, payload)
      state.isShowAuth = !state.info.avatar
    },
    TOGGLE_AUTH_PANEL: (state, { isShowAuth }) => {
      state.isShowAuth = isShowAuth
    },
    SET_AUTH_CALLBACK: (state, { callback }) => {
      state.callback = callback
    },
    SET_SHARE_PARAMS: (state, payload) => {
      state.share = _.merge({}, payload)
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      let res = await axios.request(host.user.info)
      if (res.data.id) {
        wx.setStorageSync('user', res.data)
      }
      commit('MERGE_USER', { ...res.data })
      return res.data
    },
    async updateUserInfo({ commit }, { channel }) {
      const { userInfo } = await promisify('getUserInfo', { lang: 'zh_CN' })
      const updates = _.merge({}, userInfo)
      updates.avatar = updates.avatarUrl
      updates.nickname = updates.nickName
      delete updates.avatarUrl
      delete updates.nickName
      if (channel) {
        updates.channel = channel
      }
      await axios.request(host.user.update, {
        ...updates
      })
    },
    async getUserStatus() {
      const res = await axios.request(host.user.status)
      return res
    },
    toggleAuthPanel({ commit }, { isShowAuth }) {
      commit('TOGGLE_AUTH_PANEL', { isShowAuth })
    },
    setAuthCallback({ commit }, { callback }) {
      commit('SET_AUTH_CALLBACK', { callback })
    },
    setShareParams({ commit }, params) {
      commit('SET_SHARE_PARAMS', params)
    },
    async shareAction({ commit }, params) {
      const res = await axios.request(host.interface.share, params)
      return res
    }
  }
}
