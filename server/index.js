const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const tool = require('./util/tools')

app.use(bodyParser.json())

app.post('/payment', (req, res) => {
  console.log('request api: ', req.body)
  let openid = req.body.openid 
  if (openid) {
    tool.unifiedorder(openid).then(data => {
      console.log('success will send data to client',data)
      res.send({result: data})
    })
  }
  // res.send(`POST response... ${tool.nonce_str()}`)
})

let port = 9290

app.listen(port, () => {
  console.log(`test server listening on port ${port}!`)
})