const postHandler = require('../domain/post_handler.js');

exports.create_post = async(req, res) => {
    try{
        const post ={
            user_id: req.body.user_id,
            category: req.body.category,
            image_name: req.body.image_name,
            image: req.file.buffer
        } 
        const createPost =  await postHandler.create(post)
        res.status(201).json(createPost);
    }catch(error){
        res.status(500).send("Something went wrong");    
    }
}

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