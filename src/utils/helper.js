export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function promisify (method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = res => {
      resolve(res)
    }
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}

export function querystring (url) {
  let match
  let pl = /\+/g
  let search = /([^&=]+)=?([^&]*)/g
  let decode = function (s) {
    return decodeURIComponent(s.replace(pl, ' '))
  }
  let query = url.substring(1)

  const urlParams = {}
  while ((match = search.exec(query))) {
    urlParams[decode(match[1])] = decode(match[2])
  }

  return urlParams
}

export function rd (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function drawArc (ctx, x, y, r, uri) {
  let imgW = 2 * r
  ctx.save()
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fill()
  ctx.clip()
  ctx.drawImage(uri, x - r, y - r, imgW, imgW)
  ctx.restore()
  return ctx
}

export function dateFormat (date, format) {
  date = new Date(date)

  let map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  return format.replace(/([yMdhmsqS])+/g, function (all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
}

export function checkMobile (mobile) {
  return /^0?(13[0-9]|15[012356789]|17[0-9]|18[0123456789]|14[57])[0-9]{8}$/g.test(mobile)
}

export function randomSort (a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

export function randomArea (min, max) {
  const rand = max - min + 1
  return Math.floor(Math.random() * rand + min)
}
