const resworks = await fetch('http://localhost:5678/api/works')
const works = await resworks.json()

const rescategories = await fetch('http://localhost:5678/api/categories')
const categories = await rescategories.json()

const token = sessionStorage.getItem('token')

///////////////////////////////////////////
////////////////* Modal 1 *////////////////
///////////////////////////////////////////

//* Création des éléments qui constitue le modale 1 *//
function modalElement() {
  const modalWrapper = document.querySelector('.modal_wrapper')
  //* Création du titre du modale 1 *//
  const modalTitle = document.createElement('p')
  modalTitle.classList.add('modal_title')
  modalTitle.innerText = 'Galerie photo'
  //* Création de la partie qui reçois les travaux *//
  const sectionGallery = document.createElement('div')
  sectionGallery.classList.add('modal_gallery')
  //* Création de la ligne qui sépare les travaux du bouton d'ajout *//
  const modalDash = document.createElement('div')
  modalDash.setAttribute('class', 'modal_dash')
  //* Création du bouton d'ajout de photo *//
  const modalAddButton = document.createElement('input')
  modalAddButton.id = 'modal_add_button'
  modalAddButton.type = 'submit'
  modalAddButton.value = 'Ajouter une photo'
  modalWrapper.appendChild(modalTitle)
  modalWrapper.appendChild(sectionGallery)
  modalWrapper.appendChild(modalDash)
  modalWrapper.appendChild(modalAddButton)
  appendModalCloseButton(modalWrapper)
}

function appendModalCloseButton(modal) {
  //* Création du bouton de fermeture du modale *//
  const modalCloseButton = document.createElement('button')
  modalCloseButton.classList.add('js_modal', 'close_button')
  modalCloseButton.addEventListener('click', toggleModal)
  const modalCloseButtonFa = document.createElement('i')
  modalCloseButtonFa.classList.add('fa-solid', 'fa-xmark', 'fa-xl')
  modalCloseButton.appendChild(modalCloseButtonFa)
  modal.appendChild(modalCloseButton)
}

//* Ouverture et fermeture modale 1 *//
const modal = document.querySelector('.modal')
const triggers = document.querySelectorAll('.js_modal')

function toggleModal() {
  modal.classList.toggle('show_modal')
  modal.removeAttribute('aria-hidden', 'false')
  modal.setAttribute('aria-modal', 'true')
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal()
    document.querySelector('.modal_wrapper').style.display = 'flex'
    document.querySelector('.modal_wrapper2').style.display = 'none'
  }
}
triggers.forEach((trigger) => trigger.addEventListener('click', toggleModal))
window.addEventListener('click', windowOnClick)

//* Importation des projets depuis l'API *//
async function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i]
    const sectionGallery = document.querySelector('.modal_gallery')
    const worksElement = document.createElement('figure')
    worksElement.setAttribute('class', 'figure')
    const imageElement = document.createElement('img')
    imageElement.src = project.imageUrl

    //* Création des icones trash *//
    const trashContainer = document.createElement('button')
    trashContainer.setAttribute('class', 'trashContainer')
    trashContainer.addEventListener('click', deleteWork)
    const trashElement = document.createElement('i')
    trashElement.classList.add('fa-solid', 'fa-trash-can')
    trashElement.setAttribute('data-id', project.id)

    sectionGallery.appendChild(worksElement)
    worksElement.appendChild(imageElement)

    worksElement.appendChild(trashContainer)
    trashContainer.appendChild(trashElement)
  }
}

//* Supression travaux *//
async function deleteWork(e) {
  e.preventDefault()
  const idWork = e.target.dataset.id

  if (confirm('Voulez-vous vraiment supprimer cette image ?'))

  await fetch('http://localhost:5678/api/works/' + idWork, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 204) {
      e.target.closest('figure').remove()
          }
     
  })
}
modalElement()

generateWorks(works)
///////////////////////////////////////////
////////////////* Modal 2 *////////////////
///////////////////////////////////////////

const modalAddButton = document.getElementById('modal_add_button')
modalAddButton.addEventListener('click', function () {
  document.querySelector('.modal_wrapper').style.display = 'none'
  document.querySelector('.modal_wrapper2').style.display = 'flex'
})

const modalWrapper = document.querySelector('.modal_wrapper2')
//* Création du titre du modale 2 *//
const modalTitle = document.createElement('p')
modalTitle.setAttribute('class', 'modal_title')
modalTitle.innerText = 'Ajout photo'

appendModalCloseButton(modalWrapper)

//* Création de la flèche retour *//
const modalBackButton = document.createElement('button')
modalBackButton.setAttribute('class', 'back_button')
const modalBackButtonFa = document.createElement('i')
modalBackButtonFa.classList.add('fa-solid', 'fa-arrow-left', 'fa-xl')
modalBackButton.addEventListener('click', function () {
  document.querySelector('.modal_wrapper').style.display = 'flex'
  document.querySelector('.modal_wrapper2').style.display = 'none'
})

//* Création du form de téléchargement des projets *//
const modalFormProject = document.createElement('form')
modalFormProject.setAttribute('id', 'form_modal2')

/////////
const modalImageContainer = document.createElement('div')
modalImageContainer.setAttribute('class', 'modal_form')
modalFormProject.appendChild(modalImageContainer)
//* Création de l'image du form *//
const modalFormFa = document.createElement('i')
modalFormFa.classList.add('fa-regular', 'fa-image')
//* Bouton 'Ajouter photo' *//
const modalFormInput = document.createElement('input')
modalFormInput.type = 'file'
modalFormInput.id = 'image'
modalFormInput.name = 'image'
modalFormInput.accept = '.png, .jpg'
modalFormInput.innerText = 'ajouter une photo'
modalFormInput.style.display = 'none'
modalImageContainer.appendChild(modalFormInput)

const modalFormBtn = document.createElement('button')
modalFormBtn.id = 'modal_form_btn'
modalFormBtn.type = 'button'
modalFormBtn.innerText = '+ Ajouter photo'

const imagePreview = document.createElement('img')
imagePreview.classList.add('image_preview')
modalImageContainer.appendChild(imagePreview)

modalFormBtn.addEventListener('click', function (e) {
   e.preventDefault()
  modalFormInput.click()
})

//* Texte des fichiers acceptés *//
const modalFormTxt = document.createElement('span')
modalFormTxt.innerText = 'jpg, png : 4mo max'
/////////

modalFormInput.addEventListener('change', function (e) {
   e.preventDefault()
  const selectedFile = modalFormInput.files[0]
  if (selectedFile) {
    imagePreview.src = URL.createObjectURL(selectedFile)
    modalFormFa.style.display = 'none'
    modalFormInput.style.display = 'none'
    modalFormBtn.style.display = 'none'
    modalFormTxt.style.display = 'none'
  }
})

const modalFormLabelTitle = document.createElement('label')
modalFormLabelTitle.setAttribute('for', 'titre')
modalFormLabelTitle.innerText = 'Titre'
const modalFormTitle = document.createElement('input')
modalFormTitle.type = 'text'
modalFormTitle.name = 'titre'
modalFormTitle.id = 'titre'
modalFormTitle.addEventListener('input', checkFormCompletion)

const modalFormLabelCategory = document.createElement('label')
modalFormLabelCategory.setAttribute('for', 'categoryList')
modalFormLabelCategory.innerText = 'Catégorie'
const modalFormCategory = document.createElement('select')
modalFormCategory.name = 'category'
modalFormCategory.id = 'categoryList'
modalFormCategory.addEventListener('change', checkFormCompletion)

//* Création de la ligne qui sépare les travaux du bouton d'ajout *//
const modalDash = document.createElement('div')
modalDash.setAttribute('class', 'modal_dash')
//* Création du bouton d'ajout de photo *//

const modalValidateButton = document.createElement('input')
modalValidateButton.id = 'modal_add_button'
modalValidateButton.type = 'submit'
modalValidateButton.value = 'Valider'
modalValidateButton.setAttribute('disabled', 'true')
modalValidateButton.addEventListener('click', modalFormPost)

// Ajout d'un écouteur d'événements sur le formulaire pour vérifier son état
function checkFormCompletion(e) {
   e.preventDefault()
  //* On vérifie si le formulaire est complètement rempli *//
  const isImageSelected = modalFormInput.files.length > 0
  const isTitleFilled = modalFormTitle.value.trim() !== ''
  const isCategorySelected = modalFormCategory.value !== ''

  if (isImageSelected && isTitleFilled && isCategorySelected) {
    modalValidateButton.disabled = false
  } else {
    modalValidateButton.disabled = true
  }
}

async function modalFormPost(e) {
  e.preventDefault()
const modalFormData = new FormData()
modalFormData.append('image', modalFormInput.files[0])
modalFormData.append('title', modalFormTitle.value)
modalFormData.append('category', modalFormCategory.value)
console.log(modalFormData)

 await fetch('http://localhost:5678/api/works/', {
   method: 'POST',
   headers: {
     Authorization: `Bearer ${token}`,
   },
   body: modalFormData,
 }).then((response) => response.json())

}

modalWrapper.appendChild(modalTitle)
modalWrapper.appendChild(modalBackButton)
modalWrapper.appendChild(modalFormProject)
modalImageContainer.appendChild(modalFormFa)
modalImageContainer.appendChild(modalFormBtn)
modalImageContainer.appendChild(modalFormTxt)
modalBackButton.appendChild(modalBackButtonFa)
modalFormProject.appendChild(modalFormLabelTitle)
modalFormProject.appendChild(modalFormTitle)
modalFormProject.appendChild(modalFormLabelCategory)
modalFormProject.appendChild(modalFormCategory)
modalFormProject.appendChild(modalDash)
modalFormProject.appendChild(modalValidateButton)

//* Création des catégories dans le menu déroulant *//
async function fetchCategory() {
  const response = await fetch('http://localhost:5678/api/categories')
  const data = await response.json()

  const categorySelect = document.getElementById('categoryList')
  data.forEach((category) => {
    const option = document.createElement('option')
    option.value = category.id
    option.text = category.name
    categorySelect.appendChild(option)
  })
}
fetchCategory()
