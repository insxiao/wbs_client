'use strict'
import axios from 'axios'

/**
 * function for creating web api client
 * @param endpoint rest server endpoint address
 * @returns {*}
 */
export default function (endpoint) {
  const client = axios.create({
    baseURL: endpoint,
    withCredentials: true
  })
  return {
    // Login in with http authorization
    login (username, password) {
      return client.get(endpoint + '/users/login', {
        auth: {
          username,
          password
        }
      })
    },
    /**
     * send a request to server
     * require validate before call this method
     * @param registerInfo object with user input data
     */
    register (registerInfo) {
      return client.post('/users', registerInfo)
    },
    getUserInfo (userId) {
      return client.get('/users/' + userId)
    },
    post (message) {
      return client.post('/posts', {
        content: message.content,
        userId: message.userId,
        timestamp: message.timestamp
      })
    }
  }
}
