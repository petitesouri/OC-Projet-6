// Affichage gallery
async function callApiWorks(){
    const url = "http://localhost:5678/api/works";
    const fetcher = await fetch(url);
    const Gallery = await fetcher.json();

    const sectionGallery = document.querySelector('.gallery');
        
    function showProjects (ArrayArgument) {
        ArrayArgument.forEach(project => {
            const projectElement = `
                <figure data-id="${project.id}">
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <figcaption>
                    ${project.title}
                    </figcaption>
                </figure>
            `        
            sectionGallery.insertAdjacentHTML("beforeend", projectElement)         
        })
    }
    showProjects(Gallery)
    
    // Affichage filtres 
    async function callApiFilters(){
        const url = "http://localhost:5678/api/categories";
        const fetcher = await fetch(url);
        const Categories = await fetcher.json();
        
        function showButtons() {        
            const button = `
                <button class="tous">
                    Tous
                </button>`                
            document.querySelector('.filters').insertAdjacentHTML("beforeend", button)
            
            for (let i = 0; i < Categories.length; i++) {
                const button = `
                <button class="${Categories[i].id}">
                    ${Categories[i].name}
                </button>`                
                document.querySelector('.filters').insertAdjacentHTML("beforeend", button)
            }
        } 
        showButtons();

        function callElementFilter () {
            const buttons = document.querySelectorAll('.filters button');
            
            buttons.forEach (button => {
                button.addEventListener('click', (e) => {
                    const foundWork = Gallery.filter(work => work.categoryId == button.className);                    
                    if (button.className != 'tous') {
                        sectionGallery.innerHTML = '';
                        showProjects(foundWork);
                    } else {
                        sectionGallery.innerHTML = '';
                        showProjects(Gallery)
                    }
                })
            })
        }
        callElementFilter();
    }
    callApiFilters();
}
callApiWorks();