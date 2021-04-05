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

function hashCode(str){
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function refreshCategoryUI() {
    console.log("show categories")
    let n = showCategories();
    for (let i = 0; i < n; i++) {
        console.log("show links" + i)
        showLinks(i);
    }
    
}

function signUp() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            
            window.location.href = "home.html";
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
           
            window.location.href = "home.html";
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
        window.location.href = "main.html";
    }).catch((error) => {
        // An error happened.
    });
    // [END auth_sign_out]
}


function home() {

    window.location.href = "home.html";

}

function addCategory() {
    
    let addTitle = document.getElementById("addTitle");
    let categoryName = addTitle.value.trim();
    console.log(categoryName)
    let categoriesObj;
    if (categoryName != "") {
        let categories = localStorage.getItem("categories");
        console.log(categories)
        if (categories == null) {
            categoriesObj = [];
        } else {
            categoriesObj = JSON.parse(categories);
        }
        categoriesObj.push({title: categoryName, links: "link_"+hashCode(categoryName)});
        localStorage.setItem("categories", JSON.stringify(categoriesObj));

        console.log(categoriesObj)
        addTitle.value = "";
    }
    refreshCategoryUI()
}

function showCategories() {
  
    let categories = localStorage.getItem("categories");
    console.log(categories)
    if (categories == null) {
        categoriesObj = [];
    } else {
        categoriesObj = JSON.parse(categories);
    }
    let html = "";
    categoriesObj.forEach(function (element, category) {
        
        html += `
        <div class="card mx-3 my-3" style="opacity:0.9;  border:none; " >
        <input class="form-control mx-2 my-2" id="searchLink${category}" type="search" placeholder="Search-by-link" aria-label="Search" onclick=recordname(${category})  style="width: 18rem; ">
        <button class="btn btn-primary mx-2" type="submit" id="cls1" onclick="reload()" style="width: 5rem; " >Reload</button>
            <div class="card-body" style="opacity:0.9;" >
              <b><h5 style="font-family:verdana;font-size:150%; color:blanchedalmond;" class="card-title">${element.title} <button id="${category}" onclick="deleteCategory(${category})" class="btn btn-primary mx-2">Delete Cat</button></h5><b>
             
              <div class="my-3">
              <div class="my-3">
              <textarea class="form-control" id="addName${category}" rows="1" placeholder="Enter Video Name"  style="width: 18rem;"></textarea>
              </div>
              <textarea class="form-control" id="addTxt${category}" rows="1" placeholder="Enter Link" style="width: 30rem;"></textarea>
              </div>
              
              <button id="${category}" onclick="addLinkToCategory(this.id)"  class="btn btn-primary mx-2">Add Link</button>
              <hr>
              <h5 style="font-family:verdana;font-size:200%; color:white; text-align:center;" class="card-txt">Added Link</h5>
              
              <div id="link${category}" class="row container-fluid"></div>
              </div>
              
            </div>
            `;
    });

    console.log("final html :", html)

    let categoriesElm = document.getElementById("categories");
    if (categoriesObj.length !== 0) {
        categoriesElm.innerHTML = html;
        console.log("added all")
    } else {
        categoriesElm.innerHTML = ``;
        console.log("nothing here")
    }
    return categoriesObj.length
}

function addLinkToCategory(category) {
    console.log("addLinkToCategory called category =", category)
    let addName = document.getElementById("addName"+category);
    let addTxt = document.getElementById("addTxt" + category);
    addNameval = addName.value;
    addTxtval = addTxt.value;
    console.log(addTxtval)
    if (addTxtval.trim() != 0 && addNameval.trim() != 0) {
        let linksKey = JSON.parse(localStorage.getItem("categories"))[category].links
        
        let link = localStorage.getItem(linksKey);
        console.log(link)
        if (link == null) {
            linkObj = [];
        } else {
            linkObj = JSON.parse(link);
        }
    myObj = {
        name: addName.value,
        link: addTxt.value
    }
        console.log(linkObj)
        linkObj.push(myObj);
        console.log(linkObj)
        localStorage.setItem(linksKey, JSON.stringify(linkObj));
        addName.value = "";
        addTxt.value = "";
    }

    showLinks(category);
}

function showLinks(category) {
    console.log("show link called category", category)
    let linksKey = JSON.parse(localStorage.getItem("categories"))[category].links
    let link = localStorage.getItem(linksKey);
    console.log(link)
    if (link == null) {
        linkObj = [];
    } else {
        linkObj = JSON.parse(link);
    }
    console.log(linkObj)
    let htmlc = "";
    linkObj.forEach(function (item, i) {
        htmlc += ` <div class="cards mx-2 my-1" style="width: 20rem;" >
       
            <p class="card-title" style="font-family:verdana;font-size:100%;">${item.name} </p>
            <a href="${item.link}" style="font-family:verdana;font-size:110%;" > link</a> <button  id="${i}" onclick="deleteLink(${category}, this.id)" class="btn btn-primary mx-2">Delete Link</button>
            
            </div>
        `;
    });

    console.log(linkObj)

    let linkElm = document.getElementById("link" + category);
    if (linkObj.length !== 0) {
        linkElm.innerHTML = htmlc;
    } else {
        linkElm.innerHTML = ``;
    }
}

function deleteLink(category, i) {
    let linksKey = JSON.parse(localStorage.getItem("categories"))[category].links
    let link = localStorage.getItem(linksKey);
    if (link == null) {
        linkObj = [];
    } else {
        linkObj = JSON.parse(link);
    }

    linkObj.splice(i, 1);
    localStorage.setItem(linksKey, JSON.stringify(linkObj));
    showLinks(category);
}

function deleteCategory(category) {
    let categories = JSON.parse(localStorage.getItem("categories"));
    let linksKey = categories[category].links
    localStorage.removeItem(linksKey)

    categories.splice(category, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    refreshCategoryUI()
}

function record() {
    
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";

    recognition.onresult = function(event) {
        console.log(event);
        document.getElementById('searchTxt').value = event.results[0][0].transcript;
        let inputVal =  document.getElementById('searchTxt').value .toLowerCase(); 
        let card = document.getElementsByClassName('card');
        Array.from(card).forEach(function(element){
            let cardTxt = element.getElementsByClassName("card-title")[0].innerText.toLowerCase();
            
            if(cardTxt.includes(inputVal)){
                element.style.display = "block";
            }
            else{
                element.style.display = "none";
            }
            console.log(cardTxt);
        })
    }
    recognition.start();
    
    cls.style.display="block";
   
}





function recordname(category) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-GB";

    recognition.onresult = function(event) {
        console.log(event);
        document.getElementById('searchLink'+category).value = event.results[0][0].transcript;
        let inputVal1 = document.getElementById('searchLink'+category).value.toLowerCase(); 
    
    console.log('input',inputVal1);
    let cards = document.getElementsByClassName('cards');
    Array.from(cards).forEach(function(element){
        let cardsTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardsTxt.includes(inputVal1)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        console.log(cardsTxt);
    })
    }
    recognition.start();

  
}
function reload(){
    location.reload();
}
