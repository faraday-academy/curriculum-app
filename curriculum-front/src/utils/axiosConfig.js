import axios from 'axios'
// import router from '../router'

axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/v1`
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // TODO: handle 401s
  // if (error.response.status == 401) {
  //   router.replace('/login')
  // }
  // handleErrorMessage
  return Promise.reject(error)
})

export default axios
