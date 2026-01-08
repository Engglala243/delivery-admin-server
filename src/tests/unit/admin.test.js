const request = require('supertest');
const app = require('../../app');
const Admin = require('../../models/Admin.model');

describe('Admin Authentication', () => {
  beforeEach(async () => {
    await Admin.create({
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123'
    });
  });

  test('should register a new admin', async () => {
    const response = await request(app)
      .post('/api/admin/register')
      .send({
        name: 'New Admin',
        email: 'newadmin@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  test('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
  });

  test('should get admin profile with valid token', async () => {
    // First login to get token
    const loginResponse = await request(app)
      .post('/api/admin/login')
      .send({
        email: 'admin@test.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get('/api/admin/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe('admin@test.com');
  });
});