const postHandler = require("../domain/post_handler.js");
const formidable = require("formidable-serverless");
const fs = require('fs');


exports.create_post = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });
    
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error in formidable:", err);
      return res
        .status(500)
        .send("Something went wrong while parsing the form");
    }

    if (!files || !files.image) {
      console.error("No image file received");
      return res.status(400).send("Image file is required");
    }

    try {
      const imageFile = files.image; // Assuming the input's name attribute is 'image'
      if (!imageFile) {
        return res.status(400).send("Image file is required");
      }
      
      // If you're working with multiple files, it might be an array
      const imageFilePath = Array.isArray(imageFile)
      ? imageFile[0].path
      : imageFile.path;
      
      const imageBuffer = await fs.promises.readFile(imageFilePath);

      const post = {
        user_id: fields.user_id,
        category: fields.category,
        text: fields.text,
        image_name:
          fields.image_name ||
          (Array.isArray(imageFile) ? imageFile[0].name : imageFile.name),
        image: imageBuffer,
      };

      const createPost = await postHandler.create(post);
      res.status(201).json(createPost);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Something went wrong");
    }
  });
};




exports.get_all_posts = async (req, res) => {
  try {
    const allPosts = await postHandler.readAll();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

exports.readPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postHandler.readPost(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.remove_post = async (req, res) => {
  try {
    const id = req.params.id;
    const removePost = await postHandler.removePost(id);
    res.status(200).json(removePost);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

exports.updatePostLike = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updateLike = await postHandler.updatePostLike(id, user);
    res.status(200).json(updateLike);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};

exports.updatePostComment = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updateComment = await postHandler.updatePostComment(id, user);
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
};
