const request = require('supertest');
const app = require('../../app');
const Category = require('../../models/Category.model');
const Product = require('../../models/Product.model');
const Admin = require('../../models/Admin.model');

describe('Inventory Management Integration', () => {
  let authToken;

  beforeEach(async () => {
    // Create admin and get token
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

    authToken = loginResponse.body.data.token;
  });

  test('should retrieve categories', async () => {
    await Category.create({
      name: 'Electronics',
      description: 'Electronic items'
    });

    const response = await request(app)
      .get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });

  test('should create complete inventory flow', async () => {
    // Create category
    const categoryResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Electronics',
        description: 'Electronic items'
      });

    expect(categoryResponse.status).toBe(201);
    const categoryId = categoryResponse.body.data._id;

    // Create subcategory
    const subCategoryResponse = await request(app)
      .post('/api/subcategories')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Smartphones',
        description: 'Mobile phones',
        category: categoryId
      });

    expect(subCategoryResponse.status).toBe(201);
    const subCategoryId = subCategoryResponse.body.data._id;

    // Create product
    const productResponse = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'iPhone 15',
        description: 'Latest iPhone',
        price: 999.99,
        category: categoryId,
        subCategory: subCategoryId,
        stock: 10
      });

    expect(productResponse.status).toBe(201);
    expect(productResponse.body.data.name).toBe('iPhone 15');
  });
});