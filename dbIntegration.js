// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_RAzwzkQ8Cj3YzfDwclb355663OozzE",
  authDomain: "paperless-37846.firebaseapp.com",
  projectId: "paperless-37846",
  storageBucket: "paperless-37846.appspot.com",
  messagingSenderId: "154000927961",
  appId: "1:154000927961:web:331d4799d3edba5cfc22c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a root reference
const storage = getStorage(app);

//The code above this line should be put in one file and the storage and app must be imported along with "import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";" into the file where u will be adding the below code

const metadata = {};
const fileurl = "";

//Make a folder in firebase storage with images (for example as I have used images)
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
//Put this inside function where you are uploading files to firebase
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  //Fallback function to get the url
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    // save the file url and convert it to a QR code
    fileurl = downloadURL;
      console.log('File available at', downloadURL);
    });
  }
);

