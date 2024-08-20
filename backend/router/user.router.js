const express = require("express")
const router = express.Router()

const authController = require('../controller/auth.controller');
const authenticateToken = require("../middleware/authenticateToken");

router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/", authController.getAll)

// router.get("/", authenticateToken, authController.getAll);

module.exports = router

