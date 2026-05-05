const express = require("express")
const router = express.Router()
const controller = require("../controllers/userController")

router.get("/users", controller.getUser)
router.post("/users", controller.postUser)
router.put("/users/:id", controller.putUser)
router.delete("/users/:id", controller.deleteUser)

module.exports = router