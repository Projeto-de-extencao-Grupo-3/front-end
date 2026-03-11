import "./Tabela.css";

function Tabela({ clientes, excluirCliente }) {
    
    if (!clientes || clientes.length === 0) {
        return (
            <div className="text-center mt-5">
                <p className="text-muted">Nenhum cliente encontrado.</p>
            </div>
        );
    }

    return (
        <div className="table-responsive mt-4">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th className="px-4">Código</th>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Tipo</th> {/* Coluna de Tipo */}
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id_cliente}>
                            <td className="px-4">
                                <span className="badge-codigo">
                                    {String(cliente.id_cliente).padStart(5, '0')}
                                </span>
                            </td>
                            <td className="fw-bold">{cliente.nome}</td>
                            <td>{cliente.cpf_cnpj || cliente.documento}</td>
                            <td>{cliente.telefone}</td>
                            <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                {cliente.email || "N/A"}
                            </td>
                            <td>{cliente.tipo_cliente}</td> 
                            
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn-acao" title="Editar">
                                        <i className='bx bx-edit-alt'></i>
                                    </button>
                                    <button 
                                        className="btn-acao btn-excluir" 
                                        title="Excluir"
                                        onClick={() => {
                                            if(window.confirm("Tem certeza que deseja excluir este cliente?")) {
                                                excluirCliente(cliente.idCliente || cliente.id_cliente);
                                            }
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

export default Tabela;