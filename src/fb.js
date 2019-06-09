import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyCiW9E0uQ1AWl2IhqQIAV3z2Gzh4vAIvfA",
   authDomain: "neoprototype-a20ef.firebaseapp.com",
   databaseURL: "https://neoprototype-a20ef.firebaseio.com",
   projectId: "neoprototype-a20ef",
   storageBucket: "neoprototype-a20ef.appspot.com",
   messagingSenderId: "835496997831",
   appId: "1:835496997831:web:ac58b8832524bb58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// db.settings({timestampsInSnapshots: true});
export default db;