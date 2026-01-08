const express = require('express');
const adminRoutes = require('./admin.routes');
const dashboardRoutes = require('./dashboard.routes');
const categoryRoutes = require('./category.routes');
const subCategoryRoutes = require('./subCategory.routes');
const productRoutes = require('./product.routes');
const userRoutes = require('./user.routes');
const driverRoutes = require('./driver.routes');
const orderRoutes = require('./order.routes');

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/categories', categoryRoutes);
router.use('/subcategories', subCategoryRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/drivers', driverRoutes);
router.use('/orders', orderRoutes);

module.exports = router;