const uuid = require("uuid");
const auth = require("../auth");
const { signInWithEmailAndPassword } = require("firebase/auth");

const users = [
  {
    user_id: "123",
    username: "test_user",
    posts: [],
    created_at: 1695897617576,
  },
];

exports.readAll = async () => {
  try {
    const listUsersResult = await auth.module.admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email,
      customClaims: userRecord.customClaims,
    }));
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve all users!");
  }
};

exports.read = async (id) => {
  try {
    const listUsersResult = await auth.module.admin.auth().listUsers();
    const user = listUsersResult.users.filter(
      (userRecord) => userRecord.uid === id
    );
    return {
      uid: user[0].uid,
      email: user[0].email,
      customClaims: user[0].customClaims,
    };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

exports.update = async (data) => {
  try {
    const { id } = data;
    const user = await auth.module.admin.auth().getUser(id);

    if (!user) {
      throw new Error("User not found");
    }

    const { customClaims } = user;

    const fieldsToUpdate = ["username", "phone_number", "address", "picture"];
    const obj = {};

    for (const field of fieldsToUpdate) {
      obj[field] = data[field] ?? customClaims[field];
    }

    const update = await auth.module.admin.auth().updateUser(id, {
      customClaims: {
        ...obj,
      },
    });
    
    return {
      uid: update.uid,
      email: update.email,
      customClaims: update.customClaims,
    };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

exports.delete = (id) => {
  indx = users.findIndex((user) => user.id === id);
  const user = users.splice(indx, indx);
  return user;
};

exports.signup = async (user) => {
  const bucket = auth.module.admin.storage().bucket();

  try {
    // Create new user with email and password
    const userRecord = await auth.module.admin.auth().createUser({
      email: user.email,
      password: user.password,
    });

    const uid = userRecord.uid;

    // Generate a unique name for the image
    const name = uuid.v4();

    // Get a reference to the storage bucket location
    const imageRef = bucket.file(`${uid}/${name}`);

    // Upload image to bucket
    const options = {
      predefinedAcl: "publicRead",
      contentType: "auto",
    };

    try {
      await imageRef.save(user.picture,options)
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload image");
    }

    // Get the download URL
    const downloadURL = await imageRef.getSignedUrl({
        action: "read",
        expires: "03-17-2425",
      });

      console.log(downloadURL);

    // Set custom claims
    const customClaims = {
      username: user.username,
      phone_number: user.phone_number,
      address: user.address,
      picture: downloadURL[0],
    };

    await auth.module.admin.auth().setCustomUserClaims(uid, customClaims);

    return { message: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

exports.signin = async (user) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth.module.auth,
      user.email,
      user.password
    );
    const authenticatedUser = userCredential.user;
    const token = await authenticatedUser.getIdToken();
    const id = authenticatedUser.uid
    return { token, id };
  } catch (error) {
    console.log("Error", error);
    return { error: error };
  }
};
