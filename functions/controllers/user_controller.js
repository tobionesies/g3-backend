const userHandler = require("../domain/user_handler.js");
const formidable = require("formidable-serverless");
const fs = require('fs');


exports.create_user = (req, res) => {
  try {
    const user = req.body;
    res.status(201).json(userHandler.create(user));
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.get_all_users = async (req, res) => {
  try {
    const allUser = await userHandler.readAll();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.get_user = async(req, res) => {
  try {
    const id = req.params.id;
    const user = await userHandler.read(id);
    if (user.length <= 0) {
      res.status(404).send("User not found!");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.put_user = async(req, res) => {
  try {
    const data = {
        id: req.params.id,
        username: req.body.username,
        picture: req.body.picture,
        address: req.body.address,
        phone_number: req.body.phone_number
    }
    
    const user = userHandler.read(data.id);
    if (!user) {
        res.status(404).send("User not found!");
        return;
    }
    const updatedUser = await userHandler.update(data);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.delete_user = (req, res) => {
  try {
    const id = req.params.id;
    const user = userHandler.read(id);
    if (user == undefined) {
      res.status(404).send("User not found!");
      return;
    }
    res.status(204).json(userHandler.delete(id));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.signup = async (req, res) => {
    try{
        const form = new formidable.IncomingForm({ multiples: true });
      
        form.parse(req, async (err, fields, files) => {
          if (err) {
            console.error("Error in formidable:", err);
            return res
              .status(500)
              .send("Something went wrong while parsing the form");
          }
          if (!files || !files.picture) {
              console.error("No image file received");
              return res.status(400).send("Image file is required");
            }
      
          // Assuming 'picture' is the key in the form for the file upload.
          const pictureFile = files.picture;

          
          if (!pictureFile) {
              return res.status(400).send("Picture is required");
            }
      
            const pictureFilePath = Array.isArray(pictureFile)
            ? pictureFile[0].path
            : pictureFile.path;
            
            const pictureBuffer = await fs.promises.readFile(pictureFilePath);
            
            const user = {
                username: fields.username,
                email: fields.email,
                password: fields.password,
                phone_number: fields.phone_number,
                address: fields.address,
                picture: pictureBuffer,
            };
            
        const response = await userHandler.signup(user);
        res.status(201).json(response);
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send(error);
      }  
};

exports.signin = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(req.body);
    const response = await userHandler.signin(user);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
