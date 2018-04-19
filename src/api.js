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
      function checkRequiredInfo () {
        const requiredFields = ['name', 'password', 'gender']
        if (registerInfo === undefined || registerInfo === null) {
          throw new Error('register info is undefined or null')
        }

        const missingRequiredField = requiredFields.some(f => registerInfo[f] === undefined ||
          registerInfo[f] === undefined)
        if (missingRequiredField) {
          throw new Error('register missing required fields')
        }

        let nameLength = registerInfo.name.length
        if (nameLength < 2) {
          throw new Error('name too short')
        }

        if (nameLength > 255) {
          throw new Error('name too long')
        }

        const birthdayFormat = /^(\d{4})-(0[1-9]|1[0-2])-(\d{2})$/
        if (registerInfo.birthday && !birthdayFormat.test(registerInfo.birthday)) {
          throw new Error('birthday format error')
        }
      }
      checkRequiredInfo()

      return client.post('/users', registerInfo)
    }
  }
}
