<template>
  <view class="modal__auth"
    v-if="!userInfo.avatar && isShowAuth">
    <view class="cover"></view>
    <view class="body">
      <text class="title">授权</text>
      <text class="tip">亲，你需要先授权才能玩哦</text>
      <button open-type="getUserInfo"
        @getuserinfo="getUserInfo"
        class="auth">
        点我授权
      </button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isShowAuth: state => state.user.isShowAuth,
      user: state => state.user.info
    }),
    userInfo() {
      return wx.getStorageSync('user')
    }
  },
  methods: {
    async getUserInfo(event) {
      if (event.mp.detail.errMsg === 'getUserInfo:ok') {
        let { query } = this.$root.$mp.appOptions
        if (query.bind_user_id) {
          await this.$store.dispatch('user/updateUserInfo', {})
          await this.$store.dispatch('user/getUserInfo')
          this.$store.dispatch('user/toggleAuthPanel', {
            isShowAuth: false
          })
          wx.showModal({
            title: '提示',
            content: '已领取好友赠送的红包劵',
            showCancel: false,
            confirmColor: '#F5A623'
          })
        } else {
          await this.$store.dispatch('user/updateUserInfo', {})
          await this.$store.dispatch('user/getUserInfo')
          this.$store.dispatch('user/toggleAuthPanel', {
            isShowAuth: false
          })
        }
        wx.reportAnalytics('channel_auth', {
          user_id: this.user.id,
          nickname: this.user.nickname,
          channel: query.channel
        })
        // 黑名单用户
        const statusRes = await this.$store.dispatch('user/getUserStatus')
        if (statusRes.status <= 0) {
          wx.redirectTo({
            url: '../contact/main'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal__auth {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  z-index: 200;

  .cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: #000;
    opacity: 0.7;
  }

  .body {
    position: absolute;
    width: 630rpx;
    height: 470rpx;
    top: calc(50% - 235rpx);
    left: calc(50% - 315rpx);
    background: #fff;
    z-index: 11;
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 36rpx;
      font-family: 'PingFang-SC';
      color: #333;
      margin-top: 30rpx;
    }

    .tip {
      font-size: 32rpx;
      font-family: 'PingFang-SC';
      color: #333;
      margin-top: 60rpx;
    }

    .auth {
      width: 440rpx;
      height: 90rpx;
      font-size: 32rpx;
      color: #333;
      background: #f8da70;
      border-radius: 45rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: 135rpx;
    }
  }
}
</style>
