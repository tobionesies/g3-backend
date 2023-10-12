const router = require('express').Router();
const postController = require('../controllers/post_controller.js')
const isAuthenticated = require('../middleware/index')

    
//Create from posted json
router.post("/",isAuthenticated.isAuthenticated,postController.create_post);
router.get("/", isAuthenticated.isAuthenticated,postController.get_all_posts);
router.get("/:id",isAuthenticated.isAuthenticated, postController.readPost);
router.delete("/:id",isAuthenticated.isAuthenticated,postController.remove_post);
router.put("/like/:id",isAuthenticated.isAuthenticated,postController.updatePostLike)
router.put("/comment/:id",isAuthenticated.isAuthenticated,postController.updatePostComment)

module.exports = router;
