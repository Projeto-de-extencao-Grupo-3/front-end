import { Link, useLocation } from "react-router-dom";
import Layout from "../../../components/Layout/Layout.jsx";
import TabelaVeiculos from "../../../components/Layout/TabelaVeiculosServico.jsx";
import "./HistoricoVeiculos.css";

function HistoricoVeiculosServico() {
    const location = useLocation();
    const { modelo, placa } = location.state || {};

    const tituloH1 = modelo && placa ? `${modelo} - ${placa}` : "Serviço em produção";

    return (
        <Layout ativo={"veiculos"}>
            <div className="header-clientes">
                <div>
                    <h1>Historico de serviços</h1>
                    <h3 class="display-6">{tituloH1}</h3>
                    <p>Controle completo dos serviços</p>
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

export default HistoricoVeiculosServico;