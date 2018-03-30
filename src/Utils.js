'use strict'

export default {
  // return a random interger r which is bigger or equal 0 and less than max
  nextInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  },
  // return a random color
  randomColor () {
    const r = this.nextInt(256)
    const g = this.nextInt(256)
    const b = this.nextInt(256)

    return ((((r & 0xFF) << 8) + (g & 0xFF)) << 8) + b & 0xFF
  }
}
