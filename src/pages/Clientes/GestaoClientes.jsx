import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionar from "../../components/ModalClientesFuncionarios/ModalAdicionar.jsx";
import "./GestaoClientes.css";

function GestaoClientes() {
    
    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);

    return (
        <Layout ativo={"clientes"}>
            <div className="header-clientes">
                <div>
                    <h1>Gestão de Clientes</h1>
                    <p>Visão geral dos Clientes</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            aria-label="Filtrar itens"
                        />
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                        Adicionar novo Cliente +
                    </button>
                    <ModalAdicionar isOpen={mostrarModalAdicionar} onClose={() => setMostrarModalAdicionar(false)} />
                </div>
            </div>
            <Tabela></Tabela>
        </Layout>
    );
}

export default GestaoClientes;