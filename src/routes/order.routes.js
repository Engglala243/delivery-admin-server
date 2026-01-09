const express = require('express');
const { createOrder, getOrders, updateOrderStatus, getUserOrders, getOrderById } = require('../controllers/order.controller');
const userAuth = require('../middlewares/userAuth.middleware');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved
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
 *                       orderNumber:
 *                         type: string
 *                         example: ORD1673123456789
 *                       user:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: object
 *                             quantity:
 *                               type: number
 *                             price:
 *                               type: number
 *                       totalAmount:
 *                         type: number
 *                         example: 299.99
 *                       status:
 *                         type: string
 *                         example: pending
 *                       driver:
 *                         type: object
 *                       deliveryAddress:
 *                         type: object
 *       401:
 *         description: Unauthorized
 * 
 * /orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, preparing, out_for_delivery, delivered, cancelled]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */

router.post('/', userAuth, createOrder);
router.get('/', auth, getOrders);
router.get('/user', userAuth, getUserOrders);
router.get('/:id', userAuth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);

module.exports = router;