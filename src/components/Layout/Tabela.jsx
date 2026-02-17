import { useState } from 'react';
import "./Tabela.css";

function Tabela() {
    // Exemplo de dados baseados na sua imagem
    const [clientes, setClientes] = useState([
        { id: '00001', nome: 'João Silva Santos', documento: '123.456.789-00', telefone: '(48) 99999-1111', endereco: 'Rua Felipe Schmidt,', status: 'Ativo' },
        { id: '00002', nome: 'Maria Oliveira', documento: '987.654.321-00', telefone: '(48) 99999-2222', endereco: 'Av. Beira Mar Norte,', status: 'Ativo' },
        { id: '00003', nome: 'Empresa XPTO LTDA', documento: '12.345.678/0001-99', telefone: '(48) 3333-4444', endereco: 'Rua Bocaiúva,', status: 'Inativo' },
    ]);

    return (
        <div className="table-responsive mt-4">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th className="px-4">Código</th>
                        <th>Nome</th>
                        <th>CPF/CNPJ</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
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

export default Tabela;