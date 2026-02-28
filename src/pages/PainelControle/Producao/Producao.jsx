import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./Producao.css";

import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import "../../ComponentesInferiores.css";

function Producao() {
    const navigate = useNavigate();
    const paginaAtual = "produzir";


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
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "ativo" },
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

export default Producao;