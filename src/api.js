import axios from 'axios'
var endpoint = 'http://192.168.1.68:9000'

axios.create({
  baseURL: endpoint,
  withCredentials: true
})

export default {
  // Login in with http authorization
  login (username, password) {
    return axios.get(endpoint + '/user/login', {
      auth: {
        username,
        password
      }
    })
  }
}
