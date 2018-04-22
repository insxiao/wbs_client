import axios from 'axios'
export default class {
  constructor (endpoint) {
    if (endpoint === undefined || endpoint === null) {
      throw new Error('missing endpoint')
    }
    this.axios = axios.create({
      baseURL: endpoint,
      withCredentials: true
    })
  }
  login (username, password) {
    return this.axios.get('/users/login', {
      auth: {
        username,
        password
      }
    })
  }
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
    return this.axios.post('/users', registerInfo)
  }
  getUserInfo (userId) {
    return this.axios.get('/users/' + userId)
  }
  postBlog (blog) {
    return this.axios.post('/posts', {
      content: blog.content,
      userId: blog.userId,
      timestamp: blog.timestamp
    })
  }
  getMostRecentPost () {
    return this.axios.get('/posts')
  }
}
