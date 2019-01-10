var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken')
var session = require('express-session')

const SECRETKEY_FOR_JWT = 'SeCrEtKeY'
const port = 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

console.log('==================')

app.post('/api/encode', (req, res) => {
  console.log('req', req.body)
  let result = { token: 'token' }
  res.json(result)
})

app.get('/api/decode/:jwt', (req, res) => {
  console.log('params', req.params.jwt)
  res.json()

})


app.delete('/api/destroy/:jwt', (req, res) => {

})

app.listen(port, () => {
  console.log(`server is listen on ${port} port`)
})

module.exports = app