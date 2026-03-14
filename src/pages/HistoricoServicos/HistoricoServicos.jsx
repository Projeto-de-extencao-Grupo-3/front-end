import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import "./HistoricoServicos.css";

function HistoricoServicos(){
   return (
        <Layout ativo={"servicos"}>
            <div className="header-servicos">
                <div>
                    <h1>Histórico de Ordem de Serviços</h1>
                    <p>Visão geral dos serviços</p>
                </div>
            </div>
        </Layout>
    );
}

export default HistoricoServicos