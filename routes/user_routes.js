const router = require('express').Router();
const userController = require('../controllers/user_controller.js')

//Create from posted json
router.post("/user", userController.create_user);

//Get all
router.get("/users", userController.get_all_users);


//Get by ID
router.get("/user/:id", userController.get_user);

//Update by ID
router.put("/user/:id", userController.put_user);

//Delete by ID
router.delete("/user/:id", userController.delete_user);

module.exports = router;