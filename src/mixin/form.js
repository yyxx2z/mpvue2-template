export default {
  methods: {
    reportFormId(e) {
      this.$store.dispatch('report/reportFormId', { formId: e.target.formId })
    },
    moreAction() {
      console.log(',.,,,.,,.,,.,.,.,.', this.$store.state.base.baseConfig)
    }
  }
}
