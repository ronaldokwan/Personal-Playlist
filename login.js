let arrPage = [
    'regis-section',
    'login-section',
]



let userDB = []


function showPage(page) {
    // console.log("====");
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
    // console.log(inputUser);
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
          if (perUser.user === inputUser) {
            found = true;
            break;
          }
        }
        if(found){
            // console.log('msk');
            alert("username telah terdaftar");
            document.getElementById("input-regis-username").value = "";
            document.getElementById("input-regis-password").value = "";
            showPage("regis-section")
        } else {
            let newUser = {
                user : inputUser,
                password : inputPassword
            }
            userDB.push(newUser)
            document.getElementById("input-regis-username").value = "";
            document.getElementById("input-regis-password").value = "";
            showPage("login-section")
            Swal.fire("Registrasi Berhasil!");
        }
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
        for(let i in userDB){
            let perUser = userDB[i];
            if(perUser.user === inputUser && perUser.password === inputPassword){
                isLogin = true
            }
        }
        if(isLogin){
            localStorage.setItem("user", inputUser);
            document.getElementById("input-username").value = "";
            document.getElementById("input-password").value = "";
            // showPage("main-section")
            // console.log(document.location);
            window.location.href = "main.html"
            // console.log("===");

        } else {
            alert("username / password yang anda masukan salah");
            document.getElementById("input-username").value = "";
            document.getElementById("input-password").value = "";
            load();
        }
    }
}


