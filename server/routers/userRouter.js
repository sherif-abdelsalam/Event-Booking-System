const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.patch("/updateMe", authMiddleware.protect, userController.updateMe);
router.delete("/deleteMe", authMiddleware.protect, userController.deleteMe);
router.get("/me", authMiddleware.protect, userController.getMe);

router
    .route("/:id")
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
