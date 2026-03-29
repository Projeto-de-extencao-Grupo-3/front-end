import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "../../../components/Layout/Layout";
import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";

import "./EtapaOrcamento.css";
import "./EtapaOrcamento.css";

function EtapaOrcamento() {
    const paginaAtual = "orcarmento";
    const { buscarOrdem } = ServicosEItensLogic();
    const [ticket, setTicket] = useState(null);
    const { idOrdemServico } = useParams();

    const carregarOrdem = async () => {
        try {
            const dados = await buscarOrdem(idOrdemServico);
            setTicket({
                ...dados.busca_simples,
                servicos: dados.busca_simples.servicos || [],
                produtos: dados.busca_simples.produtos || []
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        carregarOrdem();
    }, [idOrdemServico]);

    console.log("Ticket:", ticket);


    if (!ticket) return <p>Carregando...</p>;

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
                    placa={ticket.veiculo.placa}
                    marca={ticket.veiculo.marca}
                    prefixo={ticket.veiculo.prefixo}
                    modelo={ticket.veiculo.modelo}
                    cliente={ticket.veiculo.nome_cliente}
                    idOrdemServico={idOrdemServico}
                />
            </div>
            <div className="painelteste">
                <ServicosEItens
                    pagina={paginaAtual}
                    ticket={ticket}
                    atualizarLista={carregarOrdem}
                />
                <div className="teste2">
                    <ResumoOrcamento
                        pagina={paginaAtual}
                        ticket={ticket.resumo}
                        atualizarLista={carregarOrdem}
                    />
                    <Botoes
                        pagina={paginaAtual}
                        placa={ticket.veiculo}
                        ordemServicoDados={ticket}
                        idOrdemServico={idOrdemServico}
                    />
                </div>
            </div>

        </Layout>
    );
}

export default EtapaOrcamento;