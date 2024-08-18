const express = require("express")
const router = express.Router()

const purchasesController = require("../controller/purchase.controller")

router.post("/", purchasesController.create);
router.get("/", purchasesController.getAll);

module.exports = router;