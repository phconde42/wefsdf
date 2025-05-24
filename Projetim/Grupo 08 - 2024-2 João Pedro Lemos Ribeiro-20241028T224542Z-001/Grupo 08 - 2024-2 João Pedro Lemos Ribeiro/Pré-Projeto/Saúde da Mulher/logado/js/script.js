function validarFormulario() {
  // Seleciona o formulário
  const form = document.getElementById('registrationForm');
  // Verifica se o formulário é válido
  if (form.checkValidity()) {
    // Se for válido, redireciona para a URL desejada
    window.location.href = "login-log.html"; // Substitua pela URL desejada
  } else {
    // Se não for válido, exibe os erros de validação do HTML5
    form.reportValidity();
  }
}

// Chama a função validarFormulario() com a página desejada como destino
validarFormulario("index-log.html");

function handleCadastro (event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const cpf = document.getElementById('cpf').value;
  const motherName = document.getElementById('motherName').value;
  const cellphone = document.getElementById('cellphone').value;
  const birthdate = document.getElementById('birthdate').value;
  const maritalStatus = document.getElementById('maritalStatus').value;
  const user = document.getElementById('user').value;
  const address = document.getElementById('address').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  alert('Usuário cadastrado!');
  localStorage.setItem('userRegistered', true);
  window.location.href = 'login-log.html';
}
