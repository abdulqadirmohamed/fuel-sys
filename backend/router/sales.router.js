const express = require("express")
const router = express.Router()

const salesController = require("../controller/sales.controller")

router.post("/", salesController.create);
router.get("/", salesController.getAll);
router.get("/today", salesController.todaySales);
router.get("/remain", salesController.remaining_Volume);
router.get("/salesAmount", salesController.salesToday);

module.exports = router;