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
      this.timestamp = (new Date()).toISOString()
    }
  }

  toString () {
    return `PostData(${this.content}, ${this.userId}, ${this.timestamp})`
  }
}
