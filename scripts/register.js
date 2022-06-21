'use strict'


const fistName = document.getElementById('input-firstname');
const lastName = document.getElementById('input-lastname');
const userName = document.getElementById('input-username');
const password = document.getElementById('input-password');
const confirmPassword = document.getElementById('input-password-confirm');
const registerButton = document.getElementById('btn-submit');

//crete or get userArr
let userArr= getStorage('users');

//check validate form
function validate(){
    if(fistName.value === '' || lastName.value === '' || userName.value === '' || password.value === '' || confirmPassword.value === ''){
        alert('Please fill all fields');
        return false;
    }
    if(password.value !== confirmPassword.value){
        alert('Passwords do not match');
        return false;
    }
    if(userArr.find(user => user.userName === userName.value)){
        alert('User already exists');
        return false;
    }
    if(password.value.length < 9){
        alert('Password must be at least 9 characters long');
        return false;
    }
    return true;
}

//when click register button
registerButton.addEventListener("click", function (){
    console.log('submit');
    if(validate()){
let user = new User(fistName.value, lastName.value, userName.value, password.value);
userArr.push(user);
setStorage('users', userArr);
alert('User created successfully');
window.location.href = 'login.html';
    }
});

