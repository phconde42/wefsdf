<?php include 'db_connect.php'; ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciar Pessoa</title>
</head>
<body>
    <h1>Salvar, Localizar e Editar Pessoa</h1>

    <?php
    // Inicializa as variáveis
    $idPessoa = 0;
    $nomeAtual = '';
    $idadeAtual = '';

    // Ação para salvar ou atualizar
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Salvando ou atualizando registro
        if (isset($_POST['salvar'])) {
            // Se a pessoa não foi localizada (novo registro)
            if ($_POST['id'] == 0) {
                // Insere novo registro
                $nome = $_POST['nome'];
                $idade = $_POST['idade'];

                $sql = "INSERT INTO tabclientes (nome, idade) VALUES ('$nome', $idade)";
                if ($conn->query($sql) === TRUE) {
                    echo "Novo registro salvo com sucesso!";
                } else {
                    echo "Erro ao salvar: " . $conn->error;
                }
            } else {
                //Atualiza registro existente
                $idPessoa = $_POST['id'];
                $novoNome = $_POST['nome'];
                $novaIdade = $_POST['idade'];

                $sqlUpdate = "UPDATE tabclientes SET nome = '$novoNome', idade = $novaIdade WHERE id = $idPessoa";
                if ($conn->query($sqlUpdate) === TRUE) {
                    echo "Registro atualizado com sucesso!";
                } else {
                    echo "Erro ao atualizar: " . $conn->error;
                }
            }
        }

        // Localizar registro
        if (isset($_POST['buscar'])) {
            $nomeBusca = $_POST['nomeBusca'];

            // Prepara a SQL de busca
            $sqlBusca = "SELECT * FROM tabclientes WHERE nome = '$nomeBusca'";
            $resultado = $conn->query($sqlBusca);

            if ($resultado->num_rows > 0) {
                // Se encontrar resultados, preenche o formulário para edição
                while($row = $resultado->fetch_assoc()) {
                    $idPessoa = $row["id"];
                    $nomeAtual = $row["nome"];
                    $idadeAtual = $row["idade"];
                }
            } else {
                echo "Nenhuma pessoa encontrada com o nome $nomeBusca.";
            }
        }
        if (isset($_POST['deletar'])) {
            if ($_POST['id'] > 0) {
                $idPessoa = $_POST['id'];
    
                $sqlDelete = "DELETE FROM tabclientes WHERE id = $idPessoa";
                if ($conn->query($sqlDelete) === TRUE) {
                    echo "Registro deletado com sucesso!";
                    // Limpa os dados após a exclusão
                    $idPessoa = 0;
                    $nomeAtual = '';
                    $idadeAtual = '';
                } else {
                    echo "Erro ao deletar: " . $conn->error;
                }
            } else {
                echo "Nenhum registro selecionado para deletar.";
            }
        }
    }
        

    ?>

    <!-- Formulário único para salvar ou editar pessoa -->
    <form action="index.php" method="post">
        <!-- Se ID for 0, é um novo registro; caso contrário, será editado -->
        <input type="hidden" name="id" value="<?php echo $idPessoa; ?>">

        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value="<?php echo $nomeAtual; ?>" required><br><br>

        <label for="idade">Idade:</label>
        <input type="number" id="idade" name="idade" value="<?php echo $idadeAtual; ?>" required><br><br>

        <input type="submit" name="salvar" value="<?php echo ($idPessoa > 0) ? 'Atualizar' : 'Salvar'; ?>">
        <?php if ($idPessoa > 0): ?>
            <input type="submit" name="deletar" value="deletar">
        <?php endif; ?>    
    </form>

    <h1>Localizar Pessoa</h1>

    <!-- Formulário para buscar pessoa pelo nome -->
    <form action="index.php" method="post">
        <label for="nomeBusca">Nome para buscar:</label>
        <input type="text" id="nomeBusca" name="nomeBusca" ><br><br>
        
        <input type="submit" name="buscar" value="Buscar">
    </form>
</body>

</html>