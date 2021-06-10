import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAwqpsdDI9qd3VTTPOW8qyNZjENP2wmdxA",
    authDomain: "crwn-db-7b489.firebaseapp.com",
    projectId: "crwn-db-7b489",
    storageBucket: "crwn-db-7b489.appspot.com",
    messagingSenderId: "956217697875",
    appId: "1:956217697875:web:ceae5e478add4d57e788a6",
    measurementId: "G-TG9KPDVTD6"
  };

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt : 'select_account' })

// export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signInWithGoogle=()=> auth.signInWithPopup(provider)

.catch(function(error){ const errorCode= error.code;

console.log(errorCode)

const errorMessage=error.message;

console.log(errorMessage)})

export default firebase
