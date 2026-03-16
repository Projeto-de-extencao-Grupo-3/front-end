import "./TabelaEstoque.css";

function TabelaEstoque({ produtos, excluirProdutos, editarProdutos }) {

    if (!produtos || produtos.length === 0) {
        return (
            <div className="text-center mt-5">
                <p className="text-muted">Nenhum produto encontrado.</p>
            </div>
        );
    }

    console.log("Dados Produtos: ", produtos)
    return (
        <div className="table-responsive mt-4">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th className="px-4">Código</th>
                        <th>Nome do Item</th>
                        <th>Quantidade</th>
                        <th>Fornecedor</th>
                        <th>Preço a compra</th>
                        <th>Preço a venda</th>
                        <th>Tipo de Serviço</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id_peca}>
                            <td className="px-4">
                                <span className="badge-codigo">{produto.id_peca}</span>
                            </td>
                            <td className="fw-bold">{produto.nome}</td>
                            <td>{produto.quantidade_estoque}</td>
                            <td>{produto.fornecedor_nf}</td>
                            <td>R${produto.preco_compra}</td>
                            <td>R${produto.preco_venda}</td>
                            <td>{produto.tipo_servico}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        className="btn-acao"
                                        title='Editar'
                                        onClick={() => {
                                            editarProdutos(produto)
                                        }}>
                                        <i className='bx bx-edit-alt'></i>
                                    </button>
                                    <button
                                        className="btn-acao"
                                        title='Excluir'
                                        onClick={() => {
                                                excluirProdutos(produto);
                                        }}
                                    >
                                        <i className='bx bx-x'></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaEstoque;