function isAlphanumeric (str) {
  const aCode = 'a'.charCodeAt(0)
  const zCode = 'z'.charCodeAt(0)
  const N0Code = '0'.charCodeAt(0)
  const N9Code = '9'.charCodeAt(0)

  if (typeof str !== 'string') {
    return false
  }

  return str.toLowerCase()
    .split('')
    .map(s => s.charCodeAt(0))
    .every(c => (c >= aCode && c <= zCode) || (c >= N0Code && c <= N9Code))
}

function isNumeric (ch) {
  if (typeof ch !== 'string' || ch.length === 0) {
    return false
  }
  const N0Code = '0'.charCodeAt(0)
  const N9Code = '9'.charCodeAt(0)
  const chCode = ch.charCodeAt(0)

  return N0Code <= chCode && chCode <= N9Code
}

export default {
  name: [
    n => (n !== undefined && n.length > 0) || '用户名不能为空',
    n => n.length > 2 || '用户名长度必须大于2',
    n => (!isNumeric(n.charAt(0)) && isAlphanumeric(n)) ||
      '用户名只能由字母数字组成且第一个符号不能是数字'
  ],
  password: [
    p => (p && p.length > 0) || '密码不能为空',
    p => (p && p.length >= 6) || '密码不能少于六位',
    n => isAlphanumeric(n) ||
      '密码只能由字母数字组成'
  ]
}
