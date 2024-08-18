const express = require("express")
const router = express.Router()

const invoicesController = require("../controller/invoices.controller")

router.post("/", invoicesController.create);
router.get("/", invoicesController.getAll);

module.exports = router;