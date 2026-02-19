import { useState, useEffect } from "react";
import api from "../../service/api";
import Layout from "../../components/Layout/Layout";
import KpiStatus from "../../components/KpiStatus/KpiStatus";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import ModalEntradaVeiculo from "../../components/ModalEntradaVeiculo/ModalEntradaVeiculo";
import ModalAgendarEntrada from "../../components/ModalAgendarEntrada/ModalAgendarEntrada";
import "./PainelControle.css";

function PainelControle() {
    const [kpiAtiva, setKpiAtiva] = useState("entrada");
    const [servicos, setServicos] = useState(null);
    const [mostrarModalEntrada, setMostrarModalEntrada] = useState(false);
    const [mostrarModalAgendar, setMostrarModalAgendar] = useState(false);

    const chavesStatus = {
        entrada: "AGUARDANDO_ENTRADA",
        orcamento: "AGUARDANDO_ORCAMENTO",
        autorizacao: "AGUARDANDO_AUTORIZACAO",
        vaga: "AGUARDANDO_VAGA",
        producao: "EM_PRODUCAO",
        finalizados: "FINALIZADO"
    };

    const nomesExibicao = {
        entrada: "Aguardando Entrada",
        orcamento: "Aguardando Orçamento",
        autorizacao: "Aguardando Autorização",
        vaga: "Aguardando Vaga",
        producao: "Em Produção",
        finalizados: "Finalizados"
    };

    useEffect(() => {
        api.get("/painel-controle")
            .then((res) => {
                setServicos(res.data);
                console.log("Dados do painel de controle:", res.data);
            })
            .catch((err) => console.error("Erro na API:", err));
    }, []);

    function calcularDias(data1, data2) {
        const d1 = data1 ? new Date(data1) : new Date();
        const d2 = data2 ? new Date(data2) : new Date();
        return Math.abs(Math.floor((d1 - d2) / (1000 * 60 * 60 * 24)));
    }

    const chaveBack = chavesStatus[kpiAtiva];
    const listaOrdens = servicos?.[chaveBack]?.ordens_de_servico || [];

    return (
        <Layout ativo="painel">
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="m-0">Painel de Controle</h2>
                        <span className="text-muted">Visão geral da situação da sua oficina</span>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark" onClick={() => setMostrarModalAgendar(true)}>
                            Agendar Entrada <i className='bx bx-calendar'></i>
                        </button>
                        <button className="btn btn-dark" onClick={() => setMostrarModalEntrada(true)}>
                            Nova entrada de Veículo +
                        </button>
                    </div>
                </div>

                <ModalAgendarEntrada isOpen={mostrarModalAgendar} onClose={() => setMostrarModalAgendar(false)} />
                <ModalEntradaVeiculo isOpen={mostrarModalEntrada} onClose={() => setMostrarModalEntrada(false)} />

                {/* KPIS - paremetros de cores*/}
                <div className="d-flex gap-3">
                    {Object.keys(chavesStatus).map((id) => {
                        const qtd = servicos?.[chavesStatus[id]]?.quantidade_ordens || 0;
                        let corKpi = "verde";

                        // Parametrização para KPIs de espera
                        if (id !== "producao" && id !== "finalizados") {
                            if (qtd > 10) corKpi = "vermelho";
                            else if (qtd > 5) corKpi = "amarelo";
                        }

                        return (
                            <KpiStatus
                                key={id}
                                cor={corKpi}
                                status={nomesExibicao[id]}
                                valor={`${qtd} veículos`}
                                ativo={kpiAtiva === id}
                                onClick={() => setKpiAtiva(id)}
                            />
                        );
                    })}
                </div>

                <h4 className="fw-normal mt-4 mb-3 text-muted">{nomesExibicao[kpiAtiva]}</h4>

                <div className="d-flex flex-wrap gap-4 justify-content-start">
                    {listaOrdens.length === 0 && <p className="text-muted">Nenhum serviço encontrado.</p>}

                    {listaOrdens.map((os) => {
                        // --- logica parametro cards ---
                        let corCard = "verde";
                        let icone = null;

                        const checkEntrada = kpiAtiva === "entrada";
                        const diasAtraso = checkEntrada 
                            ? calcularDias(os.entrada?.data_entrada_prevista, null)
                            : calcularDias(null, os.entrada?.data_entrada_efetiva);

                        if (kpiAtiva !== "producao" && kpiAtiva !== "finalizados") {
                            if (diasAtraso > 10) {
                                corCard = "vermelho";
                                icone = <i className='bx bx-alert-triangle text-danger fs-3'></i>;
                            } else if (diasAtraso > 5) {
                                corCard = "amarelo";
                                icone = <i className='bx bx-alert-triangle text-warning fs-3'></i>;
                            }
                        }

                        if (kpiAtiva === "finalizados") {
                            icone = <i className='bx bxs-check-circle text-success fs-4'></i>;
                        }

                        return (
                            <ServicoCard key={os.id_ordem_servico} cor={corCard}>
                                <div className="d-flex align-items-center gap-2">
                                    {icone} 
                                    <strong className="fs-5">{os.cliente?.nome}</strong>
                                </div>

                                <strong className="d-block mt-1">OS#{os.id_ordem_servico}</strong>

                                <div className="d-flex align-items-center gap-1 mt-2">
                                    <i className='bx bxs-bus text-muted'></i> 
                                    <span>{os.veiculo?.modelo}</span>
                                </div>
                                <div><b>Placa:</b> {os.veiculo?.placa}</div>

                                <hr className="my-2" />

                                <div className="mb-3 small">
                                    {checkEntrada ? (
                                        <>
                                            <div><b>Dias restantes para Entrada:</b> {diasAtraso} Dias</div>
                                            <div><b>Data Agendada:</b> {os.entrada?.data_entrada_prevista}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div><b>Total do Serviço Orçado:</b> R${os.valor_total.toLocaleString('pt-BR')}</div>
                                            {kpiAtiva === "finalizados" 
                                                ? <div><b>Duração do Serviço:</b> 6 Dias</div>
                                                : <div><b>Dias em espera:</b> {diasAtraso} Dias</div>
                                            }
                                        </>
                                    )}
                                </div>


                                {/* logica plotar botoes de acordo com status */}
                                <div className="d-flex gap-2">
                                    <button className={`btn w-100  fs-5 btn-status-${corCard}`}>
                                        {kpiAtiva === "entrada" && "Fazer Entrada"}
                                        {kpiAtiva === "orcamento" && "Fazer Orçamento"}
                                        {kpiAtiva === "autorizacao" && "Autorizar"}
                                        {kpiAtiva === "vaga" && "Enviar para Produção"}
                                        {kpiAtiva === "producao" && "Verificar Andamento"}
                                        {kpiAtiva === "finalizados" && "Analisar Ordem de Serviço"}
                                    </button>
                                    {checkEntrada && <button className="btn btn-outline-secondary px-3">Cancelar</button>}
                                </div>
                            </ServicoCard>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default PainelControle;