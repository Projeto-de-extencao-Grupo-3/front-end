import KpiStatus from "../../components/KpiStatus/KpiStatus";
import Layout from "../../components/Layout/Layout";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import ModalEntradaVeiculo from "../../components/ModalEntradaVeiculo/ModalEntradaVeiculo";
import ModalAgendarEntrada from "../../components/ModalAgendarEntrada/ModalAgendarEntrada";
import { useState } from "react";

function PainelControle() {
    const [kpiAtiva, setKpiAtiva] = useState("entrada");
    const [mostrarModalEntrada, setMostrarModalEntrada] = useState(false);
    const [mostrarModalAgendar, setMostrarModalAgendar] = useState(false);
    const [zoom, setZoom] = useState(1);


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

    function zoomIn() {
        setZoom((atual) => {
            if (atual >= 1.3) return atual;
            const novo = atual + 0.1;
            document.body.style.zoom = novo;
            return novo;
        });
    }

    function zoomOut() {
        setZoom((atual) => {
            if (atual == 1) return atual;
            const novo = atual - 0.1;
            document.body.style.zoom = novo;
            return novo;
        });
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
                    <button onClick={zoomIn}>Zoom +</button>
                    <button onClick={zoomOut}>Zoom -</button>
                    </div>


                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark d-flex align-items-center gap-1" onClick={() => setMostrarModalAgendar(true)}>
                            Agendar Entrada <i className='bx bx-calendar'></i>
                        </button>

                        <ModalAgendarEntrada
                            isOpen={mostrarModalAgendar}
                            onClose={() => setMostrarModalAgendar(false)}
                        />

                        <button className="btn btn-dark d-flex align-items-center gap-1" onClick={() => setMostrarModalEntrada(true)}>
                            Nova entrada de Veículo +
                        </button>

                        <ModalEntradaVeiculo
                            isOpen={mostrarModalEntrada}
                            onClose={() => setMostrarModalEntrada(false)}
                        />
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
                        valor="4 veículos"
                        descricao="Pendentes"
                        ativo={kpiAtiva === "orcamento"}
                        onClick={() => setKpiAtiva("orcamento")}
                    />

                    <KpiStatus
                        cor="amarelo"
                        status="Aguardando Autorização"
                        valor="3 veículos"
                        descricao="Para aprovar"
                        ativo={kpiAtiva === "autorizacao"}
                        onClick={() => setKpiAtiva("autorizacao")}
                    />

                    <KpiStatus
                        cor="verde"
                        status="Aguardando Vaga"
                        valor="0 veículos"
                        descricao="Aprovados"
                        ativo={kpiAtiva === "vaga"}
                        onClick={() => setKpiAtiva("vaga")}
                    />

                    <KpiStatus
                        cor="verde"
                        status="Em produção"
                        valor="0 veículos"
                        descricao="Em andamento"
                        ativo={kpiAtiva === "producao"}
                        onClick={() => setKpiAtiva("producao")}
                    />

                    <KpiStatus
                        cor="verde"
                        status="Finalizados"
                        valor="0 veículos"
                        descricao="Últimos 30 dias"
                        ativo={kpiAtiva === "finalizados"}
                        onClick={() => setKpiAtiva("finalizados")}
                    />
                </div>

                <h4 className="fw-normal mt-4 mb-3 fs-4 text-muted ">{nomesKpi[kpiAtiva]}</h4>

                {/* ENTRADA */}
                {kpiAtiva === 'entrada' && (
                    <div className="d-flex flex-wrap gap-5 justify-content-start">
                        <ServicoCard cor="verde">
                            <strong>Viação Águia Branca</strong>

                            <strong>OS#0034</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Marcopolo Paradiso 1800 DD G7</div>
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

                            <strong>OS#0057</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> BRA-9812</div>

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


                {/* AGUARDANDO ORCMENTO */}
                {kpiAtiva === 'orcamento' && (
                    <div className="d-flex flex-wrap gap-5 justify-content-start">
                        <ServicoCard cor="vermelho">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "red" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Caio Induscar Apache VIP V</div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>
                        </ServicoCard>


                        <ServicoCard cor="amarelo">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "#ebc429ff" }}></i>
                                Catarinense
                            </strong>

                            <strong>OS#0031</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Irizar i6 - 1400</div>
                            <div><strong>Placa:</strong> JAS-3321</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">6 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>

                        </ServicoCard>


                        <ServicoCard cor="verde">
                            <strong>Sussantur</strong>

                            <strong>OS#0037</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Marcopolo G8 - 1500</div>
                            <div><strong>Placa:</strong> DAS-1323</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">3 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>

                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong>Cometa Transportes</strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Comil Invictus DD</div>
                            <div><strong>Placa:</strong> RST-9087</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">2 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>
                        </ServicoCard>


                    </div>
                )}

                {/* AGUARDANDO AUTORIZACAO */}
                {kpiAtiva === 'autorizacao' && (
                    <div className="d-flex flex-wrap gap-5 justify-content-start">
                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Caio Induscar Apache VIP V</div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>
                        </ServicoCard>


                        <ServicoCard cor="amarelo">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "#ebc429ff" }}></i>
                                Catarinense
                            </strong>

                            <strong>OS#0031</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Irizar i6 - 1400</div>
                            <div><strong>Placa:</strong> JAS-3321</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">6 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Fazer orçamento</button>
                            </div>

                        </ServicoCard>


                        <ServicoCard cor="verde">
                            <strong>Sussantur</strong>

                            <strong>OS#0037</strong>
                            <div className="d-flex align-items-center gap-1"><i class='bx bxs-bus' style={{ fontSize: "22px" }}></i> Marcopolo G8 - 1500</div>
                            <div><strong>Placa:</strong> DAS-1323</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">3 Dias</b></div>

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
