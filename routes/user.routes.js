const router = require("express").Router()
const userController = require('../app/controllers/user.controller')

router.get("/", userController.showAll)
router.get("/add", userController.addUser)
router.post("/add", userController.addLogic)
router.get("/edit/:id", userController.editUser)
router.post("/edit/:id", userController.editUserLogic)
router.get("/show/:id", userController.show)
router.get("/delete/:id", userController.deleteUser)

router.get("/addOp/:id", userController.addOp)
router.get("/showOp/:id", userController.showOp)
router.post("/addOp/:id", userController.addOpLogic)
module.exports = router