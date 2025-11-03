import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDWvqadZgRkzBKiqmqV2GsDstJgbyCK9T0",
  authDomain: "pi-final-grupo3.firebaseapp.com",
  projectId: "pi-final-grupo3",
  storageBucket: "pi-final-grupo3.firebasestorage.app",
  messagingSenderId: "277219190299",
  appId: "1:277219190299:web:db3aa87eb109c7ca95fabe"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();