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

    if (originalLength === newLength) {
      throw new Error("Post not found!");
    }

    return originalLength !== newLength; 

  }catch(error){
    throw new Error("Failed to delete the post!")
  }
}

exports.updatePostLike = (id, user) => {
  try {
    const postToUpdate = posts.find(obj => obj.id === id);

    if (!postToUpdate) {
      throw new Error('Post not found');
    }

    const getUserIndex = postToUpdate.likes.findIndex(like => like.user_id === user.id);

    if (getUserIndex !== -1) {
      postToUpdate.likes.splice(getUserIndex, 1);
    } else {
      postToUpdate.likes.push({
        id: uuid.v4(),
        user_id: user.id,
      });
    }

    return postToUpdate;

  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.updatePostComment = (id, user)=>{
   try {
    const postToUpdate = posts.find(obj => obj.id === id);

    if (!postToUpdate) {
      throw new Error('Post not found');
    }
    
    postToUpdate.comment.push({
        id: uuid.v4(),
        user_id: user.id,
        comment: user.comment,
        created_at: Date.now(),
        updated_at: Date.now()
      });

    return postToUpdate;

  } catch (error) {
    console.log(error);
    return null;
  }
}
