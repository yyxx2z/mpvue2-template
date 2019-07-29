import Vue from 'vue'
import Vuex from 'vuex'
import base from './base'
import order from './order'
import qrcode from './qrcode'
import user from './user'
import friend from './friend'
import report from './report'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base,
    order,
    qrcode,
    user,
    friend,
    report
  }
})

export default store
