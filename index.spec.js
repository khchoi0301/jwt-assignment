const request = require('supertest')
const should = require('should')
const app = require('./index')
var jsonwebtoken = require('jsonwebtoken')

const SECRETKEY_FOR_JWT = 'SeCrEtKeY'
var sendData = { username: 'user', email: 'email@email.com' }
var jwt = 'init'

describe('POST /api/encode', () => {
  it('token을 반환한다', (done) => {
    request(app)
      .post('/api/encode')
      .send(sendData)
      .expect(200)
      .end((err, res) => {
        jwt = res.body.token
        res.body.should.have.property('token')
        done();
      })
  })
  it('username과 email이 일치한다', (done) => {
    request(app)
      .post('/api/encode')
      .send(sendData)
      .expect(200)
      .end(async (err, res) => {
        jwt = res.body.token
        const decoded = await jsonwebtoken.verify(jwt, SECRETKEY_FOR_JWT).input
        decoded.should.have.property('username', sendData.username)
        decoded.should.have.property('email', sendData.email)
        done()
      })
  })
  it('값을 보내지 않으면 404를 응답한다.', (done) => {
    request(app)
      .post('/api/encode')
      .expect(404)
      .end(done)
  })
})

describe('GET /api/decode/:jwt', () => {
  it('username, email을 포함한 raw data를 반환한다', (done) => {
    request(app)
      .get(`/api/decode/${jwt}`)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('username', sendData.username)
        res.body.should.have.property('email', sendData.email)
        done();
      })
  })
  it('값을 보내지 않으면 404를 응답한다.', (done) => {
    request(app)
      .get(`/api/decode`)
      .expect(404)
      .end(done)
  })
  it('잘못된 값을 보내면 404를 응답한다.', (done) => {
    request(app)
      .get(`/api/decode/ABCDE`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /api/destroy/:jwt', () => {
  xit('jwt를 삭제한다', (done) => {
    request(app)
      .delete(`/api/destroy/${jwt}`)
      .expect(200)
      .end(done)
  })
  it('값을 보내지 않으면 404를 응답한다.', (done) => {
    request(app)
      .delete(`/api/destroy}`)
      .expect(404)
      .end(done)
  })
  it('잘못된 값을 보내면 404를 응답한다.', (done) => {
    request(app)
      .delete(`/api/destroy/ABCDE`)
      .expect(404)
      .end(done)
  })
})