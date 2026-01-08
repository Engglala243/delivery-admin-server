const express = require('express');
const { createDriver, getDrivers } = require('../controllers/driver.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /drivers:
 *   post:
 *     summary: Create a new driver
 *     tags: [Drivers]
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
 *               - email
 *               - phone
 *               - licenseNumber
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mike Johnson
 *               email:
 *                 type: string
 *                 example: mike@example.com
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *               licenseNumber:
 *                 type: string
 *                 example: DL123456789
 *               vehicleInfo:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: Motorcycle
 *                   model:
 *                     type: string
 *                     example: Honda CB 150R
 *                   plateNumber:
 *                     type: string
 *                     example: ABC-1234
 *               status:
 *                 type: string
 *                 enum: [available, busy, offline]
 *                 example: available
 *     responses:
 *       201:
 *         description: Driver created successfully
 *       401:
 *         description: Unauthorized
 * 
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Drivers retrieved
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
 *                         example: Mike Johnson
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       licenseNumber:
 *                         type: string
 *                       vehicleInfo:
 *                         type: object
 *                       status:
 *                         type: string
 *                         example: available
 *                       isActive:
 *                         type: boolean
 *       401:
 *         description: Unauthorized
 */

router.post('/', auth, createDriver);
router.get('/', auth, getDrivers);

module.exports = router;