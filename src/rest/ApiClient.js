import axios from 'axios'

const userCache = new WeakMap()

export default class {
  constructor (endpoint) {
    this.endpoint = endpoint
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
  getUserInfo (options) {
    const key = options.userId.toString()
    if (options.force) {
      if (userCache.has(key)) {
        return Promise.resolve(userCache.get(key))
      }
    }
    console.log('request')
    const p = this.axios.get('/users/' + options.userId)
      .then(r => {
        console.log('get user ' + options.userId)
        if (r.status === 200) {
          userCache.set(key, r)
          console.log(r)
        }
        return r
      })
      console.log(p)
      return p
  }
  postBlog (blog) {
    return this.axios.post('/posts', {
      content: blog.content,
      userId: blog.userId,
      timestamp: blog.timestamp
    })
  }
  getMostRecentPost (options) {
    options = options || {}
    let params
    if (options.size) {
      params = { size: options.size }
    }
    return this.axios.get('/posts', { params })
  }
  getAvatarUrl (avatar) {
    let endpoint = this.endpoint
    let path = 'avatar/' + avatar
    if (endpoint.endsWith('/')) {
      return endpoint + path
    } else {
      return endpoint + '/' + path
    }
  }
  get userCache () {
    return userCache
  }
}
