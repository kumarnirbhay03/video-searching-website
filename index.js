
  var firebaseConfig = {
    apiKey: "AIzaSyBrFJwmlJagX5JwXwshV6YCsB9r8ZwXFRQ",
    authDomain: "signup-8eedb.firebaseapp.com",
    projectId: "signup-8eedb",
    storageBucket: "signup-8eedb.appspot.com",
    messagingSenderId: "568574312164",
    appId: "1:568574312164:web:c13d7069e0c068ecf076f1",
    measurementId: "G-P76C15B6BZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      window.location.href="home.html";
      alert("signedUp");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
  
}
function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href="home.html";
      // ...
      alert("signedIn");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("not signedup");
    });
  // [END auth_signin_password]
  
}
function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href="main.html";
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
}
