import Layout from "../../../components/Layout/Layout";
import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import "./EtapaOrcamento.css";
import { useState, useEffect } from "react";


function EtapaOrcamento() {
    const [placa, setPlaca] = useState('aa');


    return (
        <Layout ativo={"painel"}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="m-0">Painel de Controle</h2>
                    <span className="text-muted">Visão geral da situação da sua oficina</span>
                </div>
            </div>



            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-wallet-note", status: "ativo" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "pendente" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "pendente" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "pendente" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />
            <div>
                <OrdemServicoCard placa={placa} />
            </div>

            <div className="painelteste">
                <ServicosEItens pagina={"orcamento"} />
                <div className="teste2">
                    <ResumoOrcamento />
                    <Botoes pagina={"orcar"} />
                </div>
            </div>

        </Layout>
    );
}

export default EtapaOrcamento;