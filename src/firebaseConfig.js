import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGcIpf16yJcKGds98xEjU6u_utglt6lQY",
  authDomain: "hdgroup-1aea4.firebaseapp.com",
  projectId: "hdgroup-1aea4",
  storageBucket: "hdgroup-1aea4.appspot.com",
  messagingSenderId: "688811163946",
  appId: "1:688811163946:web:0c926bcf944584318c9e53",
  measurementId: "G-LVE7L46FHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
