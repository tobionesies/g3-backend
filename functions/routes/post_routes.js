const router = require('express').Router();
const postController = require('../controllers/post_controller.js')
const multer = require('multer')
const upload = multer()

//Create from posted json
router.post("/",upload.single('image') ,postController.create_post);
router.get("/", postController.get_all_posts);
router.delete("/:id",postController.remove_post);
router.put("/like/:id",postController.updatePostLike)
router.put("/comment/:id",postController.updatePostComment)

module.exports = router;
