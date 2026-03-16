import Layout from "../../components/Layout/Layout.jsx";
import "./HistoricoServicos.css";

function HistoricoVeiculos(){
   return (
        <Layout ativo={"servicos"}>
            <div className="header-servicos">
                <div>
                    <h1>Histórico de Veículos</h1>
                    <p>Visão geral dos veículos</p>
                </div>
            </div>
        </Layout>
    );
}

export default HistoricoVeiculos