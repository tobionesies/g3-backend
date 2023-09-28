const uuid = require('uuid');

let posts = [
  {
    "id": "21773dfe-5aaf-4d8d-bb0d-09112aac1a29",
	"user_id": "123",
	"category": "image",
	"image": "a flower image",
	"likes": [],
	"comment": [],
	"created_at": 1695897617576,
	"updated_at": 1695897617576
  }
]

exports.create = (post) => {
    const timestamp = Date.now();
    const data = 
    {
        id: uuid.v4(),
        user_id: post.user_id,
        category: post.category,
        image: post.image,
        likes: [],
        comment: [],
        created_at: timestamp,
        updated_at: timestamp

    };
    posts.push(data);
    return data;
  }
exports.readAll = () => {
    return posts;
  }
  
exports.removePost = (id)=>{
  try{
    const originalLength = posts.length;
    posts = posts.filter(obj => obj.id !== id);
    const newLength = posts.length;

    return originalLength !== newLength; 

  }catch(error){
    throw new Error("Failed to delete the post!")
  }
}

exports.updatePostLike = (id, post)=>{
  try{
    const data = posts.filter(obj => {
      if(obj.id === id ){
        obj.likes.push({
          id: uuid.v4(),
          user_id:post.id,
        })
        return obj
      }else{
        throw new error('object not find')
      }
    })
    return data
  }catch(error){

  }
}