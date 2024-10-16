// profile
let profileData = JSON.parse(localStorage.getItem('loggedUser'))
const user = [profileData.name, profileData.lname, profileData.username, profileData.email, profileData.phone]

let spans = document.querySelectorAll('.info span')
// console.log(profileData);

spans.forEach((val,index) => {
    val.innerHTML = user[index]
})

let logout = document.querySelector('.logout')
logout.addEventListener('click', () => {
    localStorage.setItem('loggedUser', [])
    location.assign('index.html')
})