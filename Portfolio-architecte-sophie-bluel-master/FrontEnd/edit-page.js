// insertion des éléments page d'acceuil mode edit

if (localStorage.getItem('token') != null) {
    
    const headerEditMode = document.querySelector('header');
    const introduction = document.querySelector('#introduction figure');
    const filtersEdit = document.querySelector('.filters');
    const portfolioEdit = document.querySelector('.gallery');

    const editIndex = `
        <div class="edit-nav">                       
            <span href="#modal1" class="js-modal header">
                <i class="fa-regular fa-pen-to-square"></i>Mode édition
            </span>
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
       
    const editPage = document.querySelector('main')
    
    // fonction logout
    const login = document.querySelector('.login');
    login.innerHTML = 'Logout';

    login.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });
}

