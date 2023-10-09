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


const privateKeys = {
  "type": "service_account",
  "project_id": "g3-imageshare-backend",
  "private_key_id": "50f44958260e4ef6dea6ba67f63c784eb656f805",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/p44Pde8bh8a9\nrOWhji62GBscB+cfhf+MRLmGVRobY6VALhZWuiZKLTgjJ8wEqfTMccj7L2kNE4MI\nY8bBdAXrBX65Jyf6f40eokndhwIj9iaBgXhsddfXp6ixKJJyxolAWj3aAhnZ3jLM\n9O3RZ59ZEXRoESpkAbDDpfdyCI8VeyeRXB0RFVs9uAH8hSEUtqGfgq7RF7IrJ94Y\nyym25rAB8w0OK/fhORHEi0RQnfGsK6BTFLRjVQtZ+i7UdR5kdiMT9+0dyM7I77e2\nwRhOH3Kqf5WDjRru4cg9HU6Dmh8jNvd61JZBd/3sXyfAETn21GQnEtM1t4kQnXXV\ncaORLU9NAgMBAAECggEACF17XWBj5ds4yPmdcj4++rK1qDUOGPmjzE8Jm/vl7lEc\nmt8IGZP5bN5pZ1tq079JUI0c3R3WI3x5CSo1uCbkxTvRqqozXAMqOS6TM8ibRs+N\nIbTxeSZxm9eVDNp8/eZ9giIONhBGaZSBuiFsqemwclZJMuug4omSWg/J65/FAwZw\nOyJ/QQGvk6YmT65nQ3yCtC4cZgu1Q+yk+wrNtizGpyOLaYcd+Byu5Z71QgNwJzn9\nb+SuQ8rpfjL37KouFebjrBbbtMLGKjvcWhbbLg1UKHLljjmF7C+ysVIYl+S2TWEV\nnTyXxvSDfpzwtMI33plKAj/+KUzY6f0QyqTq46G98QKBgQDmkGzkXnbcInnZXiVW\nxPY8wHdsmB9mdY8RIf6l+FCOhsBqWGIQxCHVNJpN00J+XQX5fQcT5+moVF83xVyj\nhQ1VdGdhLY7luzvvBUEUraxKTAqL5cg2Yfhbooht/lwQHTaRCZ3vlanvh/rG2IVD\nkwANdPFe1gv6vPOa2luQwiqaWQKBgQDUzD8PkxPcjcakUM7E0UVSVCogmmuU/mi0\npkXYz65aw/vzHWBYCR6p8UemQpYZcQ2EqNkI1eIIClodcLmjRbRJFVZNxgf6mAOm\ngsPfNefLoKI7aMf3mBZ+52MUsmj0NijxIWkJEP9fVDMJzuXNxpKjyslPYtiv23lH\nhO8vWmMWFQKBgQC6twEIG5vj/6NvrXdNgmnqnu7XqYXcQp2egUoofCQ4l9WhCXw5\nGaxQba38EnaJwKmC9oZRz4CAifsmPhUcczZuGrtRjkRntK3/jeC7bz3UWSo9StNN\nfx9SjhgwA0no3s9+uywEhs48pYEnoNai95uWSjrh0zOWVYhtwiFe5G792QKBgQCv\ntR5027rQqHhXASpaNXoJ6tkGJruiQRdv4sNVrNaIt774FU+SIaWiKUpCLEUIKONC\noLDkrMaAYRvbp1KBUHL2zZl/in7YGmEZQmw9iKMm7jJG39QNyxT4IFMdqdsjmvzf\nbfjutYxHyJyEAsSZztcSS8VBuZq2SoCv30IoVXfvqQKBgGbt+jVwjWOrlCV+043I\nCIijdu5LVn5Cp9hV09/JGohgAPLU5E/YAQM1hhY5EC33zNbiq5JUFZjvN+m7i+K4\nPS2uXqrVtLkXCnTMrsLt9zODWpB6NFGJuD6MOyn356bl5Fq+xk+97yixGm1T9x0N\noktanAQgLhOSKooklZDNQwrV\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-zewxn@g3-imageshare-backend.iam.gserviceaccount.com",
  "client_id": "114843901931070882805",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zewxn%40g3-imageshare-backend.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const str = getStorage(app);
const auth = getAuth(app);



admin.initializeApp({
  credential: admin.credential.cert(privateKeys),
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
