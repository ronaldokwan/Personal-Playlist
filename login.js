let arrPage = [
    'regis-section',
    'login-section',
    'main-section'
]

let musicDB = []

let userDB = []


function showPage(page) {
    for(let i = 0; i < arrPage.length; i++){
        let perPage = arrPage[i];
        if(perPage === page){
            document.getElementById(perPage).style.display = "block";
        } else {
            document.getElementById(perPage).style.display = "none";
        }
    }
}


function handlingRegis() {
    let inputUser = document.getElementById("input-regis-username").value;
    console.log(inputUser);
    let inputPassword = document.getElementById("input-regis-password").value;
    if (!inputUser || !inputPassword) {
        alert("username / password is invalid");
        inputUser = "";
        inputPassword = "";
        showPage("regis-section");
    } else {
        // cek apakah ada duplikasi user
        let found = false;
        for (let i = 0; i < userDB.length; i++) {
          let perUser = userDB[i];
          if (perUser.username === inputUser) {
            found = true;
            break;
          }
        }

        let newUser = {
            user : inputUser,
            password : inputPassword
        }
        userDB.push(newUser)
    }
}



function handlingLogin() {
    let inputUser = document.getElementById("input-username").value;
    let inputPassword = document.getElementById("input-password").value;
    // console.log(inputUser, inputPassword);
    if(!inputUser || !inputPassword){
        alert(`username / password is invalid`)
        inputUser = "";
        inputPassword = "";
        showPage("login-section")
    } else {
        let isLogin = false;
    }
}
