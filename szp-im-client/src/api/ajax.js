/* 
  使用axios发送ajax请求,返回promise对象
*/
import axios from 'axios'

export default function ajax(url, data={}, method='GET') {
  if (method === 'GET') {
    let parmStr = ''
    Object.keys(data).forEach (key => {
      parmStr += key + '=' + data[key] + '&'   
    })
    if (parmStr) {
      parmStr = parmStr.substring(0, parmStr.length -1)
    }
    return axios.get(url + '?' + parmStr)
  } else {
    return axios.post(url, data)
  }
}