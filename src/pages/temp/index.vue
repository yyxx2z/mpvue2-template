<template>
  <block>
    <scroll-view scroll-y
      v-if="!id"
      class="temp__wrapper">
      <view class="temp__wrapper_title">学习成语</view>
      <a v-for="item in datas"
        :key="item.id"
        :href="'/pages/temp/main?id=' + item.id"
        class="temp__wrapper_item">
        <button class="temp__item">{{item.title}}</button>
      </a>
    </scroll-view>
    <view class="temp__detail_wrap"
      v-if="id">
      <view class="temp__detail_name">{{title}}</view>
      <view class="temp__detail_title">解释：</view>
      <view class="temp__detail_info">{{explain}}</view>
      <view class="temp__detail_title">出处：</view>
      <view class="temp__detail_info">{{fromwhere}}</view>
    </view>
  </block>
</template>

<script>
import datas from '../../utils/data'
import _ from 'lodash'

export default {
  data() {
    return {
      datas,
      id: ''
    }
  },

  computed: {
    title() {
      if (this.id) {
        return _.result(_.find(this.datas, { id: this.id }), 'title')
      }
    },
    explain() {
      if (this.id) {
        return _.result(_.find(this.datas, { id: this.id }), 'explain')
      }
    },
    fromwhere() {
      if (this.id) {
        return _.result(_.find(this.datas, { id: this.id }), 'fromwhere')
      }
    }
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '学习成语'
    })
  },

  onUnload() {
    this.id = ''
  },

  mounted() {
    this.id = this.$root.$mp.query.id
  }
}
</script>

<style lang="scss" scoped>
.temp__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;

  .temp__wrapper_title {
    width: 100%;
    text-align: center;
    padding: 20rpx;
    box-sizing: border-box;
  }

  .temp__wrapper_item {
    padding: 20rpx 30rpx;

    .temp__item {
      position: relative;
      display: block;
      margin-left: auto;
      margin-right: auto;
      padding-left: 14px;
      padding-right: 14px;
      box-sizing: border-box;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      line-height: 2.55555556;
      border-radius: 5px;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
      color: #000000;
      background-color: #f8f8f8;

      &:after {
        display: block;
      }
    }
  }
}
.temp__detail_wrap {
  padding: 20rpx;
  height: 100%;
  background-color: #fff;
  .temp__detail_name {
    width: 100%;
    padding: 20rpx;
    text-align: center;
    box-sizing: border-box;
  }
  .temp__detail_title {
    padding-top: 20rpx;
    font-size: 30rpx;
    font-weight: bold;
  }
  .temp__detail_info {
    padding: 10rpx 20rpx;
    font-size: 36rpx;
  }
}
</style>