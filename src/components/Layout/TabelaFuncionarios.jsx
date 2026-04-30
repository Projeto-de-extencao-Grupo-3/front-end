import "./Tabela.css";
import { formatarTexto,formatarTelefone } from "../../utils/formatarTexto.js";


function TabelaFuncionarios({ funcionarios, excluirFuncionario, editarFuncionario }) {

    if (!funcionarios || funcionarios.length === 0) {
        return (
            <div className="text-center mt-5">
                <p className="text-muted">Nenhum cliente encontrado.</p>
            </div>
        );
    }
    console.log("Dados Funcionários: ", funcionarios)
    return (
        <div className="table-responsive mt-4">
            <table className="table table-custom">
                <thead>
                    <tr>
                        <th className="px-4">Código</th>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>Especialidade</th>
                        <th>Telefone</th>
                        <th className="text-center">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((funcionario) =>
                    (

                        <tr key={funcionario.id_funcionario}>
                            <td className="px-4">
                                <span className="badge-codigo">
                                    {String(funcionario.id_funcionario).padStart(5, '0')}
                                </span>
                            </td>
                            <td className="fw-bold">{formatarTexto(funcionario.nome)}</td>
                            <td>{formatarTexto(funcionario.cargo)}</td>
                            <td>{formatarTexto(funcionario.especialidade)}</td>
                            <td>{formatarTelefone(funcionario.telefone)}</td>
                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-3">
                                    <button
                                        className="btn-acao"
                                        title="Editar"
                                        onClick={() => {
                                            editarFuncionario(funcionario); 
                                        }}                                    >
                                        <i className='bx bx-edit-alt'></i>
                                    </button>
                                    <button
                                        className="btn-acao btn-excluir"
                                        title="Excluir"
                                        onClick={() => {
                                                excluirFuncionario(funcionario);
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

export default TabelaFuncionarios;