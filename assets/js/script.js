let gotosignup = document.getElementsByClassName('gotosignup-btn')
let gotologin = document.getElementsByClassName('gotologin-btn')
let login = document.getElementsByClassName('login')
let signup = document.getElementsByClassName('signup')

gotosignup[0].addEventListener('click', () => {
    login[0].style.opacity = '0'
    signup[0].style.opacity = '100'
    setTimeout(() => {
        login[0].style.display = 'none'
        signup[0].style.display = 'flex'
    }, 500);
})

gotologin[0].addEventListener('click', () => {
    setTimeout(() => {
        login[0].style.display = 'flex'
        signup[0].style.display = 'none'
    }, 1000);

    login[0].style.opacity = '100'
    signup[0].style.opacity = '0'
})



let email = document.querySelector('.email')
let emailError = email.nextElementSibling
let phone = document.querySelector('.phone')
let phoneError = phone.nextElementSibling
let pass = document.querySelectorAll('.password')
let loginPass = pass[0]
let signupPass = pass[1]
let loginPassError = loginPass.nextElementSibling
let signupPassError = signupPass.nextElementSibling
let namee = document.querySelector('.name')
let nameError = namee.nextElementSibling
let lnamee = document.querySelector('.lname')
let lnameError = lnamee.nextElementSibling
let regButton = document.querySelector('.signup-btn')
let usernames = document.querySelectorAll('.username')
let loginUser = usernames[0]
let signupUser = usernames[1]
let loginUserError = loginUser.nextElementSibling
let signupUserError = signupUser.nextElementSibling
let userindex = 0


let myErr = 0
signup[0].addEventListener('click', (e) => myVal(e))
signupPass.addEventListener('input', (e) => _checkPass(e))

function setUser(name, lname, username, email, password, phone, mydata) {
    let cnt = 0
    let len = mydata.length
    for (let i = 0; i < len; i++) {
        if (
            (mydata[i].username == username)
        ) {
            cnt++
            break
        }
    }

    if (
        (name != '') &&
        (lname != '') &&
        (username != '') &&
        (email != '') &&
        (password != '') &&
        (phone != '') &&
        (cnt == 0)
    ) {

        const newUsers = {
            name: name,
            lname: lname,
            username: username,
            email: email,
            password: password,
            phone: phone
        };
        // console.log(newUsers);
        let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
        localStorage.setItem('users', JSON.stringify([...users, newUsers]))
        alert('User ' + name + lname + ' added')
        localStorage.setItem('loggedUser', JSON.stringify(newUsers))
        location.assign('profile.html')
    }
}

function myVal(e) {

    emailError.innerHTML = ''
    let _email = email.value
    let _phone = phone.value
    let _pass = signupPass.value
    let _name = namee.value
    let _lname = lnamee.value
    let _username = signupUser.value
    let nameErr = 0
    let lnameErr = 0
    let userErr = 0
    let phoneErr = 0

    let myData = JSON.parse(localStorage.getItem('users')) || 0
    let len = myData.length

    if (
        _email.search(/script/) == -1
    ) {
        if (
            (_email.length < 10) ||
            ((_email.search(/@/)) == -1) ||
            (((_email.search(/[.]/))) == -1)
        ) {
            emailError.innerHTML = 'لطفا درست وارد کنید'
            myErr++
        }
    }
    const phoneReg = new RegExp('^(\\+98|0)?9\\d{9}$');
    // console.log(phoneReg.test(_phone));

    if (!phoneReg.test(_phone)) {
        phoneError.innerHTML = 'لطفا درست وارد کنید'
        phoneErr++
    }
    else {
        phoneError.innerHTML = ''
        phoneErr = 0
    }

    if (_name == '') {
        nameError.innerHTML = 'لطفا پر کنید'
        nameErr++
    }
    else {
        nameError.innerHTML = ''
        nameErr = 0
    }

    if (_lname == '') {
        lnameError.innerHTML = 'لطفا پر کنید'
        lnameErr++
    }
    else {
        lnameError.innerHTML = ''
        lnameErr = 0
    }
    if (_username == '') {
        signupUserError.innerHTML = 'لطفا پر کنید'
        userErr++
    }
    else {
        signupUserError.innerHTML = ''
        userErr = 0
    }

    let cnt = 0
    for (let i = 0; i < len; i++) {
        if (
            (myData[i].username == _username)
        ) {
            signupUserError.innerHTML = 'این نام کاربری قبلا استفاده شده است'
            cnt++
            break
        }
    }
    if (cnt == 0) {
        signupUser.innerHTML = ''
    }

    if ((myErr > 0) || (_pass == '') || (nameErr > 0) || (cnt > 0) || (phoneErr > 0) || (lnameErr > 0) || (userErr > 0)) {
        e.preventDefault()
        // console.log(myErr);
    }
    else {
        regButton.addEventListener('submit', setUser(_name, _lname, _username, _email, _pass, _phone, myData))
    }
}

function _checkPass(e) {
    let passFlag = 0
    myErr = 0
    if (
        (e.target.value.search(/[!@#$%^&*()]/)) >= 0
    ) {
        passFlag++
    } if (
        (e.target.value.search(/[a-z]/i)) >= 0
    ) {
        passFlag++
    } if (
        (e.target.value.search(/[0-9]/i)) >= 0
    ) {
        passFlag++
    }
    if (
        e.target.value.length > 8
    ) {
        passFlag++
    }

    switch (passFlag) {
        case 1: signupPassError.innerHTML = 'ضعیف'
            signupPassError.style.color = '#af301e'
                ; myErr++; break;
        case 2: signupPassError.innerHTML = 'متوسط'
            signupPassError.style.color = 'orange'
                ; myErr++; break;
        case 3: signupPassError.innerHTML = 'خوب'
            signupPassError.style.color = 'yellow'; break;
        case 4: signupPassError.innerHTML = 'عالی'
            signupPassError.style.color = 'green'; break;
    }
}


// login
let flag = 0
let cnt = 0

login[0].addEventListener('click', (e) => checkUser(e))
loginUser.addEventListener('input', (e) => checkusername(e))
let myData = JSON.parse(localStorage.getItem('users')) || 0
let len = myData.length

function checkUser(e) {
    
    let _user = loginUser.value
    let _pass = loginPass.value
    for (let i = 0; i < len; i++) {
        if (
            (myData[i].username == _user) &&
            (myData[i].password == _pass)
        ) {
            alert('Welcome back ' + _user)
            const logUser = {
                name: myData[i].name,
                lname: myData[i].lname,
                username: myData[i].username,
                email: myData[i].email,
                password: myData[i].password,
                phone: myData[i].phone,
            }
            localStorage.setItem('loggedUser', JSON.stringify(logUser))
            location.assign('profile.html')
            flag++
            break
        }
    }

    if (flag == 0) {
        e.preventDefault()
        if (cnt != 0) {
            loginPassError.innerHTML = 'رمز اشتباه'
        }
    }
}
function checkusername(e) {
    let cnt2 = 0
    for (let i = 0; i < len; i++) {
        if (
            (myData[i].username == loginUser.value)
        ) {
            loginUserError.innerHTML = 'نام کاربری موجود است'
            userindex = i
            cnt2++
            break
        }
    }
    if (cnt2 == 0) {
        loginUserError.innerHTML = ''
    }
}

