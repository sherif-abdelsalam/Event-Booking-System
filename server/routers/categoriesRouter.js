
const { Router } = require('express');
const { getAllCategories, createCategory, getCategoryEvents } = require('../controllers/categoryController');
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

router.route('/:id/events')
    .get(protect, getCategoryEvents); // Assuming you want to get a specific category by ID


module.exports = router;