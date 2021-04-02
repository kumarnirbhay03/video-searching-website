let n = showCategory();
for (let i = 0; i < n; i++){
    showLink(i);
}
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
function addcat() {
    
  let addTitle = document.getElementById("addTitle");
  addTitleval = addTitle.value;
  
  if (addTitleval.trim() != 0) {
      let category = localStorage.getItem("category");
      
      if (category == null) {
          categoryObj = [];
      } else {
          categoryObj = JSON.parse(category);
      }
      categoryObj.push(addTitle.value);
      localStorage.setItem("category", JSON.stringify(categoryObj));

      
      addTitle.value = "";}
  var n = showCategory();
  for (let i = 0; i < n; i++){
      showLink(i);
  }

}

function showCategory() {
  
  let category = localStorage.getItem("category");
  
  if (category == null) {
      categoryObj = [];
  } else {
      categoryObj = JSON.parse(category);
  }
  let html = "";
  categoryObj.forEach(function (element, index) {
      
      html += `
  
  <div class="card-body">
    <h5 class="card-title">${element}</h5>
    <button id="${index}" onclick="deleteCat(this.id)" class="btn btn-outline-success">Delete Cat</button>
    <h5 class="card-title">Added Link</h5>
    
      
    <textarea class="form-control" id="addTxt${index}" rows="1"></textarea>
    <button id="${index}" onclick="addlink(this.id)"  class="btn btn-outline-success">Add Link</button>
    <div id="link${index}" class="row container-fluid">
        
        
        
        
        </div>
    
    
  </div>

`;

  });

 

  let categoryElm = document.getElementById("category");
  if (categoryObj.length !== 0) {
      categoryElm.innerHTML = html;
      
  } else {
      categoryElm.innerHTML = `Nothing to show! Use "Add a Link" section above to add notes.`;
     
  }
  return categoryObj.length
}

function addlink(index) {
 
  let addTxt = document.getElementById("addTxt"+index);
  addTxtval = addTxt.value;

  if (addTxtval.trim() != 0) {
      let link = localStorage.getItem("link"+index);
      console.log(link)
      if (link == null) {
          linkObj = [];
      } else {
          linkObj = JSON.parse(link);
      }

      
      linkObj.push(addTxt.value);
      
      localStorage.setItem("link"+index, JSON.stringify(linkObj));

      addTxt.value = "";
  }

  showLink(index);
}

function showLink(index) {
  
  let link = localStorage.getItem("link"+index);
  
  if (link == null) {
      linkObj = [];
  } else {
      linkObj = JSON.parse(link);
  }
  
  let htmlc = "";
  linkObj.forEach(function (item, i) {
      htmlc += `
  <a href="${item}" class="card-text"> ${item}</a>
  <button id="${i}" onclick="deleteNote(${index}, this.id)" class="btn btn-outline-success">Delete Link</button>
  
`;

  });


 

  let linkElm = document.getElementById("link"+index);
  if (linkObj.length !== 0) {
      linkElm.innerHTML = htmlc;
  } else {
      linkElm.innerHTML = `Nothing to show! Use "Add Link ".`;
  }
  return linkObj.length 
}

function deleteNote(index, i) {


  let link = localStorage.getItem("link"+index);
  if (link == null) {
      linkObj = [];
  } else {
      linkObj = JSON.parse(link);
  }

  linkObj.splice(i, 1);
  localStorage.setItem("link"+index, JSON.stringify(linkObj));
  showLink(index);
}

function deleteCat(index) {


  let category = localStorage.getItem("category");
  if (category == null) {
      categoryObj = [];
  } else {
      categoryObj = JSON.parse(category);
  }

  categoryObj.splice(index, 1);
  localStorage.setItem("category", JSON.stringify(categoryObj));
  deleteAll(index);
  let n = showCategory();
  for (let i = 0; i < n; i++){
      showLink(i);
  }
}



function deleteAll(index){
console.log(this,index);
let link = localStorage.getItem("link"+index);
  if (link == null) {
      linkObj = [];
  } else {
      linkObj = JSON.parse(link);
  }
  let n=showLink(index);
  linkObj.splice(0,n);
  
  localStorage.setItem("link"+index, JSON.stringify(linkObj));
  
  
  showLink(index);

}