var firebaseConfig = {
  apiKey: "AIzaSyAhpmoWHY24_GXbEEshnOwChfoABzu2DtE",
    authDomain: "smartodishahackathon-ac6b3.firebaseapp.com",
    databaseURL: "https://smartodishahackathon-ac6b3-default-rtdb.firebaseio.com",
    projectId: "smartodishahackathon-ac6b3",
    storageBucket: "smartodishahackathon-ac6b3.appspot.com",
    messagingSenderId: "74474433499",
    appId: "1:74474433499:web:90be9ceca5b5dba00c55fe"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

var key = 0;

var a = document.getElementById('status');
a.addEventListener('change', function() {
  key = this.value;
  console.log(key);
}, false);

document.getElementById('status').addEventListener('change', function() {
    firebase.database().ref('users/'+'G54ymFswIHgZiywgi8DwLsNaTku2').update({
      status: key
    })
})



