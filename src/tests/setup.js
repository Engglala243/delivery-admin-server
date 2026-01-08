require("dotenv").config();
const mongoose = require("mongoose");

// Use test database
process.env.MONGODB_URI =
  process.env.MONGODB_TEST_URI ||
  "mongodb://localhost:27017/delivery-admin-test";
process.env.NODE_ENV = "test";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].drop();
  }
});
