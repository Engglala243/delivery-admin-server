const request = require('supertest');
const app = require('../../app');
const Product = require('../../models/Product.model');
const Category = require('../../models/Category.model');
const Admin = require('../../models/Admin.model');

describe('Product Model & API', () => {
  let authToken;
  let categoryId;

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

    // Create category for product
    const category = await Category.create({
      name: 'Test Category',
      description: 'Test Description'
    });
    categoryId = category._id;
  });

  test('should create a product', async () => {
    const productData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      category: categoryId
    };

    const product = await Product.create(productData);
    expect(product.name).toBe(productData.name);
    expect(product.price).toBe(productData.price);
  });

  test('should create product via API', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'iPhone 15',
        description: 'Latest iPhone',
        price: 999.99,
        category: categoryId,
        stock: 10
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('iPhone 15');
  });

  test('should get all products', async () => {
    await Product.create({
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      category: categoryId
    });

    const response = await request(app)
      .get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
  });
});