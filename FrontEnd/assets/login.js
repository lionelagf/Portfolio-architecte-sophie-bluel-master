const loginForm = document.querySelector('.login')
const token = sessionStorage.getItem('token')

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault()

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
      window.sessionStorage.setItem('token', data.token)
      redirectIndex()
    })
    .catch((error) => {
      const errorInfos = document.querySelector('.wrong_informations')
      errorInfos.classList.remove('.none')
    })
})


//* Redirection vers la page d'accueil *//
function redirectIndex() {
  window.location.href = 'index.html'
}

function userConnected() {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}
