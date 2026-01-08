const express = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../controllers/category.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const upload = require('../middlewares/upload.middleware');
const { createCategorySchema, updateCategorySchema } = require('../validators/category.validator');

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Electronic items and gadgets
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories retrieved
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
 *                         example: Electronics
 *                       description:
 *                         type: string
 *                       image:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 * 
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 * 
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */

router.post('/', auth, upload.single('image'), validate(createCategorySchema), createCategory);
router.get('/', getCategories);
router.put('/:id', auth, upload.single('image'), validate(updateCategorySchema), updateCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;