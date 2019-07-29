export const BASE_HOST = 'https://third.mamapai.net'

export default {
  user: {
    login: `${BASE_HOST}/user/login`,
    update: `${BASE_HOST}/user/update-user-info`,
    report: `${BASE_HOST}/user/report`,
    ranking: `${BASE_HOST}/user/ranking-list`,
    addFriend: `${BASE_HOST}/user/add-friend`,
    info: `${BASE_HOST}/user/user-info`,
    form: `${BASE_HOST}/user/add-form-id`,
    capture: `${BASE_HOST}/user/report-jt`,
    status: `${BASE_HOST}/user/user-status`
  },
  pay: {
    order: `${BASE_HOST}/pay/create-order`
  },
  interface: {
    appConfig: `${BASE_HOST}/test/chat-config`,
    qrcode: `${BASE_HOST}/new-note/get-qrcode`
  }
}
