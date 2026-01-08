const request = require('supertest');
const app = require('../../app');
const Category = require('../../models/Category.model');
const Admin = require('../../models/Admin.model');

describe('Category Model & API', () => {
  let authToken;

  beforeEach(async () => {
    // Create admin and get token
    const admin = await Admin.create({
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

    authToken = loginResponse.body.data.token;
  });

  test('should create a category', async () => {
    const categoryData = {
      name: 'Test Category',
      description: 'Test Description'
    };

    const category = await Category.create(categoryData);
    expect(category.name).toBe(categoryData.name);
    expect(category.isActive).toBe(true);
  });

  test('should create category via API', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Electronics',
        description: 'Electronic items'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Electronics');
  });

  test('should get all categories', async () => {
    await Category.create({
      name: 'Test Category',
      description: 'Test Description'
    });

    const response = await request(app)
      .get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });
});