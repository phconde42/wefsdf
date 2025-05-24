<?php
$servername = "localhost";
$username = "root";  // O nome de usuário padrão do XAMPP é 'root'
$password = "";      // A senha padrão é vazia
$dbname = "ssm";

// Cria uma conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
