import { useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./AguardandoVaga.css";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import ServicosEItens from "../../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../../components/Botoes/botoes";
import "../../componentesInferiores.css";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";
import { useState, useEffect } from "react";

function AguardandoVaga() {
    const { buscarOrdem } = ServicosEItensLogic();
    const { idOrdemServico } = useParams();
    const paginaAtual = "aguardar";
    const [ticket, setTicket] = useState(null);


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

    console.log("Dados recuperados na autorização:", ticket);

    useEffect(() => {
        carregarOrdem();
    }, [idOrdemServico]);

    if (!ticket) return <p>Carregando...</p>;


    return (
        <Layout ativo={"painel"}>
            <div className="titulos-principais">
                <h1 className="titulo-principal">Aguardando Vaga</h1>
                <p className="subtitulo-principal">Direcione a Ordem de Serviço aprovada para a linha de Produção</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "concluido" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "concluido" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "concluido" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "ativo" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />
            <div>
                <OrdemServicoCard
                    marca={ticket.veiculo.marca}
                    prefixo={ticket.veiculo.prefixo}
                    modelo={ticket.veiculo.modelo}
                    cliente={ticket.cliente.nome}
                    idOrdemServico={idOrdemServico}
                    placa={ticket.veiculo.placa} />
            </div>
            <div className="componentesInferiores">
                <ServicosEItens pagina={paginaAtual} />
                <div className="componentesDireita">
                    <ResumoOrcamento pagina={paginaAtual} />
                    <Botoes pagina={paginaAtual} placa={ticket.veiculo.placa} ordemServicoDados={ticket} idOrdemServico={idOrdemServico} />
                </div>
            </div>

        </Layout>
    );
}

export default AguardandoVaga;