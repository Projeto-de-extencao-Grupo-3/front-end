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

                <div className="d-flex flex-grow-1 gap-3 justify-content-between flex-wrap">
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

                    <ServicoCard cor="vermelho">
                        <strong>CostaSul Transportes</strong>

                        <strong>OS#0029</strong>
                        <div><i class='bx bxs-bus'></i> Volvo B420R — Executivo</div>
                        <div><strong>Placa:</strong> ZTR-6634</div>

                        <hr />

                        <div><strong>Dias restantes para Entrada:</strong> 15 Dias</div>
                        <div><strong>Data Agendada:</strong> 17/02/2025</div>


                        <div className="d-flex gap-2 mt-3">
                            {/* usar classe btn-status se quiser a cor padrão do estilo de layout (verde,vermelho e etc) */}
                            <button className="btn-status btn flex-grow-1">Fazer Entrada</button>
                            <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                        </div>
                    </ServicoCard>

                    <ServicoCard cor="amarelo">
                        <strong>Orion Turismo</strong>

                        <strong>OS#0777</strong>
                        <div><i class='bx bxs-bus'></i> Neobus New Road N10</div>
                        <div><strong>Placa:</strong> POC-9880</div>

                        <hr />

                        <div><strong>Dias restantes para Entrada:</strong> 10 Dias</div>
                        <div><strong>Data Agendada:</strong> 02/02/2025</div>


                        <div className="d-flex gap-2 mt-3">
                            {/* usar classe btn-status se quiser a cor padrão do estilo de layout (verde,vermelho e etc) */}
                            <button className="btn-status btn flex-grow-1">Fazer Entrada</button>
                            <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                        </div>
                    </ServicoCard>
                    <ServicoCard cor="amarelo">
                        <strong>Gael Tur</strong>

                        <strong>OS#0001</strong>
                        <div><i class='bx bxs-bus' ></i> Marcopolo G8 - 1200</div>
                        <div><strong>Placa:</strong> ABC-1234</div>

                        <hr />

                        <div><strong>Dias restantes para Entrada:</strong> 13 Dias</div>
                        <div><strong>Data Agendada:</strong> 13/01/2025</div>

                        <div className="d-flex gap-2 mt-3">
                            {/* usar classe btn-status se quiser a cor padrão do estilo de layout (verde,vermelho e etc) */}
                            <button className="btn-status btn flex-grow-1">Fazer Entrada</button>
                            <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                        </div>
                    </ServicoCard>

                    <ServicoCard cor="verde">
                        <strong>Viação Horizonte</strong>

                        <strong>OS#0123</strong>
                        <div><i class='bx bxs-bus'></i> Comil Invictus DD</div>
                        <div><strong>Placa:</strong> HJK-5478</div>

                        <hr />

                        <div><strong>Dias restantes para Entrada:</strong> 21 Dias</div>
                        <div><strong>Data Agendada:</strong> 22/03/2025</div>

                        <div className="d-flex gap-2 mt-3">
                            {/* usar classe btn-status se quiser a cor padrão do estilo de layout (verde,vermelho e etc) */}
                            <button className="btn-status btn flex-grow-1">Fazer Entrada</button>
                            <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                        </div>
                    </ServicoCard>

                    <ServicoCard cor="verde">
                        <strong>Expresso Rápido</strong>

                        <strong>OS#0189</strong>
                        <div><i class='bx bxs-bus'></i> Marcopolo Paradiso 1800DD</div>
                        <div><strong>Placa:</strong> QLM-2307</div>

                        <hr />

                        <div><strong>Dias restantes para Entrada:</strong> 3 Dias</div>
                        <div><strong>Data Agendada:</strong> 30/01/2025</div>

                        <div className="d-flex gap-2 mt-3">
                            {/* usar classe btn-status se quiser a cor padrão do estilo de layout (verde,vermelho e etc) */}
                            <button className="btn-status btn flex-grow-1">Fazer Entrada</button>
                            <button className="btn btn-outline-dark flex-grow-1">Cancelar</button>
                        </div>
                    </ServicoCard>
                </div>
            </div>

        </Layout>


    );
}

export default PainelControle;
