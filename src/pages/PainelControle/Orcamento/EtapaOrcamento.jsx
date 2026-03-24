import Layout from "../../../components/Layout/Layout";
import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import "./EtapaOrcamento.css";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";

import "./EtapaOrcamento.css";

function EtapaOrcamento() {
    const { buscarOrdem } = ServicosEItensLogic();
    const [ticket, setTicket] = useState(null);
    const { idOrdemServico } = useParams();
    const location = useLocation();
    const dadosRecuperados = location.state?.veiculoDados || {};

    const carregarOrdem = async () => {
        try {
            const dados = await buscarOrdem(idOrdemServico);
            setTicket({
                ...dados,
                servicos: dados.servicos || [],
                produtos: dados.produtos || []
            });
            console.log("Ordem de Serviço carregada:", dados);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        carregarOrdem();
    }, [idOrdemServico]);

    return (
        <Layout ativo={"painel"}>

            {/* CABECALHO */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column">
                    <h2 className="m-0">Orçamento de Serviço</h2>
                    <span className="fs-5 text-muted">
                        Crie e gerencie o orçamento dos serviços
                    </span>
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
                <OrdemServicoCard
                    placa={dadosRecuperados.placa}
                    marca={dadosRecuperados.marca}
                    prefixo={dadosRecuperados.prefixo}
                    modelo={dadosRecuperados.modelo}
                    cliente={dadosRecuperados.nome}
                    idOrdemServico={idOrdemServico}
                />
            </div>
            <div className="painelteste">
                <ServicosEItens
                    pagina="orcamento"
                    ticket={ticket}
                    atualizarLista={carregarOrdem}
                />
                <div className="teste2">
                    <ResumoOrcamento
                        pagina="orcamento"
                        ticket={ticket}
                        atualizarLista={carregarOrdem}
                    />
                    <Botoes pagina={"orcar"} placa={dadosRecuperados.placa} ordemServicoDados={dadosRecuperados} idOrdemServico={idOrdemServico} />
                </div>
            </div>

        </Layout>
    );
}

export default EtapaOrcamento;