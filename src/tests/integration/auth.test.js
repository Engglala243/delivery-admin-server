const request = require('supertest');
const app = require('../../app');
const Admin = require('../../models/Admin.model');

describe('Authentication Integration', () => {
  test('should protect routes with auth middleware', async () => {
    const response = await request(app)
      .get('/api/dashboard/stats');

    expect(response.status).toBe(401);
  });

  test('should allow access with valid token', async () => {
    // Create admin and login
    await Admin.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123'
    });

    const loginResponse = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get('/api/dashboard/stats')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should reject invalid token', async () => {
    const response = await request(app)
      .get('/api/dashboard/stats')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
  });
});