
        const produtosDisponiveis = [
            { id: 1, nome: 'Camiseta', valor: 29.99 },
            { id: 2, nome: 'Calça Jeans', valor: 99.90 },
            { id: 3, nome: 'Tênis', valor: 149.90 }
        ];

       
        function exibirProdutosDisponiveis() {
            const listaProdutosDisponiveis = document.getElementById('lista-produtos-disponiveis');
            produtosDisponiveis.forEach(produto => {
                const li = document.createElement('li');
                li.innerHTML = `${produto.nome} - Valor: R$ ${produto.valor.toFixed(2)}`;
                listaProdutosDisponiveis.appendChild(li);
            });
        }

      
        function buscarProduto() {
            const nomeProduto = document.getElementById('nome-produto').value.trim().toLowerCase();

            const produtoEncontrado = produtosDisponiveis.find(produto => produto.nome.toLowerCase() === nomeProduto);

            if (produtoEncontrado) {
                adicionarProduto(produtoEncontrado.id, produtoEncontrado.nome, produtoEncontrado.valor, 1);
            } else {
                alert('Produto não encontrado.');
            }
        }

      
        function adicionarProduto(id, nome, valor, quantidade) {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

            const produtoExistente = carrinho.find(produto => produto.id === id);

            if (produtoExistente) {
                produtoExistente.quantidade += quantidade;
            } else {
                carrinho.push({ id, nome, valor, quantidade });
            }

            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            exibirCarrinho();
        }


        function removerProduto(id) {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho = carrinho.filter(produto => produto.id !== id);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            exibirCarrinho();
        }

       
        function exibirCarrinho() {
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            const listaProdutos = document.getElementById('lista-produtos');
            listaProdutos.innerHTML = '';

            if (carrinho.length > 0) {
                carrinho.forEach(produto => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}
                        <button onclick="removerProduto(${produto.id})">Remover</button>
                    `;
                    listaProdutos.appendChild(li);
                });
            } else {
                listaProdutos.innerHTML = 'O carrinho está vazio!';
            }
        }

   
        exibirProdutosDisponiveis();
        exibirCarrinho();