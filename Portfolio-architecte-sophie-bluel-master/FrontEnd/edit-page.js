// insertion des éléments page d'acceuil mode edit

if (localStorage.getItem('token') != null) {
    
    const headerEditMode = document.querySelector('header');
    const introduction = document.querySelector('#introduction figure');
    const filtersEdit = document.querySelector('.filters');
    const portfolioEdit = document.querySelector('.gallery');

    const editIndex = `
        <div class="edit-nav">                       
            <button href="#modal1" class="js-modal header">
                <i class="fa-regular fa-pen-to-square"></i>Mode édition
            </button>
            <button href="#modal1" class="js-modal header">Publier les changements</button>           
        </div>
    `
    const editIntroduction = `
        <button href="#modal1" class="js-modal main">
            <i class="fa-regular fa-pen-to-square"></i>Modifier
        </button>  
    `

    headerEditMode.insertAdjacentHTML('beforebegin', editIndex);
    introduction.insertAdjacentHTML('beforeend', editIntroduction);
    filtersEdit.style.display = 'none';
    portfolioEdit.insertAdjacentHTML('beforebegin', editIntroduction);   
       

    // fonction logout

    const login = document.querySelector('.login');
    login.innerHTML = 'Logout';

    login.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });
    
    // Ouverture et fermeture de la modale
    const buttons = document.querySelectorAll('.js-modal')
    const modal = document.querySelector('#modal1')
    const close = document.querySelector('.js-modal-close')

    function openmodal(e) {
        e.preventDefault()        
        modal.style.display = 'flex'
    }

    function closemodal(e) {
        e.preventDefault()
        modal.style.display = 'none'
    }  
    
    buttons.forEach(button => {
        button.addEventListener('click', openmodal)
    })
    close.addEventListener('click', closemodal)
}

