const postHandler = require('../domain/post_handler.js');

exports.create_post = (req, res) => {
    try{
        const post = req.body;
        console.log(post)
        res.status(201).json(postHandler.create(post));
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong");    
    }
}

exports.get_all_posts = (req, res) => {
    try{
        res.status(200).json(postHandler.readAll());    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}