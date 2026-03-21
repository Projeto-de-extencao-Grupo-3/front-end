import { useParams, useLocation } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./Finalizado.css";

import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import "../../componentesInferiores.css";

function Finalizado() {
    const { placa } = useParams();
    const location = useLocation();
    const dadosRecuperados = location.state?.ordemServicoDados || {};
    const paginaAtual = "finalizar";

    return (
        <Layout ativo={"painel"}>
            <div className="titulos-principais">
                <h1 className="titulo-principal">Em Produção</h1>
                <p className="subtitulo-principal">Acompanhe o Andamento do serviço deste veículo</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "concluido" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "concluido" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "concluido" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "concluido" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "concluido" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "ativo" },
                ]}
            />
            <div> 
                <OrdemServicoCard
                    marca={dadosRecuperados.marca}
                    prefixo={dadosRecuperados.prefixo}
                    modelo={dadosRecuperados.modelo}
                    cliente={dadosRecuperados.empresa}
                    placa={placa} />               
                    </div>
            <div className="componentesInferiores">
                <ServicosEItens pagina={paginaAtual} />
                <div className="componentesDireita">
                    <ResumoOrcamento pagina={paginaAtual} />
                    <Botoes pagina={paginaAtual} placa={placa} ordemServicoDados={dadosRecuperados} />
                </div>
            </div>

        </Layout>
    );
}

export default Finalizado;