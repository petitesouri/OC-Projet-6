// modifier 'mode edition' qui n'est pas un bouton 
// bien penser l'imbrication dans la modale de plusieurs fenetres d'édition
// la flèche pour les déplacer

// Accueil modale

function openmodal () {
    const localisationModal = document.querySelector('main');
    const modal = `
    <dialog id="modal1">
        <form method="dialog" class="dialogBox">
                <button class="js-modal-close"><i class="fa-solid fa-x"></i></button>                
                <h2 class="title-modal"> Galerie photo </h2>
                <div class="modal-gallery"></div>
                <button class="add-project">Ajouter une photo</button>
                <button class="delete-project">Supprimer une photo</button>                
        </form>
    </dialog>
    `
    localisationModal.insertAdjacentHTML('afterbegin', modal);    
}
openmodal();


// affichage de la galerie dans la modale
async function callApiWorks(){
    const url = "http://localhost:5678/api/works";
    const fetcher = await fetch(url);
    const Gallery = await fetcher.json();
    
    function showWorks(){            
        const modalGallery = document.querySelector('.modal-gallery');
        for (let i = 0; i < Gallery.length; i++) {
            const project = `
            <figure  class="modal-cards ${Gallery[i].id}">
                <i id="${Gallery[i].id}" class="fa-regular fa-trash-can"></i>
                <img src="${Gallery[i].imageUrl}" alt="${Gallery[i].title}">
                <figcaption>éditer</figcaption>
            </figure>             
            `                
            modalGallery.insertAdjacentHTML("afterbegin", project)
        }
    }
    showWorks();    
}
callApiWorks();

// suppression d'un élément de la gallery

async function deleteApiWorks(){
        const url = "http://localhost:5678/api/works";
        const fetcher = await fetch(url);
        const Gallery = await fetcher.json();

    const Trash = document.querySelectorAll('.fa-trash-can');   
    const Cards = document.querySelectorAll('.modal-cards')

    console.log(Cards)
    
    // Fonctionne en console.log ATTENTION  ma galerie est inversée --> voir le display sur la balise
    Trash.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();

            for (let id of Gallery) {                 
                if (id.id == icon.id) {  
                    let currentID = id.id;
                    let deleteCard = Cards[currentID];

                    Gallery.splice({currentID},1);
                    deleteCard.remove();
                    console.log(Gallery)
                // suppression du projet dans l'API   
                    const htppRef = {id: parseInt(currentID)}
                    const idAPI = JSON.stringify(htppRef)
                    
                    fetch(`http://localhost:5678/api/works/${currentID}`, {method: 'DELETE',body:idAPI}); 
                }                
            }      
        })
    })
}
deleteApiWorks()