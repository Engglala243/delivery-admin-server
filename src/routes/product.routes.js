const express = require('express');
const { createProduct, getProducts } = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Latest iPhone with advanced camera and A17 Pro chip
 *               price:
 *                 type: number
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               subCategory:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: iPhone 15 Pro
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                         example: 999.99
 *                       category:
 *                         type: object
 *                       subCategory:
 *                         type: object
 *                       stock:
 *                         type: number
 *                       isActive:
 *                         type: boolean
 */

router.post('/', auth, createProduct);
router.get('/', getProducts);

module.exports = router;