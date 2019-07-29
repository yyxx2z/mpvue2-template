import _ from 'lodash'
import { querystring } from '@/utils/helper'

export default {
  methods: {
    navigateTo(url) {
      wx.navigateTo({
        url
      })
    },
    redirectTo(url) {
      wx.redirectTo({
        url
      })
    },
    decodeQuery() {
      let { query } = this.$root.$mp
      let decodeParams = _.merge({}, query)
      decodeParams.scene && delete decodeParams.scene
      if (query.scene) {
        const params = querystring(decodeURIComponent(`?${query.scene}`))
        decodeParams = _.merge(decodeParams, params)
      }
      return decodeParams
    },
    decodeTarget(e) {
      return e.currentTarget.dataset
    }
  }
}
