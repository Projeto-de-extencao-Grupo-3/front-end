import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import "./GestaoClientes.css";

function GestaoClientes() {
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
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalEntrada(true)}>
                        Adicionar novo Cliente +
                    </button>
                </div>
            </div>
            <Tabela></Tabela>
        </Layout>
    );
}

export default GestaoClientes;