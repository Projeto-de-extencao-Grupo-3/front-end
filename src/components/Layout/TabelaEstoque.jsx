import { useState } from 'react';
import "./Tabela.css";

function TabelaEstoque() {
    // Exemplo de dados baseados na sua imagem
    const [clientes, setClientes] = useState([
        { id: '00001', nome: 'Balde Vermelho', quantidade: '20 unid', fornecedor: 'Tubarão de tintas', status: 'Ativo' },
        { id: '00002', nome: 'Massinha', quantidade: '8 unid', fornecedor: 'Tubarão de tintas', status: 'Ativo' },
        { id: '00003', nome: 'Lixa', quantidade: '10 unid', fornecedor: 'Tubarão de tintas', status: 'Inativo' },
    ]);

    return (
        <div className="table-responsive mt-4">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th className="px-4">Código</th>
                        <th>Nome do Item</th>
                        <th>Quantidade</th>
                        <th>Fornecedor</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id} className={cliente.status === 'Inativo' ? 'linha-inativa' : ''}>
                            <td className="px-4">
                                <span className="badge-codigo">{cliente.id}</span>
                            </td>
                            <td className="fw-bold">{cliente.nome}</td>
                            <td>{cliente.documento}</td>
                            <td>{cliente.telefone}</td>
                            <td className="text-truncate" style={{ maxWidth: '150px' }}>{cliente.endereco}</td>
                            <td className="text-center">
                                <span className={`badge-status ${cliente.status.toLowerCase()}`}>
                                    {cliente.status}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-3">
                                    <button className="btn-acao"><i className='bx bx-edit-alt'></i></button>
                                    <button className="btn-acao"><i className='bx bx-x'></i></button>
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