export default {
  onShareAppMessage() {
    return {
      title: this.$store.state.base.baseConfig.share_title,
      path: 'pages/index/main',
      imageUrl: this.$store.state.base.baseConfig.share_group_img
    }
  }
}
