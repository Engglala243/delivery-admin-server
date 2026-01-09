const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery Admin API',
      version: '1.0.0',
      description: 'Complete API documentation for Delivery Admin Backend with comprehensive examples'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api`,
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Admin: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Admin User' },
            email: { type: 'string', example: 'admin@delivery.com' },
            phone: { type: 'string', example: '+1234567890' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Electronics' },
            description: { type: 'string', example: 'Electronic items and gadgets' },
            image: { type: 'string', example: 'electronics.jpg' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        SubCategory: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            name: { type: 'string', example: 'Smartphones' },
            description: { type: 'string', example: 'Mobile phones and accessories' },
            category: { type: 'string', example: '507f1f77bcf86cd799439011' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439013' },
            name: { type: 'string', example: 'iPhone 15 Pro' },
            description: { type: 'string', example: 'Latest iPhone with advanced camera and A17 Pro chip' },
            price: { type: 'number', example: 999.99 },
            category: { type: 'string', example: '507f1f77bcf86cd799439011' },
            subCategory: { type: 'string', example: '507f1f77bcf86cd799439012' },
            stock: { type: 'number', example: 50 },
            images: { type: 'array', items: { type: 'string' }, example: ['image1.jpg', 'image2.jpg'] },
            specifications: {
              type: 'object',
              properties: {
                brand: { type: 'string', example: 'Apple' },
                model: { type: 'string', example: 'iPhone 15 Pro' },
                storage: { type: 'string', example: '128GB' }
              }
            },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439014' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            phone: { type: 'string', example: '+1234567890' },
            address: { type: 'string', example: '123 Main St, City, State' },
            isActive: { type: 'boolean', example: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Driver: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439015' },
            name: { type: 'string', example: 'Mike Johnson' },
            email: { type: 'string', example: 'mike@example.com' },
            phone: { type: 'string', example: '+1234567890' },
            licenseNumber: { type: 'string', example: 'DL123456789' },
            vehicleInfo: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'Motorcycle' },
                model: { type: 'string', example: 'Honda CB 150R' },
                plateNumber: { type: 'string', example: 'ABC-1234' },
                year: { type: 'number', example: 2022 }
              }
            },
            status: { type: 'string', enum: ['available', 'busy', 'offline'], example: 'available' },
            address: { type: 'string', example: '123 Main St, City, State' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439016' },
            orderNumber: { type: 'string', example: 'ORD-2024-001' },
            user: { type: 'string', example: '507f1f77bcf86cd799439014' },
            driver: { type: 'string', example: '507f1f77bcf86cd799439015' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string', example: '507f1f77bcf86cd799439013' },
                  quantity: { type: 'number', example: 2 },
                  price: { type: 'number', example: 999.99 }
                }
              }
            },
            totalAmount: { type: 'number', example: 2005.97 },
            deliveryFee: { type: 'number', example: 5.99 },
            status: { type: 'string', enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'], example: 'pending' },
            deliveryAddress: { type: 'string', example: '456 Oak St, City, State' },
            estimatedDeliveryTime: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Coupon: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439017' },
            code: { type: 'string', example: 'SAVE20' },
            description: { type: 'string', example: '20% off on all orders' },
            discountType: { type: 'string', enum: ['percentage', 'fixed'], example: 'percentage' },
            discountValue: { type: 'number', example: 20 },
            minOrderAmount: { type: 'number', example: 50 },
            maxDiscount: { type: 'number', example: 100 },
            expiryDate: { type: 'string', format: 'date-time' },
            usageLimit: { type: 'number', example: 1000 },
            userLimit: { type: 'number', example: 1 },
            isActive: { type: 'boolean', example: true },
            applicableCategories: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '507f1f77bcf86cd799439018' },
            title: { type: 'string', example: 'Order Update' },
            message: { type: 'string', example: 'Your order has been confirmed' },
            userId: { type: 'string', example: '507f1f77bcf86cd799439014' },
            type: { type: 'string', enum: ['order_update', 'promotion', 'system'], example: 'order_update' },
            data: { type: 'object' },
            isRead: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalOrders: { type: 'number', example: 1250 },
            totalRevenue: { type: 'number', example: 125000.50 },
            totalUsers: { type: 'number', example: 850 },
            totalDrivers: { type: 'number', example: 45 },
            activeOrders: { type: 'number', example: 23 },
            pendingOrders: { type: 'number', example: 12 },
            completedOrders: { type: 'number', example: 1215 },
            cancelledOrders: { type: 'number', example: 35 }
          }
        },
        AppSettings: {
          type: 'object',
          properties: {
            deliveryFee: { type: 'number', example: 5.99 },
            freeDeliveryThreshold: { type: 'number', example: 50 },
            taxRate: { type: 'number', example: 0.08 },
            currency: { type: 'string', example: 'USD' },
            maxDeliveryRadius: { type: 'number', example: 25 },
            estimatedDeliveryTime: { type: 'number', example: 30 },
            supportEmail: { type: 'string', example: 'support@delivery.com' },
            supportPhone: { type: 'string', example: '+1-800-DELIVERY' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            error: { type: 'string', example: 'Detailed error information' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' }
          }
        }
      }
    },
    paths: {
      '/admin/register': {
        post: {
          summary: 'Register new admin',
          tags: ['Admin'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password'],
                  properties: {
                    name: { type: 'string', example: 'Admin User' },
                    email: { type: 'string', example: 'admin@example.com' },
                    password: { type: 'string', example: 'password123' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Admin registered successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } },
            400: { description: 'Admin already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/admin/login': {
        post: {
          summary: 'Admin login',
          tags: ['Admin'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: { type: 'string', example: 'admin@delivery.com' },
                    password: { type: 'string', example: 'admin123' }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'object',
                        properties: {
                          admin: { $ref: '#/components/schemas/Admin' },
                          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                        }
                      },
                      message: { type: 'string', example: 'Login successful' }
                    }
                  }
                }
              }
            },
            401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/admin/profile': {
        get: {
          summary: 'Get admin profile',
          tags: ['Admin'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Profile retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Admin' } } }] } } } },
            401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        },
        put: {
          summary: 'Update admin profile',
          tags: ['Admin'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Updated Admin Name' },
                    email: { type: 'string', example: 'updated@admin.com' },
                    phone: { type: 'string', example: '+1234567890' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Profile updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } },
            401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/dashboard/stats': {
        get: {
          summary: 'Get dashboard statistics',
          tags: ['Dashboard'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Stats retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/DashboardStats' } } }] } } } }
          }
        }
      },
      '/dashboard/recent-orders': {
        get: {
          summary: 'Get recent orders',
          tags: ['Dashboard'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 }, description: 'Number of orders to retrieve' }
          ],
          responses: {
            200: { description: 'Recent orders retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Order' } } } }] } } } }
          }
        }
      },
      '/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Categories retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } }] } } } }
          }
        },
        post: {
          summary: 'Create new category',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Electronics' },
                    description: { type: 'string', example: 'Electronic items and gadgets' },
                    image: { type: 'string', format: 'binary' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Category created', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Category' } } }] } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/categories/{id}': {
        get: {
          summary: 'Get category by ID',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Category retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Category' } } }] } } } },
            404: { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        },
        put: {
          summary: 'Update category',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Updated Electronics' },
                    description: { type: 'string', example: 'Updated description' },
                    isActive: { type: 'boolean', example: true }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Category updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } },
            404: { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        },
        delete: {
          summary: 'Delete category',
          tags: ['Categories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Category deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } },
            404: { description: 'Category not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/subcategories': {
        get: {
          summary: 'Get all subcategories',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'SubCategories retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/SubCategory' } } } }] } } } }
          }
        },
        post: {
          summary: 'Create new subcategory',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'category'],
                  properties: {
                    name: { type: 'string', example: 'Smartphones' },
                    description: { type: 'string', example: 'Mobile phones and accessories' },
                    category: { type: 'string', example: '507f1f77bcf86cd799439011' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'SubCategory created', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/SubCategory' } } }] } } } }
          }
        }
      },
      '/subcategories/{id}': {
        get: {
          summary: 'Get subcategory by ID',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'SubCategory retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/SubCategory' } } }] } } } }
          }
        },
        put: {
          summary: 'Update subcategory',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Updated Smartphones' },
                    description: { type: 'string', example: 'Updated mobile phones and accessories' },
                    isActive: { type: 'boolean', example: true }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'SubCategory updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        },
        delete: {
          summary: 'Delete subcategory',
          tags: ['SubCategories'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'SubCategory deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/products': {
        get: {
          summary: 'Get all products',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Products retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Product' } } } }] } } } }
          }
        },
        post: {
          summary: 'Create new product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'price', 'category'],
                  properties: {
                    name: { type: 'string', example: 'iPhone 15 Pro' },
                    description: { type: 'string', example: 'Latest iPhone with advanced camera and A17 Pro chip' },
                    price: { type: 'number', example: 999.99 },
                    category: { type: 'string', example: '507f1f77bcf86cd799439011' },
                    subCategory: { type: 'string', example: '507f1f77bcf86cd799439012' },
                    stock: { type: 'number', example: 50 },
                    images: { type: 'array', items: { type: 'string' }, example: ['image1.jpg', 'image2.jpg'] },
                    specifications: {
                      type: 'object',
                      properties: {
                        brand: { type: 'string', example: 'Apple' },
                        model: { type: 'string', example: 'iPhone 15 Pro' },
                        storage: { type: 'string', example: '128GB' }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Product created', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Product' } } }] } } } }
          }
        }
      },
      '/products/{id}': {
        get: {
          summary: 'Get product by ID',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Product retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Product' } } }] } } } }
          }
        },
        put: {
          summary: 'Update product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Updated iPhone 15 Pro' },
                    price: { type: 'number', example: 899.99 },
                    stock: { type: 'number', example: 75 },
                    isActive: { type: 'boolean', example: true }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Product updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        },
        delete: {
          summary: 'Delete product',
          tags: ['Products'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Product deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/users': {
        get: {
          summary: 'Get all users',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Users retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/User' } } } }] } } } }
          }
        }
      },
      '/users/{id}': {
        get: {
          summary: 'Get user by ID',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'User retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/User' } } }] } } } }
          }
        },
        delete: {
          summary: 'Delete user',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'User deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/users/{id}/status': {
        put: {
          summary: 'Update user status',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['isActive'],
                  properties: {
                    isActive: { type: 'boolean', example: false },
                    reason: { type: 'string', example: 'Account suspended for policy violation' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'User status updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/drivers': {
        get: {
          summary: 'Get all drivers',
          tags: ['Drivers'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['available', 'busy', 'offline'] } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Drivers retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Driver' } } } }] } } } }
          }
        },
        post: {
          summary: 'Create new driver',
          tags: ['Drivers'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'phone', 'licenseNumber'],
                  properties: {
                    name: { type: 'string', example: 'Mike Johnson' },
                    email: { type: 'string', example: 'mike@example.com' },
                    phone: { type: 'string', example: '+1234567890' },
                    licenseNumber: { type: 'string', example: 'DL123456789' },
                    vehicleInfo: {
                      type: 'object',
                      properties: {
                        type: { type: 'string', example: 'Motorcycle' },
                        model: { type: 'string', example: 'Honda CB 150R' },
                        plateNumber: { type: 'string', example: 'ABC-1234' },
                        year: { type: 'number', example: 2022 }
                      }
                    },
                    status: { type: 'string', enum: ['available', 'busy', 'offline'], example: 'available' },
                    address: { type: 'string', example: '123 Main St, City, State' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Driver created', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Driver' } } }] } } } }
          }
        }
      },
      '/drivers/{id}': {
        get: {
          summary: 'Get driver by ID',
          tags: ['Drivers'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Driver retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Driver' } } }] } } } }
          }
        },
        put: {
          summary: 'Update driver',
          tags: ['Drivers'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Updated Mike Johnson' },
                    phone: { type: 'string', example: '+1987654321' },
                    status: { type: 'string', enum: ['available', 'busy', 'offline'], example: 'busy' },
                    vehicleInfo: {
                      type: 'object',
                      properties: {
                        type: { type: 'string', example: 'Car' },
                        model: { type: 'string', example: 'Toyota Camry' },
                        plateNumber: { type: 'string', example: 'XYZ-9876' },
                        year: { type: 'number', example: 2023 }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Driver updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        },
        delete: {
          summary: 'Delete driver',
          tags: ['Drivers'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Driver deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/orders': {
        get: {
          summary: 'Get all orders',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'status', in: 'query', schema: { type: 'string', enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'] } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Orders retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Order' } } } }] } } } }
          }
        }
      },
      '/orders/{id}': {
        get: {
          summary: 'Get order by ID',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Order retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Order' } } }] } } } }
          }
        }
      },
      '/orders/{id}/status': {
        put: {
          summary: 'Update order status',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: {
                    status: { type: 'string', enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'], example: 'confirmed' },
                    driverId: { type: 'string', example: '507f1f77bcf86cd799439015' },
                    estimatedDeliveryTime: { type: 'string', format: 'date-time', example: '2024-01-15T14:30:00.000Z' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Order status updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/orders/{id}/assign-driver': {
        put: {
          summary: 'Assign driver to order',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['driverId'],
                  properties: {
                    driverId: { type: 'string', example: '507f1f77bcf86cd799439015' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Driver assigned to order', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/orders/{id}/cancel': {
        put: {
          summary: 'Cancel order',
          tags: ['Orders'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    reason: { type: 'string', example: 'Customer requested cancellation' },
                    refundAmount: { type: 'number', example: 25.99 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Order cancelled', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/notifications/send': {
        post: {
          summary: 'Send notification to user',
          tags: ['Notifications'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'message', 'userId', 'type'],
                  properties: {
                    title: { type: 'string', example: 'Order Update' },
                    message: { type: 'string', example: 'Your order has been confirmed and is being prepared' },
                    userId: { type: 'string', example: '507f1f77bcf86cd799439014' },
                    type: { type: 'string', enum: ['order_update', 'promotion', 'system'], example: 'order_update' },
                    data: {
                      type: 'object',
                      properties: {
                        orderId: { type: 'string', example: '507f1f77bcf86cd799439016' },
                        status: { type: 'string', example: 'confirmed' }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Notification sent', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/notifications/send-bulk': {
        post: {
          summary: 'Send bulk notifications',
          tags: ['Notifications'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'message', 'userIds', 'type'],
                  properties: {
                    title: { type: 'string', example: 'Special Offer' },
                    message: { type: 'string', example: 'Get 20% off on your next order! Use code SAVE20' },
                    userIds: { type: 'array', items: { type: 'string' }, example: ['507f1f77bcf86cd799439014', '507f1f77bcf86cd799439015'] },
                    type: { type: 'string', enum: ['order_update', 'promotion', 'system'], example: 'promotion' },
                    scheduledAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:00:00.000Z' }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Bulk notifications sent', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/notifications': {
        get: {
          summary: 'Get notifications',
          tags: ['Notifications'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
          ],
          responses: {
            200: { description: 'Notifications retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Notification' } } } }] } } } }
          }
        }
      },
      '/coupons': {
        get: {
          summary: 'Get all coupons',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'isActive', in: 'query', schema: { type: 'boolean' } },
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } }
          ],
          responses: {
            200: { description: 'Coupons retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { type: 'array', items: { $ref: '#/components/schemas/Coupon' } } } }] } } } }
          }
        },
        post: {
          summary: 'Create new coupon',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['code', 'discountType', 'discountValue'],
                  properties: {
                    code: { type: 'string', example: 'SAVE20' },
                    description: { type: 'string', example: '20% off on all orders' },
                    discountType: { type: 'string', enum: ['percentage', 'fixed'], example: 'percentage' },
                    discountValue: { type: 'number', example: 20 },
                    minOrderAmount: { type: 'number', example: 50 },
                    maxDiscount: { type: 'number', example: 100 },
                    expiryDate: { type: 'string', format: 'date-time', example: '2024-12-31T23:59:59.000Z' },
                    usageLimit: { type: 'number', example: 1000 },
                    userLimit: { type: 'number', example: 1 },
                    isActive: { type: 'boolean', example: true },
                    applicableCategories: { type: 'array', items: { type: 'string' }, example: ['507f1f77bcf86cd799439011'] }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Coupon created', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Coupon' } } }] } } } }
          }
        }
      },
      '/coupons/{id}': {
        get: {
          summary: 'Get coupon by ID',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Coupon retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/Coupon' } } }] } } } }
          }
        },
        put: {
          summary: 'Update coupon',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    description: { type: 'string', example: 'Updated 25% off on all orders' },
                    discountValue: { type: 'number', example: 25 },
                    maxDiscount: { type: 'number', example: 150 },
                    isActive: { type: 'boolean', example: true }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Coupon updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        },
        delete: {
          summary: 'Delete coupon',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: {
            200: { description: 'Coupon deleted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/coupons/validate': {
        post: {
          summary: 'Validate coupon',
          tags: ['Coupons'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['code', 'userId', 'orderAmount'],
                  properties: {
                    code: { type: 'string', example: 'SAVE20' },
                    userId: { type: 'string', example: '507f1f77bcf86cd799439014' },
                    orderAmount: { type: 'number', example: 75.50 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Coupon validation result', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/reports/sales': {
        get: {
          summary: 'Get sales report',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'startDate', in: 'query', required: true, schema: { type: 'string', format: 'date', example: '2024-01-01' } },
            { name: 'endDate', in: 'query', required: true, schema: { type: 'string', format: 'date', example: '2024-12-31' } },
            { name: 'groupBy', in: 'query', schema: { type: 'string', enum: ['day', 'week', 'month'], example: 'month' } }
          ],
          responses: {
            200: { description: 'Sales report retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/reports/drivers': {
        get: {
          summary: 'Get driver performance report',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'period', in: 'query', schema: { type: 'string', enum: ['daily', 'weekly', 'monthly'], example: 'monthly' } },
            { name: 'driverId', in: 'query', schema: { type: 'string' } }
          ],
          responses: {
            200: { description: 'Driver performance report retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/reports/orders/analytics': {
        get: {
          summary: 'Get order analytics',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'groupBy', in: 'query', schema: { type: 'string', enum: ['status', 'category', 'time'], example: 'status' } },
            { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date', example: '2024-01-01' } },
            { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date', example: '2024-12-31' } }
          ],
          responses: {
            200: { description: 'Order analytics retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/reports/revenue': {
        get: {
          summary: 'Get revenue report',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'period', in: 'query', schema: { type: 'string', enum: ['daily', 'weekly', 'monthly'], example: 'weekly' } },
            { name: 'year', in: 'query', schema: { type: 'integer', example: 2024 } }
          ],
          responses: {
            200: { description: 'Revenue report retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/reports/customers': {
        get: {
          summary: 'Get customer analytics',
          tags: ['Reports'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'metric', in: 'query', schema: { type: 'string', enum: ['retention', 'acquisition', 'lifetime_value'], example: 'retention' } },
            { name: 'period', in: 'query', schema: { type: 'string', enum: ['daily', 'weekly', 'monthly'], example: 'monthly' } }
          ],
          responses: {
            200: { description: 'Customer analytics retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/settings': {
        get: {
          summary: 'Get app settings',
          tags: ['Settings'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'App settings retrieved', content: { 'application/json': { schema: { allOf: [{ $ref: '#/components/schemas/Success' }, { properties: { data: { $ref: '#/components/schemas/AppSettings' } } }] } } } }
          }
        },
        put: {
          summary: 'Update app settings',
          tags: ['Settings'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AppSettings' }
              }
            }
          },
          responses: {
            200: { description: 'App settings updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/settings/payment': {
        get: {
          summary: 'Get payment settings',
          tags: ['Settings'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Payment settings retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        },
        put: {
          summary: 'Update payment settings',
          tags: ['Settings'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    stripePublicKey: { type: 'string', example: 'pk_test_...' },
                    paypalClientId: { type: 'string', example: 'client_id_...' },
                    enabledMethods: { type: 'array', items: { type: 'string' }, example: ['card', 'paypal', 'cash'] },
                    processingFee: { type: 'number', example: 2.9 }
                  }
                }
              }
            }
          },
          responses: {
            200: { description: 'Payment settings updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/analytics/dashboard': {
        get: {
          summary: 'Get dashboard analytics',
          tags: ['Analytics'],
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'period', in: 'query', schema: { type: 'string', enum: ['1d', '7d', '30d', '90d'], example: '7d' } }
          ],
          responses: {
            200: { description: 'Dashboard analytics retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      },
      '/analytics/realtime': {
        get: {
          summary: 'Get real-time statistics',
          tags: ['Analytics'],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Real-time stats retrieved', content: { 'application/json': { schema: { $ref: '#/components/schemas/Success' } } } }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};