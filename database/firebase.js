import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
const firebaseConfig = {
  apiKey: "AIzaSyAPVuwIWQrF7KtD9qTYZRHq6pZyabMeNPs",
  authDomain: "native-b0d48.firebaseapp.com",
  projectId: "native-b0d48",
  storageBucket: "native-b0d48.appspot.com",
  messagingSenderId: "189316689243",
  appId: "1:189316689243:web:e6284d33cc285a89d63e7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Acciones de firebase
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function uploadFile(file){
 const storageRef = ref(storage, v4())
 await uploadBytes(storageRef, file)
 const url = await getDownloadURL(storageRef)
 return url
}