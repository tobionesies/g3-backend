const uuid = require('uuid');
const auth = require('../auth')
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const {collection, addDoc} = require('firebase/firestore')

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

exports.create = async(post) => {
    try{
      const imageRef = ref(auth.module.str, `${post.user_id}/${post.image.name}`)
      try{
        const uploadSnapshot = await uploadBytes(imageRef,post.image)
      }catch(err){
        console.error(err)
        throw new Error("Failed to upload image.")
      }
      const downloadURL = await getDownloadURL(imageRef)
      const data = await addDoc(collection(auth.module.db,"posts"),{
        id: uuid.v4(),
        user_id: post.user_id,
        category: post.category,
        image: downloadURL,
        likes: [],
        comment: [],
        created_at: Date.now()
      })
      console.log(data.id)
      return data.id;
    }catch(error){
      console.log(error)
      throw new Error("failed to add data in the databse")
    }
    
   
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
