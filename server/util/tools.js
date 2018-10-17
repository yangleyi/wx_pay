const shortid = require('shortid')
const config = require('../../config/config')
const ip = require('ip')
const md5 = require('md5')
const crypto = require('crypto')
const xml2js = require('xml2js')
const request = require('request')
const moment = require('moment')

let tool = {
  nonce_str () {
    return shortid.generate()
  },

  /*
  unifiedorder (openid) {
    return new Promise((resolve, reject) => {
      
      let obj = {
        nonce_str: this.nonce_str(),
        body: '商品名称',
        total_fee: 1,
        spbill_create_ip: ip.address(),
        out_trade_no: `order_${(new Date).getTime()}`,
        openid: openid
      }
      Object.assign(obj, config.options)
      let str = this.ascllSort(obj)
      str = `${str}key=${config.partnerKey}`
      let sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
      Object.assign(obj, {sign})
      console.log('>>>>>>>>>>>>>sign',sign)
      let options = this.xmlBuild(obj)
      console.log('............................. opt',options)
      console.log('TTTTTTTTTTTTTT time...',new Date().getTime(), moment().unix())

      request({
        url: config.orderApi,
        method: 'POST',
        body: options
      }, (err, res, body) => {
        if (err) {
          console.log('order request error ', err)
          reject(err)
        }
        if (!err && res.statusCode == 200) {
          // let data = this.signAgain(body)
          this.signAgain(body)
            .then(data => {
              resolve(data)
            })
        } 
        // console.log('........ request res',res)
        console.log('........ request body',body)
      })
    })
  },

  signAgain (xml) {
    let xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
    return new Promise((resolve, reject) => {
      xmlParser.parseString(xml, (err, res) => {
        if (err) {
          console.log('XML to json fail', err)
        } else {
          console.log('sign again res',res)
          let data = res.xml
          let obj = {
            appId: data.appid,
            timeStamp: moment().unix(),
            nonceStr: this.nonce_str(),
            package: `prepay_id=${data.prepay_id}`,
            signType: 'MD5'
          }
          let str = this.ascllSort(obj)
          str = `${str}key=${config.partnerKey}`
          let paySign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
          Object.assign(obj, {paySign})
          resolve(obj)
        }
      })
    })
  },
  */

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
  
  xmlBuild (obj) {
    let xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true})
    let builder = new xml2js.Builder()
    let xml = builder.buildObject(obj)
    return xml
  },

  // ********************************************************************************

  
  signAgain (xml) {
    let xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
    return new Promise((resolve, reject) => {
      xmlParser.parseString(xml, (err, res) => {
        if (err) {
          console.log('XML to json fail', err)
        } else {
          console.log('sign again res',res)
          let data = res.xml
          let obj = {
            appId: data.appid,
            timeStamp: moment().unix(),
            nonceStr: this.nonce_str(),
            package: `prepay_id=${data.prepay_id}`,
            signType: 'MD5'
          }
          let str = this.ascllSort(obj)
          str = `${str}key=${config.partnerKey}`
          let paySign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
          Object.assign(obj, {paySign})
          resolve(obj)
        }
      })
    })
  },

  async unifiedorder (openid) {
    return new Promise((resolve, reject) => {
      
      let obj = {
        nonce_str: this.nonce_str(),
        body: '商品名称',
        total_fee: 1,
        spbill_create_ip: ip.address(),
        out_trade_no: `order_${(new Date).getTime()}`,
        openid: openid
      }
      Object.assign(obj, config.options)
      let str = this.ascllSort(obj)
      str = `${str}key=${config.partnerKey}`
      let sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
      Object.assign(obj, {sign})
      console.log('>>>>>>>>>>>>>sign',sign)
      let options = this.xmlBuild(obj)
      console.log('............................. opt',options)
      console.log('TTTTTTTTTTTTTT time...',new Date().getTime(), moment().unix())

      request({
        url: config.orderApi,
        method: 'POST',
        body: options
      }, (err, res, body) => {
        if (err) {
          console.log('order request error ', err)
          reject(err)
        }
        if (!err && res.statusCode == 200) {
          // let data = this.signAgain(body)
          const data = await this.signAgain(body)
          resolve(data)
          // this.signAgain(body)
          //   .then(data => {
          //     resolve(data)
          //   })
        } 
        // console.log('........ request res',res)
        console.log('........ request body',body)
      })
    })
  },
  
}

module.exports = tool