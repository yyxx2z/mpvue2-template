<script>
import { querystring } from './utils/helper'
import axios from './utils/axios'

export default {
  onHide() {
    const backgroundAudio = wx.getBackgroundAudioManager()
    this.$store.dispatch('user/toggleAuthPanel', {
      isShowAuth: false
    })
    backgroundAudio.pause()
    this.$store.dispatch('base/toggleAudio', {
      isPlayAudio: false
    })
  },
  async onShow() {
    const system = wx.getSystemInfoSync()

    const refferInfo = this.$root.$mp.appOptions.referrerInfo
    console.log('******************', refferInfo)
    if (refferInfo && refferInfo.extraData && refferInfo.extraData.pay.ok) {
      this.$store.state.order.callback()
    }

    const statusRes = await this.$store.dispatch('user/getUserStatus')
    if (statusRes.data.status <= 0) {
      return wx.redirectTo({
        url: '../temp/main'
      })
    }

    let { query } = this.$root.$mp.appOptions

    // 处理channel
    const user = wx.getSystemInfoSync('user')

    if (query.channel) {
      wx.reportAnalytics('channel', {
        user_id: user.id,
        nickname: user.nickname,
        channel: query.channel
      })
    }

    // 跳转处理
    const redirect = wx.getStorageSync('redirect')
    if (query.app_id && !redirect) {
      wx.setStorageSync('redirect', true)
      let data = {
        appId: query.app_id,
        path: query.path
      }
      if (query.extra_app_id && query.extra_path) {
        data.extraData = {
          app_id: query.extra_app_id,
          path: query.extra_path
        }
        if (query.decrypt) {
          data.extraData.decrypt = query.decrypt
        }
      }
      return wx.navigateToMiniProgram(data)
    } else {
      wx.setStorageSync('redirect', '')
    }

    // 处理社交关系处理
    let uid = query.uid
    if (query.scene) {
      let params = querystring(decodeURIComponent(`?${query.scene}`))
      uid = params.uid
      // 上报来源
      if (params.s) {
        wx.reportAnalytics('share_img_count', {
          user_id: user.id,
          nickname: user.nickname,
          img_name: params.s
        })
      }

      if (params.channel) {
        wx.reportAnalytics('channel', {
          user_id: user.id,
          nickname: user.nickname,
          channel: params.channel
        })
      }
    }

    if (uid && user.id !== +uid) {
      this.$store.dispatch('friend/addFriend', {
        friendUserId: uid
      })
    }

    // 截图处理
    wx.onUserCaptureScreen(async () => {
      await this.$store.dispatch('report/reportCapture', {
        page: getCurrentPages()[getCurrentPages().length - 1].route,
        phone_model: system.model
      })
    })

    // 背景音乐
    if (process.env.NODE_ENV !== 'development') {
      // const backgroundAudio = wx.getBackgroundAudioManager()
      // if (+response[1].template === 0) {
      //   this.$store.dispatch('base/toggleAudio', {
      //     isPlayAudio: true
      //   })
      //   backgroundAudio.play()
      //   backgroundAudio.title = '小纸条'
      //   backgroundAudio.src = response[1].music
      // }
    }
  },
  async created() {
    const token = wx.getStorageSync('token')
    if (!token) {
      await axios.login()
    }
    const [config, user] = await Promise.all([
      this.$store.dispatch('base/getBaseConfig'),
      this.$store.dispatch('user/getUserInfo')
    ])
    wx.setStorageSync('config', config)
    wx.setStorageSync('user', user)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
