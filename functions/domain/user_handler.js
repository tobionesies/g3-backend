const uuid = require('uuid');
const auth = require("../auth");
const {signInWithEmailAndPassword} = require('firebase/auth')
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const users = [
  {
    "user_id": "123",
    "username": "test_user",
    "posts": [],
    "created_at": 1695897617576
  }
]

exports.create = (user) => {
    user = {id: uuid.v4(), ...user};
    users.push(user);
    return user;
  }
  
  exports.readAll = async() => {
    try{
      const listUsersResult = await auth.module.admin.auth().listUsers();
      const users = listUsersResult.users.map((userRecord) => ({
        uid: userRecord.uid,
        email: userRecord.email,
        customClaims: userRecord.customClaims,   
      }));
      return users;
    }catch(error){
      console.error(error)
      throw new Error('Failed to retrieve all users!')
    }
    
  }

  exports.read = (id) => {
    const user = users.find(user => user.id == id);
    return user;
  }
  
  exports.update = (id, user) => {
    const savedUser = users.find(aUser => aUser.id == id);
    if(user.hasOwnProperty("name")){
      savedUser.name = user.name;
    }
    if(user.hasOwnProperty("password")){
      savedUser.password = user.password;
    }
    return savedUser;
  }
  
  exports.delete = (id) => {
    indx = users.findIndex(user => user.id === id);
    const user = users.splice(indx, indx);
    return  user;
 }

 exports.signup = async(user)=>{
  try{
    const name = uuid.v4();
    const userRecord = await auth.module.admin.auth().createUser({email: user.email, password: user.password});
    const uid = userRecord.uid
    const imageRef = ref(auth.module.str, `${uid}/${name}`)
    try {
      const metadata = {
        contentDisposition: "inline",
      }
      const uploadSnapshot = await uploadBytes(imageRef, user.picture, metadata)
    } catch (error) {
      console.log(error)
      throw new Error("Failed to upload image");
    }
    const downloadURL = await getDownloadURL(imageRef);

    const customClaims ={
      "username": user.username,
      "phone_number": user.phone_number,
      "address": user.address,
      "picture": downloadURL
    }

    await auth.module.admin.auth().setCustomUserClaims(uid, customClaims)
    return {message:'user created successfully'}

  }catch(error){
    console.log(error)
    return {error: error}
  }
 }


 exports.signin =async (user)=>{
  try{
    const userCredential = await signInWithEmailAndPassword(auth.module.auth,user.email, user.password)
    const authenticatedUser = userCredential.user
    const token = await authenticatedUser.getIdToken()
    return {token}
  }catch(error){
    console.log('Error', error)
    return {error: error}
  }
 }
