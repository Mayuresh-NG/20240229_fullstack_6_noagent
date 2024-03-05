const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

// protected routes
router.patch('/admin_approval',adminController.approval)
router.delete('/admin_rejection',adminController.rejected)

module.exports = router;