const listaProdutos = document.querySelector('tbody');

// Função para renderizar os dados na tela principal de listagem
function carregarProdutos() {
    if (!listaProdutos) return;
    listaProdutos.innerHTML = ""; 
    
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtosSalvos.forEach((produto) => {
        const linha = document.createElement("tr");

        const colunaId = document.createElement("td");
        colunaId.textContent = produto.id;

        const colunaNome = document.createElement("td");
        colunaNome.textContent = produto.nome;

        const colunaPreco = document.createElement("td");
        const precoNum = Number(produto.preco) || 0;
        colunaPreco.textContent = "R$ " + precoNum.toFixed(2);

        const colunaCategoria = document.createElement("td");
        colunaCategoria.textContent = produto.categoria;

        const colunaAcoes = document.createElement("td");
        colunaAcoes.classList.add("acoes");

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("botaoEditar");
        botaoEditar.addEventListener("click", () => editarProduto(produto.id));

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("botaoExcluir");
        botaoExcluir.addEventListener("click", () => excluirProduto(produto.id));

        colunaAcoes.append(botaoEditar, botaoExcluir);
        linha.append(
            colunaId,
            colunaNome,
            colunaPreco,
            colunaCategoria,
            colunaAcoes
        );
        listaProdutos.append(linha);
    });
}

function excluirProduto(id) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
}

// MODIFICADO: Agora edita TODAS as colunas do CRUD
function editarProduto(idAntigo) {
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = produtos.find(p => p.id === idAntigo);
    
    if (produto) {
        const novoId = prompt("Modificar ID do Registro:", produto.id);
        const novoNome = prompt("Modificar Nome:", produto.nome);
        const novoPreco = prompt("Modificar Item/Preço (apenas números):", produto.preco);
        const novaCategoria = prompt("Modificar Sexo/Categoria (gay, heterosexual, bisexual, bolsonaro):", produto.categoria);
        
        // Verifica se o usuário não cancelou nenhum prompt
        if (novoId !== null && novoNome !== null && novoPreco !== null && novaCategoria !== null) {
            
            // Valida se o novo ID já existe em outro produto (evita IDs duplicados)
            const idDigitado = Number(novoId) || produto.id;
            const idJaExiste = produtos.some(p => p.id === idDigitado && p.id !== idAntigo);
            
            if (idJaExiste) {
                alert("Erro: Este ID já está sendo usado por outro registro!");
                return;
            }

            // Atualiza absolutamente todas as colunas
            produto.id = idDigitado;
            produto.nome = novoNome.trim() || produto.nome;
            produto.preco = Number(novoPreco) || produto.preco;
            produto.categoria = novaCategoria.trim() || produto.categoria;
            
            localStorage.setItem("produtos", JSON.stringify(produtos));
            carregarProdutos(); // Recarrega a tabela principal
        }
    }
}

// Inicializa a tabela ao carregar a página index
carregarProdutos();
