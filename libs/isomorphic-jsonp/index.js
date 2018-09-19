
/**
 * wpzheng - 2018-09-18
 * GET - DATA
 */

const axios = require('axios')
const jsonp = require('jsonp')


/** 
 * create a promise for jsonp 
 */
function jsonpGet(url, params) {
  return new Promise((resolve, reject) => {
    params = params || { t: new Date().getTime() }
    jsonp(url, params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Axios already supports promises
 */
function axiosGet(url, data) {
  return axios.get(url, {params: data})
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return err
    })
}

export default axiosGet