import axios from '../utils/axios'
import host from '../utils/host'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    params: {},
    isShowPay: false,
    callback: _.noop
  },
  mutations: {
    TOGGLE_PAY_PANEL: (state, { isShowPay }) => {
      state.isShowPay = isShowPay
    },
    PICK_ORDER_PARAMS: (state, params) => {
      state.params = _.merge({}, params)
    },
    SET_ORDER_CALLBACK: (state, { callback }) => {
      state.callback = callback
    }
  },
  actions: {
    async createOrder ({ commit, state }) {
      const res = await axios.request(host.pay.order, state.params)
      return res
    },
    togglePayPanel ({ commit }, { isShowPay }) {
      commit('TOGGLE_PAY_PANEL', { isShowPay })
    },
    pickOrder ({ commit }, params) {
      commit('PICK_ORDER_PARAMS', params)
    },
    setOrderCallback ({ commit }, { callback }) {
      commit('SET_ORDER_CALLBACK', { callback })
    }
  }
}
