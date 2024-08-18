const express = require("express")
const router = express.Router()

const customersController = require("../controller/customers.controller")

router.get("/", customersController.getAll);
router.get("/:id", customersController.getById);
router.post("/", customersController.create);
router.put('/:id', customersController.update)
router.delete('/:id', customersController.delete)




module.exports = router;