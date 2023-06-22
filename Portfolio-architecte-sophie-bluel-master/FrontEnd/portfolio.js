

// Récupère les filtres de l'API et l'affiche sur le DOM
async function showFilters(){
    const responseFilters = await fetch ('http://localhost:5678/api/categories');
    const galleryFilters = await responseFilters.json();

    console.log(galleryFilters);

// Une fonction qui permet d'initialiser le chargement des filtres et de la galerie
const init = () => {
    showFilters()
    // showWorks()
}
init()


    // On parcours les filtres un a un et on les affiche
    for(let i = 0; i <= galleryFilters.length; i++){
        // A chaque filtre on crée un bouton avec la category id
        const button = `<button data-categoryid="${galleryFilters[i].id}">${galleryFilters[i].name}</button>`;
        document.querySelector('.filters').insertAdjacentHTML("beforeend", button)
    }

    // Ajouter l'event listener au click sur les boutons
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const categoryId = button.dataset.categoryid;
            choiceFilter(categoryId)
        })
    })

}

function categoryId(id){
    console.log("Filtre ID: " + id)
}