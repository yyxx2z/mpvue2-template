import axios from '../utils/axios'
import host from '../utils/host'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addFriend ({ commit }, { friendUserId }) {
      const res = await axios.request(host.user.addFriend, {
        friend_user_id: friendUserId
      })
      return res
    }
  }
}
