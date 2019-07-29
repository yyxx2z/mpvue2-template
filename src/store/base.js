import axios from '../utils/axios'
import host from '../utils/host'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    baseConfig: {},
    isPlayAudio: true,
    testList: [],
    testData: {}
  },
  mutations: {
    MERGE_CONFIG: (state, payload) => {
      state.baseConfig = _.merge({}, payload)
    }
  },
  actions: {
    async getBaseConfig({ commit }) {
      const res = await axios.request(host.interface.appConfig, {}, false)
      const baseConfig = res.data
      wx.setStorageSync('config', baseConfig)
      commit('MERGE_CONFIG', { ...baseConfig })
      return baseConfig
    }
  }
}
