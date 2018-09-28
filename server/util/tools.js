const shortid = require('shortid')
const config = require('../../config/config')
const ip = require('ip')
const md5 = require('md5')

let tool = {
  nonce_str () {
    return shortid.generate()
  },

  unifiedorder () {
    let obj = {
      nonce_str: this.nonce_str(),
      body: '商品名称',
      total_fee: 1,
      spbill_create_ip: ip.address(),
      out_trade_no: `order_${(new Date).getTime()}`
    }
    Object.assign(obj, config.options)
    let str = this.ascllSort(obj)
    str = `${str}key=${config.partnerKey}`
    let sign = md5(str).toUpperCase()
    console.log('>>>>>>>>>>>>>sign',sign)

  },

  ascllSort (obj) {
    let keys = Object.keys(obj)
    keys.sort()
    let str = ''
    for (var key of keys) {
      let val = obj[key]
      str += `${key}=${val}&`
    }
    return str
  },
}

module.exports = tool