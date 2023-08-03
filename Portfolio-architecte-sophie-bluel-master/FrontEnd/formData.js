callApiWorks()
const addBox = document.querySelector('#modal1');

function addProject () {
    const formBox = `
    <div class="modal-add-project">                 
        <div class="close-modal-add-project">
            <button class="js-modal-close goback-button"><i class="fa-solid fa-arrow-left"></i></button>
            <button class="js-modal-close close-button"><i class="fa-solid fa-x"></i></button>                    
        </div>              
        <h2 class="title-modal"> Ajout photo </h2> 

        <form id="addForm">
            <label for="new-image" class="image-fieldset">
                <i class="fa-regular fa-image"></i>
                <input id="new-image" type="file" name="image" accept=".jpg,.jpeg, .png"></input>
                <button class="add-button">+ Ajouter photo</button>
                <span class="image-fieldset__span">jpg, png : 4mo max </span>
                <div class="preview-box">
                    <img id="preview">
                </div>
            </label>
            <div class = "choice-fieldset">
                <label for="new-title" class="title-fieldset">Titre </label>
                <input type="text" name="title" id="new-title">
                <label for="choice-category" class="category-fieldset">Catégorie </label>
                <select name="category" id="choice-category">
                        <option value=""></option>   
                </select>
            </div>
            <button type='button' class='submitButton'>Valider</button>
        </form>
    </div>
    `
    addBox.insertAdjacentHTML('afterbegin', formBox)

    // Preview image à télécharger
    const fileElement = document.querySelector('#new-image')
    const previewElement = document.querySelector('#preview')
    const previewBox = document.querySelector('.preview-box')

    fileElement.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        previewBox.style.display = 'flex'
        previewElement.src = url;
    })

    // categories liste déroulante
    async function callCategories(){
        const url = "http://localhost:5678/api/categories";
        const fetcher = await fetch(url);
        const Categories = await fetcher.json();

        const insertCategory = document.querySelector('#choice-category')

        for (let i = 0; i < Categories.length; i++) {
            const categoryId = `
            <option value="${Categories[i].id}">${Categories[i].name}</option>
            `
        insertCategory.insertAdjacentHTML('beforeend', categoryId);
        }
    }
    callCategories()
}
addProject()

// Ouverture de la modale d'ajout de projet
const addButton = document.querySelector('.add-project');
const modalAddProject = document.querySelector('.modal-add-project');

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    modalHomepage.style.display = 'none';
    modalAddProject.style.display = 'flex';   
})

// fermeture de la modale 
const closeButton = document.querySelector('.close-button')

closeButton.addEventListener('click', (e) =>{
    e.preventDefault;
    modalAddProject.style.display = 'none';
    addBox.style.display = 'none';
    if (modalHomepage.style.display = 'none') {
        modalHomepage.style.display = 'flex'
    }
})

// go back
const gobackButton = document.querySelector('.goback-button')  

gobackButton.addEventListener('click', (e) => {
    e.preventDefault()
    modalAddProject.style.display = 'none'
    modalHomepage.style.display = 'flex';
})

// Envoie du formData
const submitButton = document.querySelector('.submitButton')
const previewBox = document.querySelector('.preview-box')

submitButton.addEventListener('click', sendForm)

async function sendForm () {
    const formData = new FormData(addForm);
    formData.delete('image')
    const imageInput = document.querySelector('#new-image')
    formData.append('image', imageInput.files[0])

    const fetcher = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
    });
    modalAddProject.style.display = 'none'
    previewBox.style.display = 'none'
    addForm.reset()
    modalHomepage.style.display = 'flex';

    const modalGallery = document.querySelector('.modal-gallery');
    modalGallery.innerHTML = '';
    callApiWorks()

    /** ça ne marche plus a partir d'ici */

    const data = await fetcher.json();
    const sectionGallery = document.querySelector('.gallery');

    function createProject(data) {
        const projectElement = `
                <figure id="${data.id}">
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <figcaption>
                    ${data.title}
                    </figcaption>
                </figure>
            `  
        sectionGallery.insertAdjacentHTML('beforeend',projectElement)      
    }
    createProject(data)    
}