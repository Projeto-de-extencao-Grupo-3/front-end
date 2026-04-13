import { Link } from "react-router-dom";
import Layout from "../../../components/Layout/Layout.jsx";
import TabelaVeiculos from "../../../components/Layout/TabelaVeiculos.jsx";
import "./HistoricoVeiculos.css";

function HistoricoVeiculos() {
    
    return (
        <Layout ativo={"clientes"}>
            <div className="header-clientes">
                <div>
                    <h1>Histórico de Veículos</h1>
                    <p>Controle completo de veículos e serviços realizados</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                    <Link to="/clientes" className="add_client btn btn-dark d-flex justify-content-center align-items-center h-100 w-100">
                        Voltar
                    </Link>
                </div>
            </div>
            <TabelaVeiculos />
        </Layout>
    );
}

export default HistoricoVeiculos;