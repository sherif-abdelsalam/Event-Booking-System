const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

router.get("/isAdmin", authMiddleware.protect, authMiddleware.isAdmin);
router.patch(
    '/updatePassword',
    authMiddleware.protect,
    authController.updatePassword
);

module.exports = router;
