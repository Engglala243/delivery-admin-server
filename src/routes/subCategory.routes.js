const express = require('express');
const { createSubCategory, getSubCategories } = require('../controllers/subCategory.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /subcategories:
 *   post:
 *     summary: Create a new subcategory
 *     tags: [SubCategories]
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
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smartphones
 *               description:
 *                 type: string
 *                 example: Mobile phones and accessories
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: SubCategory created successfully
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all subcategories
 *     tags: [SubCategories]
 *     responses:
 *       200:
 *         description: SubCategories retrieved
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
 *                         example: Smartphones
 *                       description:
 *                         type: string
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       isActive:
 *                         type: boolean
 */

router.post('/', auth, createSubCategory);
router.get('/', getSubCategories);

module.exports = router;