import axios from '../utils/axios'
import host from '../utils/host'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async reportFormId ({ commit }, { formId }) {
      const res = await axios.request(host.user.form, {
        form_id: formId
      })
      return res
    },
    async reportCapture ({ commit }, params) {
      const res = await axios.request(host.user.capture, params)
      return res
    }
  }
}
