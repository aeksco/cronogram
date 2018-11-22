
// Auth Module State
export default {
  token: localStorage.token || '',
  fetching: false,
  logging_in: false,
  logged_in: false,
  current_user: {},
  login_user: {
    username: '',
    email: '',
    password: '',
    errors: {}
  },
  register_user: {
    email: '',
    username: '',
    password: '',
    passwordverify: '',
    errors: {}
  }
}
