import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAPrRBWT1o1owcpMJWsx703PCf67z0-MLs",
    authDomain: "tonight-s-recipe.firebaseapp.com",
    databaseURL: "https://tonight-s-recipe.firebaseio.com",
    projectId: "tonight-s-recipe",
    storageBucket: "tonight-s-recipe.appspot.com",
    messagingSenderId: "239971357159",
    appId: "1:239971357159:web:3b6461dc7c740b8215ad42",
    measurementId: "G-5KLVD2QX3S"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();