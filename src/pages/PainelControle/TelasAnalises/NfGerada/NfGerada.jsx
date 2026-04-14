import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout.jsx";
import StepperFluxo from "../../../../components/StepperFluxo/StepperFluxo.jsx";
import ServicosEItensLogic from "../../../../service/ServicosEItens.js";
import ServicosEItens from "../../../../components/Servicos&Itens/Servicos&Itens.jsx";
import ResumoOrcamento from "../../../../components/Resumo/ResumoDoOrcamento.jsx";
import Botoes from "../../../../components/Botoes/botoes.jsx";

import "../../../ConfigLayoutWorkflow.css";

function NfPendente() {
    const paginaAtual = "analisar3";
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

    if (!ticket) return <p>Carregando...</p>;

    return (
        <Layout ativo={"financeiro"}>
            <div className="titulos-principais">
                <h1 className="titulo-principal">Em Produção</h1>
                <p className="subtitulo-principal">Acompanhe o Andamento do serviço deste veículo</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "prodfinalizada", label: "Produção Finalizada", icon: "bx bx-file", status: "concluido" },
                    { id: "pgtorealizado", label: "Pagamento Realizado", icon: "bx bx-time", status: "concluido" },
                    { id: "nfgerada", label: "Nota fiscal gerada", icon: "bx bx-lock", status: "concluido" }
                ]}
            />
            <div className="componentesInferiores">
                <ServicosEItens
                    pagina={paginaAtual}
                    ticket={ticket}
                    atualizarLista={carregarOrdem}
                />
                <div className="componentesDireita">
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

export default NfPendente;