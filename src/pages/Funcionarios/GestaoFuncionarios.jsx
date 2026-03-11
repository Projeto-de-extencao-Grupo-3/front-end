import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionarFuncionario from "../../components/ModalClientesFuncionarios/ModalAdicionarFuncionario.jsx";
import "./GestaoFuncionarios.css";
import TabelaFuncionarios from "../../components/Layout/TabelaFuncionarios.jsx";
import Funcionarios from "../../service/Funcionarios.js";

function GestaoFuncionarios() {
    const { funcionarios, _loading, excluirFuncionario, adicionarFuncionario } = Funcionarios();
    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    
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
                    <button className="add_funcionario btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                        Adicionar novo Funcionário +
                    </button>
                    <ModalAdicionarFuncionario isOpen={mostrarModalAdicionar} onClose={() => setMostrarModalAdicionar(false)} onSave={adicionarFuncionario} />
                </div>
            </div>
            <TabelaFuncionarios funcionarios={funcionarios} excluirFuncionario={excluirFuncionario} />
        </Layout >
    );
}

export default GestaoFuncionarios;