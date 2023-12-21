const token = sessionStorage.getItem('token')

async function initGallery() {
  const works = await fetchWorks()
  generateGalleryWorks(works)
}

initGallery()

//*Importation des projets depuis l'API*//
async function generateGalleryWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i]
    const sectionGallery = document.querySelector('.gallery')
    const worksElement = document.createElement('figure')
    sectionGallery.appendChild(worksElement)
    const imageElement = document.createElement('img')
    imageElement.src = project.imageUrl
    worksElement.appendChild(imageElement)
    const descriptionElement = document.createElement('figcaption')
    descriptionElement.textContent = project.title
    worksElement.appendChild(descriptionElement)
  }
}

////////////////////////////////
//////*Filtre des projets*//////
////////////////////////////////

async function FiltersBtn(data) {
  const filtersContainer = document.querySelector('.filters_container')
  const filterAll = document.createElement('button')
  filterAll.classList.add('btn_filter', 'active')
  filterAll.dataset.filter = 'all'
  filterAll.textContent = 'Tous'
  filtersContainer.appendChild(filterAll)
  filterAll.addEventListener('click', activeFilterBtn)

  data.forEach((category) => {
    const filtersBtn = document.createElement('button')
    filtersBtn.classList.add('btn_filter')
    filtersBtn.dataset.filter = category.id
    filtersBtn.textContent = category.name
    filtersBtn.addEventListener('click', activeFilterBtn)
    filtersContainer.appendChild(filtersBtn)
  })
}

//*Changement de couleur des boutons et tri*//
function activeFilterBtn(event) {
  const current = document.getElementsByClassName('active')
  current[0].className = current[0].className.replace(' active', '')
  this.className += ' active'
  const categoryId = event.target.dataset.filter
  const worksFiltrees = works.filter(function (work) {
    return categoryId == 'all' || work.categoryId == categoryId
  })
  document.querySelector('.gallery').textContent = ''
  generateGalleryWorks(worksFiltrees)
}

//* Récupération du token après login *//

function userConnected() {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

//* Listener sur le bouton "Logout" *//
let loginLink = document.querySelector('.login_link')
loginLink.addEventListener('click', (event) => {
  if (userConnected()) {
    window.sessionStorage.removeItem('token')
  } else {
    window.location.href = 'login.html'
  }
})

//*changement du login en logout *//
function updateLoginLink() {
  if (userConnected()) {
    loginLink.textContent = 'logout'
  } else {
    loginLink.textContent = 'login'
  }
}
updateLoginLink()

//* Bouton "mofifier"*//
function showEditButton() {
  const editButton = document.querySelector('.btn_edit')
  const editBanner = document.querySelector('.banner_edition')
  const btnFilter = document.querySelector('.filters_container')
  if (userConnected()) {
    editButton.classList.remove('none')
    editBanner.classList.remove('none')
    btnFilter.classList.add('none')
  } else {
    editButton.classList.add('none')
    editBanner.classList.add('none')
    btnFilter.classList.remove('none')
  }
}
showEditButton()
