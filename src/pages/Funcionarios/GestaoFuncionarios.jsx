import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import "./GestaoFuncionarios.css";

function GestaoFuncionarios() {
    return (
        <Layout ativo={"funcionarios"}>
            <div className="header-funcionarios">
                <div>
                    <h1>Gestão de Funcionários</h1>
                    <p>Visão geral dos Funcionários</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            aria-label="Filtrar itens"
                        />
                    <button className="add_funcionario btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalEntrada(true)}>
                        Adicionar novo Funcionário +
                    </button>
                </div>
            </div>
            <Tabela></Tabela>
        </Layout >
    );
}

export default GestaoFuncionarios;