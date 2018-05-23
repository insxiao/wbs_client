export default class PostData {
  constructor (content, userId, timestamp) {
    if (content === undefined || userId === undefined) {
      throw new Error('missing required arguments content and(or) userId')
    }
    this.content = content
    this.userId = userId
    if (timestamp) {
      this.timestamp = timestamp
    } else {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000 // offset in milliseconds
      this.timestamp = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    }
  }

  toString () {
    return `PostData(${this.content}, ${this.userId}, ${this.timestamp})`
  }
}
