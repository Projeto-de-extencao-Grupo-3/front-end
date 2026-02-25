import { useState } from 'react';
import "./TabelaEstoque.css";

function TabelaEstoque() {
    // Exemplo de dados baseados na sua imagem
    const [itens, setItens] = useState([
        { id: '00001', nome: 'Balde Vermelho', quantidade: '20 unid', fornecedor: 'Tubarão de tintas', status: 'Crítico' },
        { id: '00002', nome: 'Massinha', quantidade: '8 unid', fornecedor: 'Tubarão de tintas', status: 'Baixo' },
        { id: '00003', nome: 'Lixa', quantidade: '10 unid', fornecedor: 'Tubarão de tintas', status: 'OK' },
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
                    {itens.map((cliente) => (
                        <tr key={cliente.id} className={cliente.status === 'Critico' ? 'B' : ''}>
                            <td className="px-4">
                                <span className="badge-codigo">{cliente.id}</span>
                            </td>
                            <td className="fw-bold">{cliente.nome}</td>
                            <td>{cliente.quantidade}</td>
                            <td>{cliente.fornecedor}</td>
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