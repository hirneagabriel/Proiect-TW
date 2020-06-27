var username = document.getElementById('name')
var password = document.getElementById('pw')

function store()
{
    localStorage.setItem('username',username.value)
    localStorage.setItem('password',password.value)
}

function check() {
    var sUsername = localStorage.getItem('username')
    var sPassword = localStorage.getItem('password')

    var inputUsername = document.getElementById('userName')
    console.log(sUsername)
    console.log(sPassword)
    var inputPassword = document.getElementById('userPw')
    if(sUsername === inputUsername.value && sPassword === inputPassword.value)
        {alert('Esti logat')
        }
        else{
            alert('ERROR.')
        }
}

