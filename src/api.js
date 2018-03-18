var endpoint = 'http://localhost:9000'

var user = endpoint + '/user'
import axios from 'axios'

axios.create({
  baseURL: endpoint,
  withCredentials: true
})

const debug = console.debug

export default {
  login (username, password) {
    return axios.get(endpoint + '/user/login', {
      auth: {
        username,
        password
      }
    })
  }
}
