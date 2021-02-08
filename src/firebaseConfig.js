import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCbe43gQDRDBuW6xeI-3KYNjFAwKYLUjPM",
    authDomain: "inventory-mgmt-83871.firebaseapp.com",
    projectId: "inventory-mgmt-83871",
    storageBucket: "inventory-mgmt-83871.appspot.com",
    messagingSenderId: "29714767129",
    appId: "1:29714767129:web:c24d9a529f509f58157988"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;