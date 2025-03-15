import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database'
import {getAuth} from "firebase/auth";
const key = import.meta.env.VITE_KEY
const firebaseConfig = {
    apiKey: key,
    authDomain: "learning-3c14a.firebaseapp.com",
    databaseURL: "https://learning-3c14a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "learning-3c14a",
    storageBucket: "learning-3c14a.appspot.com",
    messagingSenderId: "134105387533",
    appId: "1:134105387533:web:da8d358c531ba91f8afb44"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export {database, auth};