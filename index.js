var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var jwt = require('jsonwebtoken')

const port = 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/api/decode/:jwt', (req, res) => {

})

app.post('/api/encode', (req, res) => {

})

app.delete('/api/destroy/:jwt', (req, res) => {

})

app.listen(port, () => {
  console.log(`server is listen on ${port} port`)
})

module.exports = app