
const { Router } = require('express');
const { getAllCategories, createCategory } = require('../controllers/categoryController');
const { protect, restrictTo } = require("../middleware/authMiddleware");
const upload = require('../middleware/upload');

const router = Router();

router
    .route('/')
    .get(protect, getAllCategories)
    .post(
        protect,
        restrictTo('admin'),
        upload.single('image'),
        createCategory
    );


module.exports = router;