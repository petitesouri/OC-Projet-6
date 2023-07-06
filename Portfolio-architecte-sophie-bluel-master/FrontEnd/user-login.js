const form = document.querySelector('form');

form.addEventListener('submit', async (event) =>  {
    event.preventDefault();

    const datas = {
        email: form.email.value,
        password: form.password.value
    }

    const req = await fetch("http://localhost:5678/api/users/login",{
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(datas)
                })
    const data = await req.json();

    if (data.message || data.error) {
        function showMessage() {
            const positionMessage = document.querySelector('#login-form');

            const textMessage = `  
                <div class="alert"> 
                    Erreur dans l’identifiant ou le mot de passe 
                </div>           
                `;
            positionMessage.insertAdjacentHTML('beforeend', textMessage);
            document.querySelector('.alert').style.color = 'red';
        }
        showMessage();

        // effacer alerte au click sur la page
        const body = document.querySelector('body');
        body.addEventListener ('click',() => {
            const positionMessage = document.querySelector('#login-form .alert'); 
            positionMessage.remove(); 
            form.reset();
        });  
    };
    
    if (data.token) {       
        localStorage.setItem('token', 'admin');
        window.location.href = "index.html";
    }   
});
