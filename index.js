var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken')
var session = require('express-session')

const port = 3000
const SECRETKEY_FOR_JWT = 'SeCrEtKeY'

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

const checkValue = (req, res, next) => {
  if (!Object.keys(req.body).length && !Object.keys(req.params).length) {
    res.status(404).json({ messsage: 'err' })
  } else {
    next()
  }
}

let api = {
  encode: async (req, res) => {
    const input = req.body
    const token = await jwt.sign({ input }, SECRETKEY_FOR_JWT, { expiresIn: '1h' })
    req.session[token] = true
    res.json({ token })
  },
  decode: async (req, res) => {
    try {
      const decoded = await jwt.verify(req.params.jwt, SECRETKEY_FOR_JWT).input
      res.json(decoded)
    } catch (err) {
      res.status(404).json({ messsage: 'err' })
    }
  },
  destroy: (req, res) => {
    if (req.session[req.params.jwt]) {
      delete req.session[req.params.jwt]
      res.json({ message: 'deleted' })
    } else {
      res.status(404).json({ messsage: 'err' })
    }
  }
}

app.post('/api/encode', checkValue, api.encode)
app.get('/api/decode/:jwt', checkValue, api.decode)
app.delete('/api/destroy/:jwt', checkValue, api.destroy)

app.listen(port, () => {
  console.log(`server is listen on ${port} port`)
})

module.exports = app