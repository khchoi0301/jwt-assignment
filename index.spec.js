const request = require('supertest')
const should = require('should')
const app = require('./index')

var sendData = { username: 'kihong', email: 'email@email.com' }
var jwt = 'init'

describe('POST /api/encode', () => {
  it('token을 반환한다', (done) => {
    request(app)
      .post('/api/encode')
      .send(sendData)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('token')
        jwt = res.body.token
        console.log('POST /api/encode jwt', jwt)
        done();
      })
  })
  // it('200을 응답한다', (done) => {
  //   request(app)
  //     .post('/api/encode')
  //     .expect(200)
  //     .end(done)
  // })
})

describe('GET /api/decode/:jwt', () => {
  it('raw data를 반환한다', (done) => {
    console.log('GET /api/decode/jwt', jwt)
    request(app)
      .get(`/api/decode/${jwt}`)
      .expect(200)
      .end((err, res) => {
        console.log('res', res.body)
        res.body.should.have.property('username', sendData.username)
        res.body.should.have.property('email', sendData.email)
        done();
      })
  })
  // it('200을 응답한다', (done) => {
  //   request(app)
  //     .get(`/api/decode/${jwt}`)
  //     .expect(200)
  //     .end(done)
  // })
})

// describe('DELETE /api/destroy/:jwt', () => {
//   console.log('DELETE /api/destroy/:jwt', jwt)
//   it('jwt를 삭제한다', (done) => {
//     request(app)
//       .get(`/api/encode/${jwt}`)
//       .end((err, res) => {
//         console.log('res', res.body)
//         done();
//       })
//   })
//   it('200을 응답한다', (done) => {
//     request(app)
//       .get(`/api/encode/${jwt}`)
//       .expect(200)
//       .end(done)
//   })
// })