// affichage page d'accueil si localstorage est true

if (localStorage.getItem('token') != null) {
    const editNav = document.querySelector('.edit-nav');
    const editModeIntroduction = document.querySelector('.edit-Mode-Title');
    const editModePortfolio = document.querySelector('.edit-Mode-Portfolio');
    const headerLog = document.querySelector('.login');
    const filters = document.querySelector('.filters');

    editNav.style = 'display:flex';
    editModeIntroduction.style = 'display:flex';
    editModePortfolio.style = 'display:flex';
    headerLog.innerText = 'Logout';
    headerLog.style = 'font-size:1.2em;';
    filters.style = 'display:none';
   
}

const logout = document.querySelector('.login');

logout.addEventListener('click', () => {
    localStorage.clear();
    // ATTENTION le renvoie sur la page d'accueil ne se fait pas
    window.location.href = 'index.html';
});