require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin.model');
const Category = require('./src/models/Category.model');
const SubCategory = require('./src/models/SubCategory.model');
const Product = require('./src/models/Product.model');
const User = require('./src/models/User.model');
const Driver = require('./src/models/Driver.model');
const Order = require('./src/models/Order.model');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Category.deleteMany({}),
      SubCategory.deleteMany({}),
      Product.deleteMany({}),
      User.deleteMany({}),
      Driver.deleteMany({}),
      Order.deleteMany({})
    ]);

    // Create admin
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123'
    });

    // Create categories
    const categories = await Category.create([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Fashion and apparel' },
      { name: 'Food & Beverages', description: 'Food items and drinks' },
      { name: 'Books', description: 'Books and educational materials' },
      { name: 'Home & Garden', description: 'Home improvement and garden items' }
    ]);

    // Create subcategories
    const subCategories = await SubCategory.create([
      { name: 'Smartphones', description: 'Mobile phones', category: categories[0]._id },
      { name: 'Laptops', description: 'Portable computers', category: categories[0]._id },
      { name: 'Men\'s Clothing', description: 'Clothing for men', category: categories[1]._id },
      { name: 'Women\'s Clothing', description: 'Clothing for women', category: categories[1]._id },
      { name: 'Fast Food', description: 'Quick meals', category: categories[2]._id }
    ]);

    // Create products
    const products = await Product.create([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera',
        price: 999.99,
        category: categories[0]._id,
        subCategory: subCategories[0]._id,
        stock: 25
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone',
        price: 899.99,
        category: categories[0]._id,
        subCategory: subCategories[0]._id,
        stock: 30
      },
      {
        name: 'MacBook Pro M3',
        description: 'Professional laptop for creators',
        price: 1999.99,
        category: categories[0]._id,
        subCategory: subCategories[1]._id,
        stock: 15
      },
      {
        name: 'Men\'s T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 29.99,
        category: categories[1]._id,
        subCategory: subCategories[2]._id,
        stock: 100
      },
      {
        name: 'Women\'s Dress',
        description: 'Elegant evening dress',
        price: 89.99,
        category: categories[1]._id,
        subCategory: subCategories[3]._id,
        stock: 50
      },
      {
        name: 'Pizza Margherita',
        description: 'Classic Italian pizza',
        price: 15.99,
        category: categories[2]._id,
        subCategory: subCategories[4]._id,
        stock: 200
      }
    ]);

    // Create users
    const users = await User.create([
      {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0101',
        address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1-555-0102',
        address: {
          street: '456 Oak Avenue',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210'
        }
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '+1-555-0103',
        address: {
          street: '789 Pine Road',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601'
        }
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        phone: '+1-555-0104',
        address: {
          street: '321 Elm Street',
          city: 'Houston',
          state: 'TX',
          zipCode: '77001'
        }
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        phone: '+1-555-0105',
        address: {
          street: '654 Maple Drive',
          city: 'Phoenix',
          state: 'AZ',
          zipCode: '85001'
        }
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        phone: '+1-555-0106',
        address: {
          street: '987 Cedar Lane',
          city: 'Philadelphia',
          state: 'PA',
          zipCode: '19101'
        }
      }
    ]);

    // Create drivers
    const drivers = await Driver.create([
      {
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@delivery.com',
        phone: '+1-555-0201',
        licenseNumber: 'DL001234567',
        vehicleInfo: {
          type: 'Motorcycle',
          model: 'Honda CB 300R',
          plateNumber: 'DEL-001'
        },
        status: 'available'
      },
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@delivery.com',
        phone: '+1-555-0202',
        licenseNumber: 'DL002345678',
        vehicleInfo: {
          type: 'Car',
          model: 'Toyota Prius',
          plateNumber: 'DEL-002'
        },
        status: 'busy'
      },
      {
        name: 'James Thompson',
        email: 'james.thompson@delivery.com',
        phone: '+1-555-0203',
        licenseNumber: 'DL003456789',
        vehicleInfo: {
          type: 'Bicycle',
          model: 'Trek FX 3',
          plateNumber: 'DEL-003'
        },
        status: 'available'
      },
      {
        name: 'Jennifer Lee',
        email: 'jennifer.lee@delivery.com',
        phone: '+1-555-0204',
        licenseNumber: 'DL004567890',
        vehicleInfo: {
          type: 'Scooter',
          model: 'Vespa Primavera',
          plateNumber: 'DEL-004'
        },
        status: 'offline'
      },
      {
        name: 'Robert Martinez',
        email: 'robert.martinez@delivery.com',
        phone: '+1-555-0205',
        licenseNumber: 'DL005678901',
        vehicleInfo: {
          type: 'Van',
          model: 'Ford Transit',
          plateNumber: 'DEL-005'
        },
        status: 'available'
      }
    ]);

    // Create orders
    const orders = await Order.create([
      {
        orderNumber: 'ORD001',
        user: users[0]._id,
        items: [
          { product: products[0]._id, quantity: 1, price: 999.99 }
        ],
        totalAmount: 999.99,
        status: 'delivered',
        driver: drivers[0]._id,
        deliveryAddress: users[0].address,
        deliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        orderNumber: 'ORD002',
        user: users[1]._id,
        items: [
          { product: products[3]._id, quantity: 2, price: 29.99 },
          { product: products[4]._id, quantity: 1, price: 89.99 }
        ],
        totalAmount: 149.97,
        status: 'out_for_delivery',
        driver: drivers[1]._id,
        deliveryAddress: users[1].address
      },
      {
        orderNumber: 'ORD003',
        user: users[2]._id,
        items: [
          { product: products[5]._id, quantity: 3, price: 15.99 }
        ],
        totalAmount: 47.97,
        status: 'preparing',
        deliveryAddress: users[2].address
      },
      {
        orderNumber: 'ORD004',
        user: users[3]._id,
        items: [
          { product: products[1]._id, quantity: 1, price: 899.99 }
        ],
        totalAmount: 899.99,
        status: 'confirmed',
        deliveryAddress: users[3].address
      },
      {
        orderNumber: 'ORD005',
        user: users[4]._id,
        items: [
          { product: products[2]._id, quantity: 1, price: 1999.99 }
        ],
        totalAmount: 1999.99,
        status: 'pending',
        deliveryAddress: users[4].address
      },
      {
        orderNumber: 'ORD006',
        user: users[5]._id,
        items: [
          { product: products[3]._id, quantity: 1, price: 29.99 },
          { product: products[5]._id, quantity: 2, price: 15.99 }
        ],
        totalAmount: 61.97,
        status: 'delivered',
        driver: drivers[2]._id,
        deliveryAddress: users[5].address,
        deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        orderNumber: 'ORD007',
        user: users[0]._id,
        items: [
          { product: products[4]._id, quantity: 2, price: 89.99 }
        ],
        totalAmount: 179.98,
        status: 'cancelled',
        deliveryAddress: users[0].address
      },
      {
        orderNumber: 'ORD008',
        user: users[1]._id,
        items: [
          { product: products[5]._id, quantity: 1, price: 15.99 }
        ],
        totalAmount: 15.99,
        status: 'delivered',
        driver: drivers[0]._id,
        deliveryAddress: users[1].address,
        deliveredAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
      }
    ]);

    console.log('✅ Seed data created successfully!');
    console.log(`📊 Created:`);
    console.log(`   - 1 Admin`);
    console.log(`   - ${categories.length} Categories`);
    console.log(`   - ${subCategories.length} SubCategories`);
    console.log(`   - ${products.length} Products`);
    console.log(`   - ${users.length} Users`);
    console.log(`   - ${drivers.length} Drivers`);
    console.log(`   - ${orders.length} Orders`);
    
    console.log('\n📧 Admin Login:');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();