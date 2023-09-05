import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

/* Google Auth */
import { GoogleAuthProvider,  getAuth, getRedirectResult, signInWithPopup, signInWithRedirect } from "firebase/auth";

// thay config thành config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBVKF9iFnEWatiWjmqE5iUhUOwXmxgtIl8",
  authDomain: "md04-a5458.firebaseapp.com",
  projectId: "md04-a5458",
  storageBucket: "md04-a5458.appspot.com",
  messagingSenderId: "342613931632",
  appId: "1:342613931632:web:2be934176550e66334a6b5",
  measurementId: "G-9Z278D409H"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) { 

  if (!file) { 
    return false
  }
  const fileRef = ref(storage, `${folderName}/` + file.name);

  let url = await uploadBytes(fileRef, file).then( async res => {
    return await getDownloadURL(res.ref)
    .then(url => url)
    .catch(er => false)
  })

  return url
}

/* Google Auth */
const googleProvider = new GoogleAuthProvider();

export async function googleLogin(){
  let auth = getAuth(app)
  return await signInWithPopup(auth, googleProvider)

}

