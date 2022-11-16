import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import Constants from "expo-constants";

// const firebaseConfig = {
//   apiKey: "AIzaSyDR5rsBC215JB0FUm4_QTStNdb_Wc3aS8c",
//   authDomain: "whynot-6f21d.firebaseapp.com",
//   projectId: "whynot-6f21d",
//   storageBucket: "whynot-6f21d.appspot.com",
//   messagingSenderId: "17875376555",
//   appId: "1:17875376555:web:a2534cb47d74c440a21aee",
//   measurementId: "G-F09SZFBBQ3",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDOSNme6Cp9fkBIj0r0r9fUnB7l8zIL8iY",
  authDomain: "whynotv2-ffcc7.firebaseapp.com",
  projectId: "whynotv2-ffcc7",
  storageBucket: "whynotv2-ffcc7.appspot.com",
  messagingSenderId: "412366648609",
  appId: "1:412366648609:web:613dc3c7266f834a47fa60",
  measurementId: "G-SNYZQ7TW8L"
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
