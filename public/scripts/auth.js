// listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        $('#logout').show();
        $('#uploadPic').show();
        $('#buttonDelete').show();

        console.log('user logged in: ', user);
    } else {
        $('#logout').hide();
        $('#uploadPic').hide();
        $('#buttonDelete').hide();
        
        console.log('user logged out');
        
    }
})

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close the modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset(); 
    }) 
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  alert("You've logged out.");
});