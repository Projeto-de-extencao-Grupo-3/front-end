import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./AutorizacaoVeiculo.css";

import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import "../../ComponentesInferiores.css";

function AutorizacaoVeiculo() {
    const navigate = useNavigate();
    const paginaAtual = "aprovar";

    return (
        <Layout ativo={"painel"}>
            <div className="titulos-principais">
                <h1 className="titulo-principal">Aprovação de Orçamento</h1>
                <p className="subtitulo-principal">Crie e gerencie o orçamento dos serviços</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "concluido" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "ativo" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "pendente" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "pendente" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />
            <div className="componentesInferiores">
                <ServicosEItens pagina={paginaAtual} />
                <div className="componentesDireita">
                    <ResumoOrcamento pagina={paginaAtual} />
                    <Botoes pagina={paginaAtual} />
                </div>
            </div>
        </Layout>
    );
}

export default AutorizacaoVeiculo;