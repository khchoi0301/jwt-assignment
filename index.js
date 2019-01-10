var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken')
var session = require('express-session')

const SECRETKEY_FOR_JWT = 'SeCrEtKeY'
const port = 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

console.log('==================')

app.post('/api/encode', (req, res) => {
  const input = req.body

  jwt.sign({ input }, SECRETKEY_FOR_JWT, { expiresIn: '1h' }, (err, token) => {
    req.session[token] = true
    console.log('session', req.session)
    res.json({ token })
  })
})

app.get('/api/decode/:jwt', (req, res) => {
  console.log('params', req.params.jwt)
  jwt.verify(req.params.jwt, SECRETKEY_FOR_JWT, (err, decoded) => {
    console.log('decoded', decoded.input)
    res.json(decoded.input)
  })

})


app.delete('/api/destroy/:jwt', (req, res) => {

})

app.listen(port, () => {
  console.log(`server is listen on ${port} port`)
})

module.exports = app