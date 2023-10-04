const uuid = require("uuid");
const auth = require("../auth");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
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
  try {
    const metadata = {
      //specify what format of image we accept
      contentDisposition: "inline", // This should make it viewable in browser
    };

    const imageRef = ref(auth.module.str, `${post.user_id}/${post.image_name}`);
    try {
      const uploadSnapshot = await uploadBytes(imageRef, post.image, metadata);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to upload image.");
    }
    const downloadURL = await getDownloadURL(imageRef);

    const id = uuid.v4();
    const data = {
      id,
      user_id: post.user_id,
      category: post.category,
      image: downloadURL,
      likes: [],
      comment: [],
      created_at: Date.now(),
    };

    await setDoc(doc(collection(auth.module.db, "posts"), id), data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("failed to add data in the databse");
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

    // Add a new comment to the comments array
    const newComment = {
      id: uuid.v4(),
      user_id: user.id,
      comment: user.comment,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const updatedComments = [...(postData.comments || []), newComment];
    await updateDoc(postRef, { comments: updatedComments });

    return { ...postData, comments: updatedComments };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to comment data!!");
  }
};
