const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API endpoints for admin operations
 */

// protected routes
router.use(verifyToken,isAdmin)

/**
 * @swagger
 * /admin/admin_approval:
 *   patch:
 *     summary: Approve admin action
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin approval successful
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.patch('/admin_approval',adminController.approval)

/**
 * @swagger
 * /admin/admin_rejection:
 *   delete:
 *     summary: Reject admin action
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin rejection successful
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.delete('/admin_rejection',adminController.rejected)

module.exports = router;