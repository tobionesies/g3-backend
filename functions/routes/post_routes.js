const router = require('express').Router();
const postController = require('../controllers/post_controller.js')

//Create from posted json
router.post("/", postController.create_post);
router.get("/", postController.get_all_posts);

module.exports = router;
