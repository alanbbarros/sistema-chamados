import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyBp-B6FoJIoReVOfLkJRqiFdWDnUd7LeL0",
    authDomain: "sistema-de-chamados-e3472.firebaseapp.com",
    projectId: "sistema-de-chamados-e3472",
    storageBucket: "sistema-de-chamados-e3472.appspot.com",
    messagingSenderId: "433791989935",
    appId: "1:433791989935:web:d9475628226f7780ba3c5a",
    measurementId: "G-CQNPMS9T04"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;