import axios from 'axios'
import qs from 'qs'
let cancel,
  promiseArr = {}
// const CancelToken = axios.CancelToken;
// axios.interceptors.request.use(config => {
//   // if (promiseArr[config.url]) {
//   //   promiseArr[config.url]('操作取消')
//   //   promiseArr[config.url] = cancel
//   // } else {
//   //   promiseArr[config.url] = cancel
//   // }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.statusText === 'OK') {
      return response
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    let error = qs.parse(qs.stringify(err))
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.response)
  }
)

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'http://192.168.90.45:5000'
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

export default {
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
          method: 'get',
          url,
          params: param
          // cancelToken: new CancelToken(c => {
          //   cancel = c
          // })
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, param) {
    return new Promise((resolve, reject) => {
      axios({
          method: 'post',
          url,
          data: param,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
