const resworks = await fetch('http://localhost:5678/api/works')
const works = await resworks.json()

const rescategories = await fetch('http://localhost:5678/api/categories')
const categories = await rescategories.json()

const token = sessionStorage.getItem('token')

//*Importation des projets depuis l'API*//
async function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i]
    const sectionGallery = document.querySelector('.gallery')
    const worksElement = document.createElement('figure')
    const imageElement = document.createElement('img')
    imageElement.src = project.imageUrl
    const descriptionElement = document.createElement('figcaption')
    descriptionElement.innerText = project.title

    sectionGallery.appendChild(worksElement)
    worksElement.appendChild(imageElement)
    worksElement.appendChild(descriptionElement)
  }
}

//*Changement de couleur des boutons au click*//
const filterButtons = document.querySelector('.filter_btn')
const btns = filterButtons.getElementsByClassName('btn')
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    const current = document.getElementsByClassName('active')
    current[0].className = current[0].className.replace(' active', '')
    this.className += ' active'
  })
}

////////////////////////////////
//////*Filtre des projets*//////
////////////////////////////////

generateWorks(works)
//*Filtre All*//
const buttonFilterAll = document.querySelector('.btn_all')
buttonFilterAll.addEventListener('click', function () {
  const worksFiltrees = works.filter(function (works) {})
  document.querySelector('.gallery').innerHTML = ''
  generateWorks(works)
})
//*Filtre Objets*//
const buttonFilterObject = document.querySelector('.btn_object')
buttonFilterObject.addEventListener('click', function () {
  const worksFiltrees = works.filter(function (works) {
    return works.categoryId === 1
  })
  document.querySelector('.gallery').innerHTML = ''
  generateWorks(worksFiltrees)
})
//*Filtre Appartements*//
const buttonFilterApartment = document.querySelector('.btn_apartment')
buttonFilterApartment.addEventListener('click', function () {
  const worksFiltrees = works.filter(function (works) {
    return works.categoryId === 2
  })
  document.querySelector('.gallery').innerHTML = ''
  generateWorks(worksFiltrees)
})
//*Filtre Hôtels et Restaurants*//
const buttonFilterHotelRestaurant = document.querySelector(
  '.btn_hotel_restaurant'
)
buttonFilterHotelRestaurant.addEventListener('click', function () {
  const worksFiltrees = works.filter(function (works) {
    return works.categoryId === 3
  })
  document.querySelector('.gallery').innerHTML = ''
  generateWorks(worksFiltrees)
})



let loginLink = document.querySelector('.login_link')
function userConnected() {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

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
    loginLink.innerText = 'logout'
  } else {
    loginLink.innerText = 'login'
  }
}

updateLoginLink()

//* Bouton "mofifier"*//
const editButton = document.querySelector('.btn_edit')
const editBanner = document.querySelector('.banner_edition')
const btnFilter = document.querySelector('.filter_btn')

function showEditButton() {
  if (userConnected()) {
    editButton.style.display = 'flex'
    editBanner.style.display = 'flex'
    btnFilter.style.display = 'none'

  } else {
    editButton.style.display = 'none'
    editBanner.style.display = 'none'
    btnFilter.style.display = 'flex'


  }
}

showEditButton()