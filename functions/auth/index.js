// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { getAuth } = require("firebase/auth");
const admin = require("firebase-admin");
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


const privateKeys = {
    "type": process.env.F_TYPE,
    "project_id": process.env.F_PROJECT_ID,
    "private_key_id": process.env.F_PRIVATE_KEY_ID,
    "private_key": process.env.F_PRIVATE_KEY,
    "client_email": process.env.F_CLIENT_EMAIL,
    "client_id": process.env.F_CLIENT_ID,
    "auth_uri": process.env.F_AUTH_URI,
    "token_uri": process.env.F_TOKEN_URI,
    "auth_provider_x509_cert_url":process.env.F_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.F_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.F_UNIVERSE_DOMAIN,
  }


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const str = getStorage(app);
const auth = getAuth(app);



admin.initializeApp({
  credential: admin.credential.cert(privateKeys),
  storageBucket: process.env.STORAGEBUCKET,
});



exports.module = {
  db,
  str,
  auth,
  admin,
};
