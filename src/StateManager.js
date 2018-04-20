// constants
export const userKey = 'user'

function serviceFactoryBuilder () {
  function newService () {
    const storage = window.localStorage
    if (storage === undefined || storage === null) {
      throw new Error('local storage unavailable')
    }
    let userCache
    return {
      getCurrentUser () {
        const user = storage[userKey]
        if (user === undefined || user === null) {
          return undefined
        } else {
          return JSON.parse(user)
        }
      },
      get currentUser () {
        if (!userCache) {
          userCache = this.getCurrentUser()
        }
        return userCache
      },
      set currentUser (user) {
        this.updateUser(user)
      },
      /**
       * save user to local storage
       * @param user string or object
       */
      updateUser (user) {
        function checkRequiredFields (obj) {
          const requiredFields = ['id', 'name', 'gender']
          const c = requiredFields.every(f => f in userObj)
          return c
        }
        let userObj = null
        if ((typeof user) === 'string') {
          userObj = JSON.parse(user)
        } else if ((typeof user) === 'object') {
          userObj = user
        }
        if (!checkRequiredFields(userObj)) {
          throw new Error('missing required fields')
        }
        storage[userKey] = JSON.stringify(userObj)
      }
    }
  }
  var service
  function f () {
    if (service === undefined) {
      service = newService()
      return service
    } else {
      return service
    }
  }
  return f
}

var factory = serviceFactoryBuilder()

factory.userKey = userKey

export default factory

export const VuePlugin = {
  install (Vue, options) {
    Vue.prototype.$appState = factory()
  }
}
