/**
 * @group component
 */

const request = require('supertest')
const app = require('../server')

describe('When testing /api/user', () => {
  describe('Post', () => {
    it('should work', async () => {
      const res = await request(app)
        .post('/api/user/')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET All', () => {
    it('should work', async () => {
      const res = await request(app)
        .get('/api/user/')
      expect(res.statusCode).toEqual(200);
      expect.arrayContaining(res.body);
    });
  });
});

describe('When testing /api/user', () => {
  describe('GET', () => {
    it('should work', async () => {
      const res = await request(app)
        .get('/api/user/1');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('PUT', () => {
    it('should work', async () => {
      const res = await request(app)
        .put('/api/user/1')
        .send({name:"name",password:"pw"});
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  });
});

describe('When testing /api/user', () => {
  describe('DELETE', () => {
    it('should work', async () => {
      const res = await request(app)
        .delete('/api/user/1');
      expect(res.statusCode).toEqual(204);
    });
  });
});

