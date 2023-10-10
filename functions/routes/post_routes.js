const router = require('express').Router();
const postController = require('../controllers/post_controller.js')
/* const multer = require('multer')
const upload = multer({ dest: 'uploads/'}) */

const getRawBody = require('raw-body');

// Middleware to capture raw body
async function captureRawBody(req, res, next) {
  if (req.method === 'POST' && req.headers['content-type'].startsWith('multipart/form-data')) {
    req.rawBody = await getRawBody(req, {
      length: req.headers['content-length'],
      limit: '10mb',  // You can set a limit to the maximum buffer size
      encoding: true
    });
  }
  next();
}

//Create from posted json
router.post("/",captureRawBody,postController.create_post);
router.get("/", postController.get_all_posts);
router.delete("/:id",postController.remove_post);
router.put("/like/:id",postController.updatePostLike)
router.put("/comment/:id",postController.updatePostComment)

module.exports = router;
