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
            <figure class="modal-cards">
                <i id="trash" class="fa-regular fa-trash-can"></i>
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

    const deleteProject = document.querySelectorAll('#trash');
    
    
// quand on clique sur un élément de la galerie effacer cet élément
        let i = 0;
        const project = Gallery[i];
        
    // mettre un foreach pour que la function s'applique à chaque deleteProject
        console.log(deleteProject[i]) 
        console.log(project.id) 
        // quand je clique sur un deleteProject, on supprime le projet        
}
deleteApiWorks()


/*let modal = null;
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusElement = null


const openmodal = function (e) {
    e.preventDefault()

modal = document.querySelector(e.target.getAttribute('href'))
focusables = Array.from(modal.querySelectorAll(focusableSelector))
previouslyFocusElement = document.querySelector(':focus')
focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)
    }

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusElement !== null) previouslyFocusElement.focus() 
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click',stopPropagation)
    modal = null
    }

const stopPropagation = function (e) {
    e.stopPropagation()
    }

const focusInModal = function (e) {
            e.preventDefault()
            let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
            if (e.shiftKey === true) {
                index--
            } else {
                index++
            }
            if (index >= focusables.length) {
                index = 0
            }
            if (index < 0) {
                index = focusables.length - 1
            }
            focusables[index].focus()
        }

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openmodal)
});

window.addEventListener('keydown', function (e) {
                if (e.key === "Escape" || e.key === "Esc") {
                    closeModal(e)
                }
                if (e.key === "Tab" && modal!== null) {
                    focusInModal(e)
                }
            })
*/