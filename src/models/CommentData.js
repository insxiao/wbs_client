import assert from 'assert'

/**
* blogId: Long,
* content: String,
* stars: Int,
* userId: Long,
* timestamp: LocalDateTime
*/
export default class CommentData {
  constructor (blogId, content, userId) {
    const notUndefinedNull = v => v !== undefined && v != null
    assert(notUndefinedNull(blogId), 'blogId is undefined | null')
    assert(notUndefinedNull(content) && content.length > 0, 'content is undefind | null | ""')
    assert(notUndefinedNull(userId), 'userId is undefined | null')

    this.blogId = blogId
    this.content = content
    this.userId = userId
    this.stars = 0

    var tzoffset = (new Date()).getTimezoneOffset() * 60000 // offset in milliseconds
    this.timestamp = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
  }

  static of (blogId, content, userId) {
    return new CommentData(blogId, content, userId)
  }

  static is (comment) {
    return comment instanceof CommentData
  }
}
