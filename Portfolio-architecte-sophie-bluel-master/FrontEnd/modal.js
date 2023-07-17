// Accueil modale
function openmodal () {
    const localisationModal = document.querySelector('main');
    const modal = `
    <dialog id="modal1">
        <div class="modal-homepage">
            <form method="dialog" class="dialogBox">                
                    <button class="js-modal-close"><i class="fa-solid fa-x"></i></button>                
                    <h2 class="title-modal"> Galerie photo </h2>
                    <div class="modal-gallery"></div>
                    <input type="button" class="add-project" value="Ajouter une photo"></input>
                    <button class="delete-project">Supprimer une photo</button>                
            </form>
        </div>
    </dialog>
    `
    localisationModal.insertAdjacentHTML('afterbegin', modal);
}  
openmodal()

// affichage de la galerie dans la modale
async function callApiWorks(){
    const url = "http://localhost:5678/api/works";
    const fetcher = await fetch(url);
    const Gallery = await fetcher.json();
    
    function showWorks(){            
        const modalGallery = document.querySelector('.modal-gallery');
        for (let i = 0; i < Gallery.length; i++) {
            const project = `
            <figure data-id="${Gallery[i].id}" class="modal-cards">
                <i id="${Gallery[i].id}" class="fa-regular fa-trash-can"></i>
                <img src="${Gallery[i].imageUrl}" alt="${Gallery[i].title}">
                <figcaption>éditer</figcaption>
            </figure>             
            `                
            modalGallery.insertAdjacentHTML("beforeend", project)
        }
    }
    showWorks(); 
}
callApiWorks();

// Ouverture de la modale
const buttons = document.querySelectorAll('.js-modal')
const modal = document.querySelector('#modal1')
const close = document.querySelector('.js-modal-close')
const modalHomepage = document.querySelector('.modal-homepage');

buttons.forEach (button => 
    button.addEventListener('click', (e) => {
        e.preventDefault;
        modal.style.display = 'flex'
        modalHomepage.style.display = 'flex'
    })
)
// Fermeture de la modale
const closeModal = () => {
    close.addEventListener ('click', (e) => {
        e.preventDefault;
        modal.style.display = 'none'
    })
}
closeModal()

// suppression d'un élément de la gallery

async function deleteApiWorks(){
        const url = "http://localhost:5678/api/works";
        const fetcher = await fetch(url);
        const Gallery = await fetcher.json();

    const Trash = document.querySelectorAll('.fa-trash-can');   
    const Cards = document.querySelectorAll('.modal-cards')

    Trash.forEach(el => {
        el.addEventListener('click', (e) => {
            // On récupère l'id de l'élément sur lequel on a cliqué
            const id = e.target.id;

            // On fait la requête à l'API avec l'ID en paramètre
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const datas = document.querySelectorAll(`figure[data-id="${id}"]`)
            datas.forEach(el => el.remove())
        })
    })
}
deleteApiWorks()