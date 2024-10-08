const express = require("express")
const router = express.Router()

const reportController = require("../controller/report.controller")

router.get("/:customerId", reportController.getReport);


module.exports = router;