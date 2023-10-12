const uuid = require("uuid");
const auth = require("../auth");
const {
  collection,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
} = require("firebase/firestore");


exports.create = async (post) => {
  const db = auth.module.admin.firestore();
  const storage = auth.module.admin.storage();

  try {
    const metadata = {
      // Specify what format of image we accept
      contentDisposition: "inline", // This should make it viewable in browser
    };

    const bucket = storage.bucket(); // Your Firebase storage bucket
    const imageRef = bucket.file(`${post.user_id}/${post.image_name}`);

    try {
      await imageRef.save(post.image, metadata);
    } catch (err) {
      console.error(err);
      return { error: err, message: "Failed to upload image." };
    }

    // Getting download URL
    const downloadURL = await imageRef.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    });

    //get a username
    let user = await auth.module.admin.auth().getUser(post.user_id)
    

    // Using uuid to generate a unique ID
    const id = uuid.v4();
    const data = {
      id,
      user_id: post.user_id,
      username: user.customClaims.username,
      category: post.category,
      image: downloadURL[0], // The URL is in an array
      text: post.text,
      likes: [],
      comments: [],
      created_at: Date.now(),
    };

    await db.collection('posts').doc(id).set(data);
    return data;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to add data in the database");
  }
};


exports.readAll = async () => {
  
  const querySnapshot = await getDocs(collection(auth.module.db, "posts"));
  const allPosts = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    allPosts.push({
      ...data,
    });
  });
  return allPosts;
};

exports.readPost = async(id)=>{
  try{
    const postRef = doc(collection(auth.module.db, "posts"), id); // Get a DocumentReference to the post
    const docSnap = await getDoc(postRef);
    return docSnap.data()
  }catch(error){
    throw new Error(error)
  }
}

exports.removePost = async (id) => {
  try {
    const postRef = doc(collection(auth.module.db, "posts"), id); // Get a DocumentReference to the post
    const docSnap = await getDoc(postRef);
    if (!docSnap.exists()) {
      throw new Error("Post not found!");
    }
    await deleteDoc(postRef); // Delete the post
    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Failed to delete the post:", error);
    throw new Error("Failed to delete the post!");
  }
};

exports.updatePostLike = async (id, user) => {
  try {
    // Reference to the post document in Firestore
    const postRef = doc(collection(auth.module.db, "posts"), id);

    // Get the current data of the post from Firestore
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    if (!postData) {
      throw new Error("Post not found");
    }

    const likesArray = postData.likes || [];

    // Find the index of the user's like in the likes array
    const getUserIndex = likesArray.findIndex(
      (like) => like.user_id === user.id
    );

    if (getUserIndex !== -1) {
      // Remove the like if it exists
      likesArray.splice(getUserIndex, 1);
    } else {
      // Add a new like
      likesArray.push({
        id: uuid.v4(),
        user_id: user.id,
      });
    }

    // Update the 'likes' field in Firestore
    await updateDoc(postRef, { likes: likesArray });

    return { ...postData, likes: likesArray }; // Return the updated post data
  } catch (error) {
    console.error(error);
    return null;
  }
};

exports.updatePostComment = async (id, user) => {
  try {
    // Reference to the post document in Firestore
    const postRef = doc(collection(auth.module.db, "posts"), id);

    // Get the current data of the post from Firestore
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();

    if (!postData) {
      throw new Error("Post not found");
    }
    console.log(postData);

    const commentsArray = postData.comment || [];
   
      // Add a new comment
      const newComment = {
        id: uuid.v4(),
        user_id: user.id,
        comment: user.comment,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      commentsArray.push(newComment);
    

    await updateDoc(postRef, { comment: commentsArray });

    return { ...postData, comment: commentsArray }; // Return the updated post data
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update comment data!!");
  }
};
