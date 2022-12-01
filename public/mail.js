const firebaseConfig = {
  //   copy your firebase config informations
  apiKey: "AIzaSyD7Zushsybrp9HvWIBQS-b1pNg9OFHyL0U",
  authDomain: "smart-odisha.firebaseapp.com",
  projectId: "smart-odisha",
  storageBucket: "smart-odisha.appspot.com",
  messagingSenderId: "973654105562",
  appId: "1:973654105562:web:e2a275ebe5662cc23f34e3"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");
  var myFile=getElementVal("myFile");

  saveMessages(name, emailid, msgContent,myFile);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, emailid, msgContent,myFile) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
    myFile: myFile
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
