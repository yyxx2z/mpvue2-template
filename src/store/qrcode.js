import axios from '../utils/axios'
import host from '../utils/host'

export default {
  namespaced: true,
  state: {
    uri: ''
  },
  mutations: {
    MERGE_QRCODE: (state, { qrcode }) => {
      state.uri = qrcode
    }
  },
  actions: {
    async createQrCode ({ commit }, { scene, page, width }) {
      const res = await axios.request(host.interface.qrcode, {
        scene,
        page,
        width
      })
      commit('MERGE_QRCODE', { qrcode: res.data })
    }
  }
}
