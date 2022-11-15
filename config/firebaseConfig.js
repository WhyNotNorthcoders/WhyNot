import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: "AIzaSyDR5rsBC215JB0FUm4_QTStNdb_Wc3aS8c",
  authDomain: "whynot-6f21d.firebaseapp.com",
  projectId: "whynot-6f21d",
  storageBucket: "whynot-6f21d.appspot.com",
  messagingSenderId: "17875376555",
  appId: "1:17875376555:web:a2534cb47d74c440a21aee",
  measurementId: "G-F09SZFBBQ3",
};

const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);
export const auth = getAuth();
//init servic
export const database = getFirestore(app);

//collection ref
// export const colRef = collection(database, "users");

//get collection data
// getDocs(colRef).then((snapshot) => {
//   console. log(snapshot.docs);
// });
