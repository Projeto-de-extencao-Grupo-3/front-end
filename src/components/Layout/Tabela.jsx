import { useNavigate } from "react-router-dom";
import "./Tabela.css";

function Tabela({ clientes, excluirCliente, editarCliente }) {
    const navigate = useNavigate();

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
                        <th>Meios de Contato</th>
                        <th>Endereços</th>
                        <th>Tipo</th>
                        <th>Veículos</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => {
                        const idAtual = cliente.idCliente || cliente.id_cliente || cliente.id;
                        
                        return (
                            <tr key={idAtual}>
                                <td className="px-4">
                                    <span className="badge-codigo">
                                        {String(idAtual).padStart(5, '0')}
                                    </span>
                                </td>
                                <td style={{ maxWidth: '150px' }} className="fw-bold">
                                    {cliente.nome}
                                </td>
                                <td>{formatarCpfCnpj(cliente.cpf_cnpj)}</td>
                                <td>{cliente.meios_contato.length + " Meios"}</td>
                                <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                    {cliente.enderecos.length + " Endereços" || "N/A"}
                                </td>
                                <td>{cliente.tipoCliente || cliente.tipo_cliente}</td> 
                                <td>
                                    <button 
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => navigate(`/clientes/veiculos/${idAtual}`)}
                                        >
                                        <i className='bx bx-car'></i> Ver Veículos
                                    </button>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-3">
                                        <button 
                                            className="btn-acao" 
                                            title="Editar"
                                            onClick={() => editarCliente(cliente)}
                                        >
                                            <i className='bx bx-edit-alt'></i>
                                        </button>
                                        <button 
                                            className="btn-acao btn-excluir" 
                                            title="Excluir"
                                            onClick={() => {
                                                    excluirCliente(cliente);
                                            }}
                                        >
                                            <i className='bx bx-x'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function formatarCpfCnpj(cpfCnpj) {
    if (!cpfCnpj) return "N/A";
    
    const apenasNumeros = cpfCnpj.replace(/\D/g, '');
    if (apenasNumeros.length === 11) {
        return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (apenasNumeros.length === 14) {
        return apenasNumeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return cpfCnpj;
}

export default Tabela;