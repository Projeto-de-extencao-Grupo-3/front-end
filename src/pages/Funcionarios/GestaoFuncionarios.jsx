import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionar from "../../components/ModalClientesFuncionarios/ModalAdicionar.jsx";
import "./GestaoFuncionarios.css";

function GestaoFuncionarios() {

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
                    <ModalAdicionar isOpen={mostrarModalAdicionar} onClose={() => setMostrarModalAdicionar(false)} />
                </div>
            </div>
            <Tabela></Tabela>
        </Layout >
    );
}

export default GestaoFuncionarios;