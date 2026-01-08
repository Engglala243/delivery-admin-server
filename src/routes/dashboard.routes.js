const express = require('express');
const { getDashboardStats } = require('../controllers/dashboard.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalOrders:
 *                       type: number
 *                       example: 150
 *                     totalUsers:
 *                       type: number
 *                       example: 75
 *                     totalProducts:
 *                       type: number
 *                       example: 200
 *                     totalDrivers:
 *                       type: number
 *                       example: 25
 *                     recentOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 */

router.get('/stats', auth, getDashboardStats);

module.exports = router;