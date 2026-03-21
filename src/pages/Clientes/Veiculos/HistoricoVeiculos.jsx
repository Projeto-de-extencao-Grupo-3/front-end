import { Link } from "react-router-dom";
import Layout from "../../../components/Layout/Layout.jsx";
import TabelaVeiculos from "../../../components/Layout/TabelaVeiculos.jsx";

function HistoricoVeiculos() {
    return (
        <Layout ativo={"veiculos"}>
            <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 className="fw-bold mb-1" style={{ color: '#1b2a45' }}>Veículos cadastrados</h1>
                    <p className="text-secondary mb-0">Controle completo de veículos cadastrados</p>
                </div>
                <Link to="/clientes" className="btn btn-dark px-4">
                    Voltar
                </Link>
            </div>
            <TabelaVeiculos />
        </Layout>
    );
}

export default HistoricoVeiculos;