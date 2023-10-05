// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { getAuth } = require("firebase/auth");
const admin = require("firebase-admin");
const privateKey = require("./privateKey.json")
const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const str = getStorage(app);
const auth = getAuth(app);

admin.initializeApp({
  credential: admin.credential.cert(privateKey),
});

// {
//   "type": process.env.FIREBASE_TYPE,
//   "project_id": process.env.FIREBASE_PROJECT_ID,
//   "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
//   "private_key": process.env.FIREBASE_PRIVATE_KEY,
//   "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//   "client_id": process.env.FIREBASE_CLIENT_ID,
//   "auth_uri": process.env.FIREBASE_AUTH_URI,
//   "token_uri": process.env.FIREBASE_TOKEN_URI,
//   "auth_provider_x509_cert_url":process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
//   "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
// }

exports.module = {
  db,
  str,
  auth,
  admin,
};
