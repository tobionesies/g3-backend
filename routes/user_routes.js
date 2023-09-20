const router = require('express').Router();
const userController = require('../controllers/user_controller.js')

//Create from posted json
router.post("/", userController.create_user);

//Get all
router.get("/", userController.get_all_users);

//Get by ID
router.get("/:id", userController.get_user);

//Update by ID
router.put("/:id", userController.put_user);

//Delete by ID
router.delete("/:id", userController.delete_user);

module.exports = router;
