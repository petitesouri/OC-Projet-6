// Affichage gallery

async function callApiWorks(){
    const url = "http://localhost:5678/api/works";
    const fetcher = await fetch(url);
    const Gallery = await fetcher.json();
    
    function showWorks(){            
        const sectionGallery = document.querySelector('.gallery');
        
        Gallery.forEach(project => {
            const projectElement = `
                <figure>
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <figcaption>
                    ${project.title}
                    </figcaption>
                </figure>
            `        
            sectionGallery.insertAdjacentHTML("beforeend", projectElement)
        })
    }
    showWorks();
}

// Affichage filtres 

async function callApiFilters(){
    const url = "http://localhost:5678/api/categories";
    const fetcher = await fetch(url);
    const Categories = await fetcher.json();

    function showButtons() {
        for (let i = 0; i < Categories.length; i++) {
            const button = `
            <button class="${Categories[i].id}">
                ${Categories[i].name}
            </button>`                
            document.querySelector('.filters').insertAdjacentHTML("beforeend", button)
        }
    } 
    showButtons();

    // Eventlistener
    async function callApiWorks(){
        const url = "http://localhost:5678/api/works";
        const fetcher = await fetch(url);
        const Gallery = await fetcher.json();
    
        const buttons = document.querySelectorAll('.filters button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const idButtonHtml = button.className;
                const foundCategory = Categories.find(category => category.id == idButtonHtml);
                const foundWork = Gallery.filter(work => work.categoryId == idButtonHtml);               
                const sectionGallery = document.querySelector('.gallery');

                foundWork.forEach(project => {
                    const projectElement = `
                        <figure>
                            <img src="${project.imageUrl}" alt="${project.title}">
                            <figcaption>
                            ${project.title}
                            </figcaption>
                        </figure>
                    `        
                    sectionGallery.innerHTML = '';
                })

                // affichage des works filtrés
                function showWorks(){           
                    const sectionGallery = document.querySelector('.gallery'); 

                    foundWork.forEach(project => {
                        const projectElement = `
                            <figure>
                                <img src="${project.imageUrl}" alt="${project.title}">
                                <figcaption>
                                ${project.title}
                                </figcaption>
                            </figure>
                        `        
                        sectionGallery.insertAdjacentHTML("beforeend", projectElement)
                    })
                }  
                showWorks();                 
            })
        })
    }
    callApiWorks();
}

const init = () => {
    callApiFilters();
    callApiWorks();
}
init();