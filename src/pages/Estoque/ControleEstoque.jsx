import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import TabelaEstoque from "../../components/Layout/TabelaEstoque.jsx";
import "./ControleEstoque.css";
import ModalNovoItem from "../../components/ModalNovoItem/ModalNovoItem.jsx";

function ControleEstoque() {
    
    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);

    return (
        <Layout ativo={"estoque"}>
            <div className="header-clientes">
                <div>
                    <h1>Catálogo de Serviços</h1>
                    <p>Visão geral dos serviços/estoque</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            aria-label="Filtrar itens"
                        />
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                        Adicionar novo item +
                    </button>
                    <ModalNovoItem isOpen={mostrarModalAdicionar} onClose={() => setMostrarModalAdicionar(false)} />
                </div>
            </div>
            <TabelaEstoque />
        </Layout>
    );
}

export default ControleEstoque;