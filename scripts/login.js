'use strict'

const userName = document.getElementById('input-username');
const password = document.getElementById('input-password');
const loginButton = document.getElementById('btn-submit');

function validate(){
    if(userName.value === '' || password.value === ''){
        alert('Please fill all fields');
        return false;
    }
    return true;
}

loginButton.addEventListener("click", function (){
    console.log('submit');
    if(validate()){
        let userArr= getStorage('users');
        let user = userArr.find(user => user.userName === userName.value && user.password === password.value);
        if(user){
           setStorage('currentUser', user);
            window.location.href = 'news.html';
        }else{
            alert('User does not exist');
        }
    }
});


