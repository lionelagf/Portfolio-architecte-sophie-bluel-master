initModal()
///////////////////////////////////////////////////
////////////////////* Modale 1 *///////////////////
///////////////////////////////////////////////////

//* Création des éléments qui constitue le modale 1 *//
function modalElement() {
  const modalWrapper = document.querySelector('.modal_wrapper')
  appendModalCloseButton(modalWrapper)
  //* Création du titre du modale 1 *//
  const modalTitle = document.createElement('p')
  modalTitle.classList.add('modal_title')
  modalTitle.textContent = 'Galerie photo'
  modalWrapper.appendChild(modalTitle)
  //* Création de la partie qui reçois les travaux *//
  const sectionGallery = document.createElement('div')
  sectionGallery.classList.add('modal_gallery')
  modalWrapper.appendChild(sectionGallery)
  createModalDash(modalWrapper)
  //* Création du bouton d'ajout de photo *//
  const modalAddButton = document.createElement('input')
  modalAddButton.id = 'modal_add_button'
  modalAddButton.type = 'submit'
  modalAddButton.value = 'Ajouter une photo'
  modalAddButton.addEventListener('click', changeModalBtn)
  modalWrapper.appendChild(modalAddButton)
}

function appendModalCloseButton(modal) {
  //* Création du bouton de fermeture du modale *//
  const modalCloseButton = document.createElement('button')
  modalCloseButton.classList.add('js_modal', 'close_button')
  modalCloseButton.addEventListener('click', closeModalBtn)
  const modalCloseButtonFa = document.createElement('i')
  modalCloseButtonFa.classList.add('fa-solid', 'fa-xmark', 'fa-xl')
  modalCloseButton.appendChild(modalCloseButtonFa)
  modal.appendChild(modalCloseButton)
}
//* Création de la ligne de séparation des modales *//
function createModalDash(dash) {
  const modalDash = document.createElement('div')
  modalDash.setAttribute('class', 'modal_dash')
  dash.appendChild(modalDash)
}
//* Ouverture et fermeture modale *//
function toggleModal() {
  const modal = document.querySelector('.modal')
  document.querySelector('.modal_wrapper').classList.toggle('none')
  modal.classList.toggle('show_modal')
  if (modal.classList.contains('show_modal')) {
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('aria-modal', 'true')
  } else  {
    modal.setAttribute('aria-hidden', 'true')
    modal.setAttribute('aria-modal', 'false')
  }
}
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal()
    document.querySelector('.modal_wrapper').classList.add('none')
    document.querySelector('.modal_wrapper2').classList.add('none')
  }
}

const triggers = document.querySelectorAll('.js_modal')
triggers.forEach((trigger) => trigger.addEventListener('click', toggleModal))
window.addEventListener('click', windowOnClick)

//* Importation des projets depuis l'API *//
async function generateWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const project = works[i]
    const sectionGallery = document.querySelector('.modal_gallery')
    const worksElement = document.createElement('figure')
    worksElement.setAttribute('class', 'figure')
    sectionGallery.appendChild(worksElement)
    const imageElement = document.createElement('img')
    imageElement.src = project.imageUrl
    worksElement.appendChild(imageElement)
    //* Création des icones trash *//
    const trashContainer = document.createElement('button')
    trashContainer.setAttribute('class', 'trashContainer')
    trashContainer.addEventListener('click', deleteWork)
    worksElement.appendChild(trashContainer)
    const trashElement = document.createElement('i')
    trashElement.classList.add('fa-solid', 'fa-trash-can')
    trashElement.setAttribute('data-id', project.id)
    trashContainer.appendChild(trashElement)
  }
}

async function updateGallery(works) {
  const gallery = document.querySelector('.gallery')
  gallery.textContent = ''
  initGallery()
}

modalElement()

function changeModalBtn() {
  //* Bouton Ajout photo du modale 2 *//
  document.querySelector('.modal_wrapper').classList.toggle('none')
  document.querySelector('.modal_wrapper2').classList.toggle('none')
}
///////////////////////////////////////////////////
////////////////////* Modale 2 *///////////////////
///////////////////////////////////////////////////
function modalElement2() {}
const modalWrapper2 = document.querySelector('.modal_wrapper2')
//* Création du titre du modale 2 *//
const modalTitle = document.createElement('p')
modalTitle.setAttribute('class', 'modal_title')
modalTitle.textContent = 'Ajout photo'
modalWrapper2.appendChild(modalTitle)
appendModalCloseButton(modalWrapper2)
//* Création de la flèche retour *//
const modalBackButton = document.createElement('button')
modalBackButton.setAttribute('class', 'back_button')
modalWrapper2.appendChild(modalBackButton)
const modalBackButtonFa = document.createElement('i')
modalBackButtonFa.classList.add('fa-solid', 'fa-arrow-left', 'fa-xl')
modalBackButton.appendChild(modalBackButtonFa)
modalBackButton.addEventListener('click', function () {
  document.querySelector('.modal_wrapper').classList.toggle('none')
  document.querySelector('.modal_wrapper2').classList.toggle('none')
})

//* Form de téléchargement des projets *//
const modalFormProject = document.createElement('form')
modalFormProject.setAttribute('id', 'form_modal2')
modalWrapper2.appendChild(modalFormProject)
// à séparer ici //


//* Div contenant l'upload d'image *//
const modalImageContainer = document.createElement('div')
modalImageContainer.setAttribute('class', 'modal_form')
modalFormProject.appendChild(modalImageContainer)
//* Création de l'image du form *//
const modalFormFa = document.createElement('i')
modalFormFa.classList.add('fa-regular', 'fa-image')
modalImageContainer.appendChild(modalFormFa)
//* Bouton 'Ajouter photo' *//
const modalFormInput = document.createElement('input')
modalFormInput.type = 'file'
modalFormInput.id = 'image'
modalFormInput.name = 'image'
modalFormInput.accept = '.png, .jpg'
modalFormInput.textContent = 'ajouter une photo'
modalFormInput.classList.add('none')
modalImageContainer.appendChild(modalFormInput)
//* Bouton d'ajout d'image *//
const modalFormBtn = document.createElement('button')
modalFormBtn.id = 'modal_form_btn'
modalFormBtn.type = 'button'
modalFormBtn.textContent = '+ Ajouter photo'
modalImageContainer.appendChild(modalFormBtn)
modalFormBtn.addEventListener('click', function (e) {
  e.preventDefault()
  modalFormInput.click()
})
//* Preview de l'image chargée *//
const imagePreview = document.createElement('img')
imagePreview.classList.add('image_preview')
modalImageContainer.appendChild(imagePreview)
imagePreview.addEventListener('click', function (e) {
  e.preventDefault()
  modalFormInput.click()
})
//* Texte des fichiers acceptés *//
const modalFormTxt = document.createElement('span')
modalFormTxt.textContent = 'jpg, png : 4mo max'
modalImageContainer.appendChild(modalFormTxt)
//* Ecoute de l'ajout de la preview *//
modalFormInput.addEventListener('change', function (e) {
  e.preventDefault()
  const selectedFile = modalFormInput.files[0]
  if (selectedFile) {
    imagePreview.src = URL.createObjectURL(selectedFile)
    modalFormFa.classList.add('none')
    modalFormInput.classList.add('none')
    modalFormBtn.classList.add('none')
    modalFormTxt.classList.add('none')
  }
})

const modalFormLabelTitle = document.createElement('label')
modalFormLabelTitle.setAttribute('for', 'titre')
modalFormLabelTitle.textContent = 'Titre'
modalFormProject.appendChild(modalFormLabelTitle)
const modalFormTitle = document.createElement('input')
modalFormTitle.type = 'text'
modalFormTitle.name = 'titre'
modalFormTitle.id = 'titre'
modalFormTitle.addEventListener('input', checkFormCompletion)
modalFormProject.appendChild(modalFormTitle)

const modalFormLabelCategory = document.createElement('label')
modalFormLabelCategory.setAttribute('for', 'categoryList')
modalFormLabelCategory.textContent = 'Catégorie'
modalFormProject.appendChild(modalFormLabelCategory)
const modalFormCategory = document.createElement('select')
modalFormCategory.name = 'category'
modalFormCategory.id = 'categoryList'
modalFormProject.appendChild(modalFormCategory)
modalFormCategory.addEventListener('change', checkFormCompletion)
createModalDash(modalFormProject)
//* Création du bouton d'ajout de photo *//
const modalValidateButton = document.createElement('input')
modalValidateButton.id = 'modal_add_button'
modalValidateButton.type = 'submit'
modalValidateButton.value = 'Valider'
modalValidateButton.setAttribute('disabled', 'true')
modalFormProject.appendChild(modalValidateButton)
modalValidateButton.addEventListener('click', modalFormPost)

//* Ajout d'un écouteur d'événements sur le formulaire pour vérifier son état *//
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

function categoryForm(data) {
  const categorySelect = document.getElementById('categoryList')
  const nullOption = document.createElement('option')
  nullOption.value = ''
  categorySelect.appendChild(nullOption)
  data.forEach((category) => {
    const option = document.createElement('option')
    option.value = category.id
    option.text = category.name
    categorySelect.appendChild(option)
  })
}
fetchCategory()

//* Remise à zéro du formulaire d'ajout de projet *//
function cleanModalForm() {
  imagePreview.src = ''
  modalFormFa.classList.remove('none')
  modalFormBtn.classList.remove('none')
  modalFormTxt.classList.remove('none')
  modalFormTitle.value = ''
  modalFormCategory.value = ''
  modalValidateButton.setAttribute('disabled', 'true')
}
//* Fermeture des fenêtres modale *//
function closeModalBtn() {
  toggleModal()
  const modalElement = document.querySelector('.modal_wrapper')
  modalElement.classList.add('none')
  modalWrapper2.classList.add('none')
}
