const userHandler = require('../domain/user_handler.js');

exports.create_user = (req, res) => {
    try{
        const user = req.body;
        res.status(201).json(userHandler.create(user));
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong");    
    }
}

exports.get_all_users = async(req, res) => {
    try{
        const allUser = await userHandler.readAll()
        res.status(200).json(allUser);    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.get_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = userHandler.read(id);
        if(user == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(user);    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.put_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = req.body;
        const oldUser = userHandler.read(id);
        if(oldUser == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(200).json(userHandler.update(id, user));    
    }catch(error){
        console.log(error);
        res.status(500).send("Something went wrong!");    
    }
}

exports.delete_user = (req, res) => {
    try{
        const id = req.params.id;
        const user = userHandler.read(id);
        if(user == undefined){
            res.status(404).send("User not found!");
            return;
        }
        res.status(204).json(userHandler.delete(id));    
    }catch(error){
        console.log(error);
        res.status(500).send(error);    
    }
}

exports.signup = async(req, res)=>{
    try{
        const user={
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            phone_number:req.body.phone_number,
            address:req.body.address,
            profile_picture:req.file.buffer
        }

        const response = await userHandler.signup(user)
        res.status(201).json(response)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

exports.signin = async(req, res)=>{
    try{
        const user={
            email: req.body.email,
            password: req.body.password,
        }
        const response = await userHandler.signin(user)
        console.log(response)
        res.status(201).json(response)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}
