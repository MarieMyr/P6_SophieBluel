let galleryHTML = document.querySelector(".gallery")
let btnFilters = document.querySelectorAll(".filter_btn")

// Reset la section projets
let allWorks = []

// Génération des projets 
async function getAllWorks(){
    const reponse = await fetch('http://localhost:5678/api/works');
    let works = await reponse.json();
    allWorks = [...works]
    console.log(works)
    showAllWorks(works)
}

function showAllWorks(listeOfWorks){
    let workListe = ""
listeOfWorks.forEach(work => {
  workListe = workListe + `
<figure>
	<img src="${work.imageUrl}" alt="${work.title}">
	<figcaption> ${work.title}</figcaption>
</figure>
  `  
});
galleryHTML.innerHTML= workListe
}
getAllWorks()


// Section Filtres 

btnFilters.forEach((btn , index) =>{
  btn.addEventListener("click", (event)=>{
  let filterWorks = allWorks.filter(work => work.categoryId == index)
  
  if (index == 0){
    showAllWorks(allWorks)
  } else {
    showAllWorks(filterWorks)
  }
toggleActivatebtn(index)
})
})

function toggleActivatebtn(btnId){
  btnFilters.forEach((btn) =>{
  btn.classList.remove("filter_btn_active")
  })
  btnFilters[btnId].classList.add("filter_btn_active")
}


