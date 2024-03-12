const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// protected routes
router.use(verifyToken,isAdmin)
router.put('/admin_approval',adminController.approval)
router.delete('/admin_rejection',adminController.rejected)

module.exports = router;