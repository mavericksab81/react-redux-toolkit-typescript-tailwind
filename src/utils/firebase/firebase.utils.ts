import { initializeApp } from 'firebase/app';
import {  getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyAtUR5ZtxooTSe4kFfsA4OI2Vade9PRHAk",
    authDomain: "fir-crud-9136f.firebaseapp.com",
    databaseURL: "https://fir-crud-9136f.firebaseio.com",
    projectId: "fir-crud-9136f",
    storageBucket: "fir-crud-9136f.appspot.com",
    messagingSenderId: "249606379775",
    appId: "1:249606379775:web:8a7ebbc1d620e924"
}

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signInFirebase = async (username: string, password: string) => {
    try {
        return await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        console.log(error);
    }
}