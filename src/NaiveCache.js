// ===================================================

export default class NaiveCache {
  constructor (limit) {
    this.limit = limit
    this._map = {}
  }

  get size () {
    return Object.keys(this._map).length
  }

  set (key, value) {
    this._map[key] = value
    return this
  }

  get (key) {
    return this._map[key]
  }

  delete (key) {
    if (this._map[key]) {
      const value = this._map[key]
      delete this._map[key]
      return value
    }
  }

  isEmpty () {
    return this.size === 0
  }

  has (key) {
    if (!key) {
      return false
    } else {
      return this._map.hasOwnProperty(key)
    }
  }
}
