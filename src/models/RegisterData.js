export default class {
  constructor (username, password, gender, email, birthday) {
    function requireNotUndefined (value) {
      if (value === undefined ||
        value === null ||
        ((typeof value) === 'string' && value.length === 0)) {
        throw new Error('illegal argument value')
      }
    }
    requireNotUndefined(username)
    requireNotUndefined(password)
    requireNotUndefined(gender)

    this.name = username
    this.password = password
    this.gender = gender

    if (email !== undefined && email !== null) {
      this.email = email
    }

    if (birthday !== undefined && birthday !== null) {
      this.birthday = birthday
    }
  }
}
