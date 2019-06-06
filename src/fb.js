import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
   apiKey: "AIzaSyAHbL2fVY8DJJL4tqkoe5KKWYwdCHcJPoI",
   authDomain: "todo-list-ace.firebaseapp.com",
   databaseURL: "https://todo-list-ace.firebaseio.com",
   projectId: "todo-list-ace",
   storageBucket: "todo-list-ace.appspot.com",
   messagingSenderId: "242557439825",
   appId: "1:242557439825:web:a97b1c445e038529"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
export default db;