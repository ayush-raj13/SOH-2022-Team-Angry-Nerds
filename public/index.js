// Your web app's Firebase configuration
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

var reqemail = 'null';
var reqname = 'null';
var reqoccupation = 'null';
document.querySelector('.login').addEventListener('click',function(){
    reqemail = document.getElementById('email').value;
    reqname = document.getElementById('full_name').value;
    // reqoccupation = document.getElementById('occupation').value;
});

// Fetching Data
function fetchAllData(){
  firebase.database().ref('users').once('value', function(snapshot){
      snapshot.forEach(
          function(ChildSnapshot){
              let email = ChildSnapshot.val().email;
              if (email == reqemail)
                reqoccupation = ChildSnapshot.val().occupation;
          }
      );
  });
}

document.querySelector('.login').addEventListener('click',fetchAllData);

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  account_no = document.getElementById('account_no').value
  ifsc_code = document.getElementById('ifsc_code').value
  occupation = document.getElementById('occupation').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(account_no) == false || validate_field(ifsc_code) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      account_no : account_no,
      ifsc_code : ifsc_code,
      occupation : occupation,
      last_login : Date.now(),
      status: 0,
      signin_status : 0
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

var authentication = 0;
// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    // alert('User Logged In!!');
    authentication = 1;
    if (reqoccupation == 'farmer' && authentication == 1){
      window.location.href = "./farmerDashboard.html";
    }

    else if (reqoccupation == 'insuranceAgent' && authentication == 1){
      window.location.href = "./create.html";
    }

    else if (reqoccupation == 'governmentOfficial' && authentication == 1){
      window.location.href = "./farmerDatabase.html";
    }

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}