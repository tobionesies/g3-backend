// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {getFirestore} = require("firebase/firestore")
const {getStorage} = require("firebase/storage")

const firebaseConfig = {
  apiKey: "AIzaSyDvDgz2f9ZepwT89lDnlztAvbmKN8hjJbA",
  authDomain: "g3-imageshare-backend.firebaseapp.com",
  projectId: "g3-imageshare-backend",
  storageBucket: "g3-imageshare-backend.appspot.com",
  messagingSenderId: "518958239685",
  appId: "1:518958239685:web:8aa5898a0d4a24642745ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const str = getStorage(app)


exports.module ={
      db,
      str
}