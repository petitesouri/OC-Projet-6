const form = document.querySelector('#connexion');

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    const Email = document.querySelector('#IdEmail');
    Email.addEventListener ( 'change' , async function(){
    });

    const IdPassword = document.querySelector('#password');
    IdPassword.addEventListener ( 'change' , async function() {
    });

    //const response = fetch ('http://localhost:5678/api/users/login');
    //const logIn = response.json();
    const logIn = fetch ('http://localhost:5678/api/users/login');
    const checkLogIn = logIn.json;

    if (Email.value == logIn.userId && IdPassword.value == logIn.token){
        verif = true;
    } else {
        verif = false;
    }
});




/* on submit 
let form = document.querySelector (form);

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    let currentEmail = Email.value;
    let currentPassword = IdPassword.value;

    console.log("Il n’y a pas eu de rechargement de page", currentEmail, currentPassword);

    
et que IdEmail || IdPassword = vrai
alors redirection vers la page du site de modification
 si non => message d'erreur

});

faire le logOut */