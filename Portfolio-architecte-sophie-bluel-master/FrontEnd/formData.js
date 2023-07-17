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
            <label for="new-image">
                <i class="fa-regular fa-image"></i>
            </label>
            <input id="new-image" type="file" name="imageUrl" accept=".jpg,.jpeg, .png">
            <div class="preview-box">
                <img id="preview">
            </div>
            <label for="new-title">Titre </label>
            <input type="text" name="title" id="new-title">
            <label for="choice-category">Catégorie </label>
            <select name="categoryId" id="choice-category">
                    <option value=""></option>   
            </select>

            <button class='submitButton'>Bouton</button>
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
            <option value="${Categories[i].name}">${Categories[i].name}</option>
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
const addForm = document.querySelector('#addForm')

addForm.addEventListener('submit', sendForm);

function sendForm (e) {
    e.preventDefault();

    const formData = new FormData(addForm);
    //const id = formData.append('id', '0')
    const title = formData.get('title');
    const categoryId = document.querySelector('#choice-category').selectedIndex;
    const image = document.querySelector('#new-image').value;
    //const userId = formData.append('userId', '0')
    //const newForm = {id: Number(id), title, image, categoryId, userId: Number(userId)}

    const newForm = {'title': title, 'imageUrl': image, 'categoryId' : categoryId}
    saveFormData(newForm);
    AuthorizationAPI();
    sendAPI();
}

function saveFormData(Form) {
    let Forms = JSON.parse(localStorage.getItem("Forms")) || []
    Forms = [...Forms, Form];
    localStorage.setItem("Forms", JSON.stringify(Forms));
}

async function AuthorizationAPI () {
    const fetcher = await fetch(`http://localhost:5678/api/works`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });
}
AuthorizationAPI();

async function sendAPI () {
    const fetcher = await fetch(`http://localhost:5678/api/works`, {
        method: 'POST',
        headers: {
            'content-Type': "multipart/form-data,",
        },
        body: `${localStorage.getItem('Forms')}`,
    });
}