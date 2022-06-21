'use strict'
const logoutButton = document.getElementById('btn-logout');

logoutButton.addEventListener("click", function (){
    removeStorage('currentUser');
    window.location.href = 'index.html';
});
addEventListener('load', function (){
   
 console.log(getStorage('currentUser').firstName);
    if(getStorage('currentUser').firstName !=undefined){
        const modal = document.getElementById('login-modal');
        modal.innerHTML = ''
       modal.innerHTML = `Welcome ${getStorage('currentUser').firstName}`;
    }else{
        const modal = document.getElementById('login-modal');
        modal.innerHTML = ''
       modal.innerHTML = `<p>Please Login or Register</p>
       <div class="row" >
           <div class="col-md-3">
               <a href="./pages/login.html" class="btn btn-primary btn-block">Login</a>
           </div>
           <div class="col-md-3">
               <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
           </div>
       </div>	`;
    }
});


