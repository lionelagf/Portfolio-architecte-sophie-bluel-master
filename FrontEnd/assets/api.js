async function fetchWorks() {
  const resworks = await fetch('http://localhost:5678/api/works')
  const works = await resworks.json()
  return works
}

async function initModal() {
  const resworks = await fetch('http://localhost:5678/api/works')
  works = await resworks.json()
  generateWorks(works)
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
      if (res.ok) {
        e.target.closest('figure').remove()
        updateGallery(works)
        alert('Projet supprimé avec succès')
      } else {
        alert('Un problème est survenu')
      }
    })
}

//* Création des catégories dans le menu déroulant *//
async function fetchCategory() {
  const response = await fetch('http://localhost:5678/api/categories')
  const data = await response.json()
  categoryForm(data)
  FiltersBtn(data)
}

//* Formulaire d'ajout de nouveaux projets *//
async function modalFormPost(e) {
  e.preventDefault()
  const modalFormData = new FormData()
  modalFormData.append('image', modalFormInput.files[0])
  modalFormData.append('title', modalFormTitle.value)
  modalFormData.append('category', modalFormCategory.value)

  await fetch('http://localhost:5678/api/works/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: modalFormData,
  }).then((res) => {
    if (res.ok) {
      alert('Le projet a bien été rajouté')
      updateGallery(works)
      cleanModalForm()
    } else {
      alert('Un problème est survenu')
    }
  })
}
