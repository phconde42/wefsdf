              function handleCadastro(event) {
                  event.preventDefault();
                  const cpf = document.getElementById('cpf').value;
                  const cellphone = document.getElementById('cellphone').value;
                  const email = document.getElementById('email').value;
                  const password = document.getElementById('password').value;
                  const confirmPassword = document.getElementById('confirmPassword').value;

                  if (!validarCPF(cpf)) {
                      alert('CPF inválido!');
                      return false;
                  }

                  if (!validarCelular(cellphone)) {
                      alert('Celular inválido!');
                      return false;
                  }

                  if (!validarEmail(email)) {
                      alert('E-mail inválido!');
                      return false;
                  }

                  if (password !== confirmPassword) {
                      document.getElementById('passwordError').style.display = 'inline';
                      return false;
                  }

                  alert('Usuário cadastrado!');
                  localStorage.setItem('userRegistered', true);
                  window.location.href = 'login.html';
              }

              // Função para buscar o endereço pelo CEP
              function buscarEndereco() {
                  const cep = document.getElementById('cep').value.replace(/\D/g, '');

                  if (cep.length === 8) {
                      fetch(`https://viacep.com.br/ws/${cep}/json/`)
                          .then(response => response.json())
                          .then(data => {
                              if (!data.erro) {
                                  document.getElementById('rua').value = data.logradouro;
                                  document.getElementById('bairro').value = data.bairro;
                                  document.getElementById('cidade').value = data.localidade;
                                  document.getElementById('uf').value = data.uf;
                              } else {
                                  alert('CEP não encontrado!');
                              }
                          })
                          .catch(() => {
                              alert('Erro ao buscar o CEP. Verifique sua conexão ou tente novamente.');
                          });
                  } else {
                      alert('Formato de CEP inválido!');
                  }
              }

              function mascaraCPF(input) {
                  let value = input.value.replace(/\D/g, "");
                  value = value.replace(/(\d{3})(\d)/, "$1.$2");
                  value = value.replace(/(\d{3})(\d)/, "$1.$2");
                  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                  input.value = value;
              }

              function validarCPF(cpf) {
                  cpf = cpf.replace(/\D/g, '');
                  if (cpf.length !== 11) return false;
                  return true;
              }

              function mascaraCelular(input) {
                  let value = input.value.replace(/\D/g, "");
                  value = value.replace(/(\d{2})(\d)/, "($1) $2");
                  value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");
                  input.value = value;
              }

              function validarCelular(cellphone) {
                  return cellphone.length === 15;
              }

              function validarEmail(email) {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return regex.test(email);
              }

              function validarSenha() {
                  const password = document.getElementById('password').value;
                  const confirmPassword = document.getElementById('confirmPassword').value;
                  const passwordError = document.getElementById('passwordError');

                  if (password !== confirmPassword) {
                      passwordError.style.display = 'inline';
                  } else {
                      passwordError.style.display = 'none';
                  }
              }

