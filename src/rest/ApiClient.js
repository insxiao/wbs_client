import axios from 'axios'
import NavieCache from '../NaiveCache'
import assert from 'assert'
import CommentData from '../models/CommentData'

const userCache = new NavieCache()

export default class {
  constructor (endpoint) {
    this.endpoint = endpoint
    if (endpoint === undefined || endpoint === null) {
      throw new Error('missing endpoint')
    }
    this.axios = axios.create({
      baseURL: endpoint,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'V'
      }
    })
  }

  login (username, password) {
    return this.axios.get('/users/login', {
      auth: {
        username: username,
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

      const missingRequiredField = requiredFields
        .some(f => registerInfo[f] === undefined ||
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

  /**
  * get user info
  *
  */
  getUserInfo (options) {
    const key = options.userId.toString()
    if (userCache.has(key) && userCache.get(key)) {
      return userCache.get(key)
    }

    const p = this.axios.get('/users/' + options.userId)
    userCache.set(key, p)
    p.then(r => {
      if (r.status !== 200) {
        userCache.delete(key)
      }
      return r
    }, reason => {
      userCache.delete(key)
      return Promise.reject(reason)
    })
    return p
  }

  postBlog (blog) {
    return this.axios.post('/posts', {
      content: blog.content,
      userId: blog.userId,
      timestamp: blog.timestamp
    })
  }

  commentBlog (comment) {
    assert(CommentData.is(comment), 'comment must be a CommentData')
    return this
      .axios
      .post('/comments', comment)
  }

  getMostRecentPost (options) {
    options = options || {}
    const allowedParams = ['size', 'offset', 'userId', 'followerId']
    let params = Object.keys(options)
      .filter(k => allowedParams.indexOf(k) !== -1)
      .reduce((obj, key) => {
        obj[key] = options[key]
        return obj
      }, {})
    return this.axios.get('/posts', { params })
  }

  getPost (options) {
    if (!options.id) {
      throw new Error('missing required arguments')
    }
    return this.axios.get('/posts/' + options.id)
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

  search (query) {
    const allowedParams = ['q', 'type', 'offset', 'size']
    const params = Object.keys(query)
      .filter(key => allowedParams.includes(key))
      .reduce((obj, key) => {
        obj[key] = query[key]
        return obj
      }, {})
    console.log('query params', params)
    return this.axios.get('/search', {
      params
    })
  }

  uploadImage (formData) {
    return this.axios.post('/formUpload', formData)
  }

  /**
   * @param success called if success
   * @param failure called is failed
   * @returns {*}
   */
  getFollowedUsers (success, failure) {
    return this
      .axios
      .get('/follows')
      .then(r => {
        if (typeof success === 'function') {
          success(r)
        }
        return Promise.resolve(r)
      }).catch(reason => {
        if (typeof failure === 'function') {
          failure(reason)
        }
        return Promise.reject(reason)
      })
  }

  getFollowedUser ({ userId }) {
    return this.axios.get('/follows/' + userId)
  }

  follow ({ userId }) {
    console.log('follow with', arguments)
    return this.axios.post('/follows', {
      userId
    })
  }

  unfollow ({ userId }) {
    return this.axios.delete('/follows', {
      data: { userId }
    })
  }

  get userCache () {
    return userCache
  }
}
