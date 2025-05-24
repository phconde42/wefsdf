document.addEventListener("DOMContentLoaded", () => {
  updateAuthStatus();
});

function updateAuthStatus() {
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const loginLink = document.getElementById('loginLink');
  const cadastroLink = document.getElementById('cadastroLink');
  const logoutLink = document.getElementById('logoutLink');

  if (userLoggedIn) {
    if (loginLink) loginLink.classList.add('hidden');
    if (cadastroLink) cadastroLink.classList.add('hidden');
    if (logoutLink) logoutLink.classList.remove('hidden');
  } else {
    if (loginLink) loginLink.classList.remove('hidden');
    if (cadastroLink) cadastroLink.classList.remove('hidden');
    if (logoutLink) logoutLink.classList.add('hidden');
  }
}

function logout() {
  localStorage.removeItem('userLoggedIn');
  alert('Usuário deslogado!');
  updateAuthStatus();
  window.location.href = 'login-log.html';
}

