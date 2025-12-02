import KpiStatus from "../../components/KpiStatus/KpiStatus";
import Layout from "../../components/Layout/Layout";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import { useState } from "react";

function PainelControle() {
    const [kpiAtiva, setKpiAtiva] = useState("entrada");

    const nomesKpi = {
        entrada: "Aguardando Entrada",
        orcamento: "Aguardando Orçamento",
        autorizacao: "Aguardando Autorização",
        vaga: "Aguardando Vaga",
        producao: "Em Produção",
        finalizados: "Finalizados"
    };

    if (kpiAtiva === 'orcamento') {
        console.log('Exibindo veículos aguardando orçamento');
    }

    return (

        <Layout ativo={"painel"}>
            <div className="d-flex flex-column">

                {/* CABECALHO */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column">
                        <h2 className="m-0">Painel de Controle</h2>
                        <span className="fs-5 text-muted">
                            Visão geral da situação da sua oficina
                        </span>
                    </div>

                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark d-flex align-items-center gap-1">
                            Agendar Entrada <i className='bx bx-calendar'></i>
                        </button>

                        <button className="btn btn-dark d-flex align-items-center gap-1">
                            Nova entrada de Veículo +
                        </button>
                    </div>

                </div>

                {/* KPIS */}
                <div className="d-flex flex-grow-1 gap-3 justify-content-between flex-wrap">
                    <KpiStatus
                        cor="verde"
                        status="Aguardando Entrada"
                        valor="2 veículos"
                        descricao="Agendados"
                        ativo={kpiAtiva === "entrada"}
                        onClick={() => setKpiAtiva("entrada")}
                    />

                    <KpiStatus
                        cor="vermelho"
                        status="Aguardando Orçamento"
                        valor="2 veículos"
                        descricao="Pendentes"
                        ativo={kpiAtiva === "orcamento"}
                        onClick={() => setKpiAtiva("orcamento")}
                    />

                    <KpiStatus
                        cor="vermelho"
                        status="Aguardando Autorização"
                        valor="4 veículos"
                        descricao="Para aprovar"
                        ativo={kpiAtiva === "autorizacao"}
                        onClick={() => setKpiAtiva("autorizacao")}
                    />

                    <KpiStatus
                        cor="amarelo"
                        status="Aguardando Vaga"
                        valor="10 veículos"
                        descricao="Aprovados"
                        ativo={kpiAtiva === "vaga"}
                        onClick={() => setKpiAtiva("vaga")}
                    />

                    <KpiStatus
                        cor="verde"
                        status="Em produção"
                        valor="5 veículos"
                        descricao="Em andamento"
                        ativo={kpiAtiva === "producao"}
                        onClick={() => setKpiAtiva("producao")}
                    />

                    <KpiStatus
                        cor="verde"
                        status="Finalizados"
                        valor="1 veículos"
                        descricao="Últimos 30 dias"
                        ativo={kpiAtiva === "finalizados"}
                        onClick={() => setKpiAtiva("finalizados")}
                    />
                </div>

                <h4 className="fw-normal mt-4 mb-3 fs-4 text-muted ">{nomesKpi[kpiAtiva]}</h4>

                {kpiAtiva === 'entrada' && (
                    <div className="d-flex flex-grow-1 gap-4  flex-wrap">
                        <ServicoCard cor="verde">
                            <strong>Cometa Transportes</strong>

                            <strong>OS#0047</strong>
                            <div><i class='bx bxs-bus'></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> RST-9087</div>

                            <hr />

                            <div><strong>Dias restantes para Entrada:</strong> 27 Dias</div>
                            <div><strong>Data Agendada:</strong> 31/01/2025</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-success flex-grow-1">Fazer Entrada</button>
                                <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                            </div>
                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong>Cometa Transportes</strong>

                            <strong>OS#0047</strong>
                            <div><i class='bx bxs-bus'></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> RST-9087</div>

                            <hr />

                            <div><strong>Dias restantes para Entrada:</strong> 27 Dias</div>
                            <div><strong>Data Agendada:</strong> 31/01/2025</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-success flex-grow-1">Fazer Entrada</button>
                                <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                            </div>

                        </ServicoCard>
                    </div>

                )}

                {kpiAtiva === 'orcamento' && (
                    <div className="d-flex flex-grow-1 gap-4  flex-wrap">
                        <ServicoCard cor="vermelho">
                            <strong className="d-flex align-items-center"><i class='bxr  bx-alert-triangle' style={{ fontSize: "20px" }}></i> Cometa Transportes</strong>

                            <strong>OS#0047</strong>
                            <div><i class='bx bxs-bus'></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> RST-9087</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> 20 Dias</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>
                        </ServicoCard>


                        <ServicoCard cor="amarelo">
                            <strong>Catarinense</strong>

                            <strong>OS#0031</strong>
                            <div><i class='bx bxs-bus'></i> Irizar i6 - 1400</div>
                            <div><strong>Placa:</strong> JAS-3321</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> 6 Dias</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>

                        </ServicoCard>

                        
                        <ServicoCard cor="verde">
                            <strong>Sussantur</strong>

                            <strong>OS#0037</strong>
                            <div><i class='bx bxs-bus'></i> Marcopolo G8 - 1500</div>
                            <div><strong>Placa:</strong> DAS-1323</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> 3 Dias</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>

                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong>Cometa Transportes</strong>

                            <strong>OS#0047</strong>
                            <div><i class='bx bxs-bus'></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> RST-9087</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> 2 Dias</div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>
                        </ServicoCard>
                    </div>

                )}
            </div>

        </Layout >


    );
}

export default PainelControle;
