const loginForm = document.querySelector('.login')
const token = localStorage.getItem('token')

loginForm.addEventListener('submit', async function (event) {
  event.preventDefault()

  const email = document.getElementById('email')
  const password = document.getElementById('password')
  const user = {
    email: email.value,
    password: password.value,
  }
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((data) => {
      window.localStorage.setItem('token', data.token)
      redirectIndex()
    })
    .catch((error) => {
      console.log(error)
      alert('Identifiant ou mot de passe incorrect.')
    })
})

//* Redirection vers la page d'accueil *//
function redirectIndex() {
  window.location.href = 'index.html'
}

function userConnected() {
  const token = window.localStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}
