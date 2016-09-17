var firebase = require('firebase')
   var config = {
   
    apiKey: "AIzaSyCBMuCtrDeAD8b7AcZykVGPoYnJrFf3Kjg",
    databaseURL: "https://hansweb-beac1.firebaseio.com",
    storageBucket: "hansweb-beac1.appspot.com",
    messagingSenderId: "548523080497"
   };
   firebase.initializeApp(config);
    var database = firebase.database();

//     var starCountRef = firebase.database().ref('users');
// starCountRef.on('value', function(snapshot) {
//   console.log(snapshot.val())
// });



  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};

  var postData = true;

  updates['/users/10107048148705313/bot_connected']= postData;


  firebase.database().ref().update(updates);

//   // Get a reference to the database service
//   var database = firebase.database();    

// // var require('firebase')
// //      var firebase_credential = "4ZhzFp6fIAfueCVyzKKkAbs7MM73wTgUpw2l0pcR"

// //     var postData = { 
// //      		touchdown: "hello"
// //      	}

// //      	//var request = require('request');
// // // request.patch("https://hansweb-beac1.firebaseio.com/users/10107048148705313.json?auth=4ZhzFp6fIAfueCVyzKKkAbs7MM73wTgUpw2l0pcR", function (error, response, body) {
// // //   if (!error && response.statusCode == 200) {
// // //     console.log(body) // Show the HTML for the Google homepage.
// // //   }
// // // })

// // //request.patch("https://hansweb-beac1.firebaseio.com/users/10107048148705313.json?auth=4ZhzFp6fIAfueCVyzKKkAbs7MM73wTgUpw2l0pcR", postData)

// // var request = require('request');
// // request.patch('https://hansweb-beac1.firebaseio.com/users/10107048148705313.json?auth=4ZhzFp6fIAfueCVyzKKkAbs7MM73wTgUpw2l0pcR', function (error, response, body) {
// //   if (!error && response.statusCode == 200) {
// //     console.log(body) // Show the HTML for the Google homepage.
// //   }
// // })


// // //       // xhttp.open("PATCH", "https://hansweb-beac1.firebaseio.com/users/10107048148705313.json?auth=4ZhzFp6fIAfueCVyzKKkAbs7MM73wTgUpw2l0pcR" + firebase_credential, true);
// // // request.get('http://10.255.255.1', {timeout: 1500}, function(err) {
// // //     console.log(err.code === 'ETIMEDOUT');
// // //     // Set to `true` if the timeout was a connection timeout, `false` or
// // //     // `undefined` otherwise.
// // //     console.log(err.connect === true);
// // //     process.exit(0);
// // // });