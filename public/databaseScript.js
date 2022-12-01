// function sortTable() {
//     var table, rows, switching, i, x, y, shouldSwitch;
//     table = document.getElementById("myTable");
//     switching = true;
//     /*Make a loop that will continue until
//     no switching has been done:*/
//     while (switching) {
//       //start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//       /*Loop through all table rows (except the
//       first, which contains table headers):*/
//       for (i = 1; i < (rows.length - 1); i++) {
//         //start by saying there should be no switching:
//         shouldSwitch = false;
//         /*Get the two elements you want to compare,
//         one from current row and one from the next:*/
//         x = rows[i].getElementsByTagName("TD")[0];
//         y = rows[i + 1].getElementsByTagName("TD")[0];
//         //check if the two rows should switch place:
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           //if so, mark as a switch and break the loop:
//           shouldSwitch = true;
//           break;
//         }
//       }
//       if (shouldSwitch) {
//         /*If a switch has been marked, make the switch
//         and mark that a switch has been done:*/
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//       }
//     }
//   }

//   function sortTable1() {
//     var table, rows, switching, i, x, y, shouldSwitch;
//     table = document.getElementById("myTable");
//     switching = true;
//     /*Make a loop that will continue until
//     no switching has been done:*/
//     while (switching) {
//       //start by saying: no switching is done:
//       switching = false;
//       rows = table.rows;
//       /*Loop through all table rows (except the
//       first, which contains table headers):*/
//       for (i = 1; i < (rows.length - 1); i++) {
//         //start by saying there should be no switching:
//         shouldSwitch = false;
//         /*Get the two elements you want to compare,
//         one from current row and one from the next:*/
//         x = rows[i].getElementsByTagName("TD")[3];
//         y = rows[i + 1].getElementsByTagName("TD")[3];
//         //check if the two rows should switch place:
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           //if so, mark as a switch and break the loop:
//           shouldSwitch = true;
//           break;
//         }
//       }
//       if (shouldSwitch) {
//         /*If a switch has been marked, make the switch
//         and mark that a switch has been done:*/
//         rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//         switching = true;
//       }
//     }
//   }

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

var clientNo = 0;

function addItemsToList(name, email, account, ifsc, occupation){
    var ul = document.getElementById('list');
    var header = document.createElement('h2');

    var _name = document.createElement('li');
    var _email = document.createElement('li');
    var _account = document.createElement('li');
    var _ifsc = document.createElement('li');
    var _occupation = document.createElement('li');

    header.innerHTML = 'Client- '+ (++clientNo);

    _name.innerHTML = 'Name: '+name;
    _email.innerHTML = 'Email: '+email;
    _account.innerHTML = 'Account No.: '+account;
    _ifsc.innerHTML = 'IFSC Code: '+ifsc;
    _occupation.innerHTML = 'Occupation: '+occupation;

    ul.appendChild(header);
    ul.appendChild(_name);
    ul.appendChild(_email);
    ul.appendChild(_account);
    ul.appendChild(_ifsc);
    ul.appendChild(_occupation);
}

function fetchAllData(){
    firebase.database().ref('users').once('value', function(snapshot){
        snapshot.forEach(
            function(ChildSnapshot){
                let name = ChildSnapshot.val().full_name;
                let email = ChildSnapshot.val().email;
                let account = ChildSnapshot.val().account_no;
                let ifsc = ChildSnapshot.val().ifsc_code;
                let occupation = ChildSnapshot.val().occupation;
                addItemsToList(name, email, account, ifsc, occupation);
            }
        );
    });
}

window.onload(fetchAllData());