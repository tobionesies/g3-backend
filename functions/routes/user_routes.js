const router = require('express').Router();
const userController = require('../controllers/user_controller.js')
const isAuthenticated = require('../middleware/index')

//Create from posted json
router.post("/", userController.create_user);

//Get all
router.get("/",isAuthenticated.isAuthenticated, userController.get_all_users);

//Get by ID
router.get("/:id",isAuthenticated.isAuthenticated, userController.get_user);

//Update by ID
router.put("/:id", isAuthenticated.isAuthenticated, userController.put_user);

//Delete by ID
router.delete("/:id",isAuthenticated.isAuthenticated, userController.delete_user);

router.post("/signup",userController.signup)
router.post("/signin",userController.signin)

module.exports = router;