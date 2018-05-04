export default class {
  constructor (username, password, gender, avatar, email, birthday) {
    console.log(arguments)
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

    if (avatar !== undefined && avatar !== null) {
      this.avatar = avatar
    }

    if (email !== undefined && email !== null) {
      this.email = email
    }

    if (birthday !== undefined && birthday !== null) {
      this.birthday = birthday
    }
  }
}
