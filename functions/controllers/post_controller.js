const postHandler = require('../domain/post_handler.js');
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

exports.create_post = (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();
  const fields = {};
  let imageBuffer = null;

  busboy.on('field', (fieldname, val) => {
    fields[fieldname] = val;
  });

  busboy.on('file', (fieldname, file, filename) => {
    const buffers = [];

    file.on('data', (data) => {
      buffers.push(data);
    });

    file.on('end', () => {
      imageBuffer = Buffer.concat(buffers);
    });
  });

  busboy.on('finish', async () => {
    try {
      const post = {
        user_id: fields.user_id,
        category: fields.category,
        text: fields.text,
        image_name: fields.image_name,
        image: imageBuffer,
      };

      const createPost = await postHandler.create(post);
      res.status(201).json(createPost);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  });

  busboy.end(req.rawBody);
};


exports.get_all_posts = async(req, res) => {
    try{
        const allPosts = await postHandler.readAll();
        res.status(200).json(allPosts);    
    }catch(error){
        res.status(500).send("Something went wrong!");    
    }
}

exports.remove_post = async(req, res)=>{
    try{
        const id = req.params.id;
        const removePost = await postHandler.removePost(id)
        res.status(200).json(removePost);    
    }catch(error){
        res.status(500).send("Something went wrong!");    
    }
}

exports.updatePostLike = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = req.body;
        const updateLike = await postHandler.updatePostLike(id,user)
        res.status(200).json(updateLike);    
    }catch(error){
        res.status(500).send("Something went wrong!");    
    }
}

exports.updatePostComment = async(req, res)=>{
    try{
        const id = req.params.id;
        const user = req.body;
        const updateComment = await postHandler.updatePostComment(id,user)
        res.status(200).json(updateComment); 
    }catch(error){
        res.status(500).send("Something went wrong!"); 
    }
}