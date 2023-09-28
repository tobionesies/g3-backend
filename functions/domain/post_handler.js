const uuid = require('uuid');

const posts = []

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
  
exports.removePost = (post)=>{
  try{
    const originalLength = posts.length;
    posts = posts.filter(obj => obj.id !== post.id);
    const newLength = posts.length;

    return originalLength !== newLength; 

  }catch(error){
    return false
  }
}