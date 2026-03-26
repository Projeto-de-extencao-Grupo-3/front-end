import { useState, useEffect } from "react";
import api from "../../service/api";
import Layout from "../../components/Layout/Layout";
import KpiStatus from "../../components/KpiStatus/KpiStatus";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import ModalEntradaVeiculo from "../../components/ModalEntradaVeiculo/ModalEntradaVeiculo";
import ModalAgendarEntrada from "../../components/ModalAgendarEntrada/ModalAgendarEntrada";
import { useNavigate } from "react-router-dom";
import "./PainelControle.css";

function PainelControle() {
    const [kpiAtiva, setKpiAtiva] = useState("entrada");
    const [servicos, setServicos] = useState(null);
    const [mostrarModalEntrada, setMostrarModalEntrada] = useState(false);
    const [mostrarModalAgendar, setMostrarModalAgendar] = useState(false);

    const navigate = useNavigate();

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

    const fetchServicos = () => {
        // Nova configuração de Endpoint e Params
        api.get("/jornada/listagem", {
            params: { map: "PAINEL_CONTROLE" }
        })
            .then((res) => {
                setServicos(res.data);
                console.log("Dados do painel de controle:", res.data);
            })
            .catch((err) => console.error("Erro na API:", err));
    };

    useEffect(() => {
        fetchServicos();
    }, []);

    // FUNÇÃO CORRIGIDA: Trata fuso horário local (T00:00:00) para evitar erro de +/- 1 dia
    function calcularDias(dataMaior, dataMenor) {
        const formatarParaLocal = (data) => {
            if (!data) return new Date();
            if (typeof data === 'string' && data.includes('-')) {
                return new Date(data + 'T00:00:00'); // Força interpretação no fuso local
            }
            return new Date(data);
        };

        const d1 = formatarParaLocal(dataMaior);
        const d2 = formatarParaLocal(dataMenor);

        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        const diffTime = d1 - d2;
        return Math.round(diffTime / (1000 * 60 * 60 * 24));
    }

    const chaveBack = chavesStatus[kpiAtiva];
    // Ajuste no acesso à lista dentro de 'listagem_painel_controle'
    const listaOrdens = servicos?.listagem_painel_controle?.[chaveBack]?.ordens_de_servico || [];

    return (
        <Layout ativo="painel">
            <div className="d-flex flex-column">
                {/* CABECALHO */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column">
                        <h2 className="m-0">Painel de Controle</h2>
                        <span className="fs-5 text-muted">
                            Visão geral da situação de sua oficina
                        </span>
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

                <ModalAgendarEntrada
                    isOpen={mostrarModalAgendar}
                    onClose={() => setMostrarModalAgendar(false)}
                    onAgendamentoSuccess={fetchServicos}
                />
                <ModalEntradaVeiculo isOpen={mostrarModalEntrada} onClose={() => setMostrarModalEntrada(false)} />

                {/* KPIS - Ajuste de design para não quebrar no iPad e caminho do JSON */}
                <div className="d-flex gap-3">
                    {Object.keys(chavesStatus).map((id) => {
                        const dadosStatus = servicos?.listagem_painel_controle?.[chavesStatus[id]];
                        const qtd = dadosStatus?.quantidade_ordens || 0;
                        const ordensInternas = dadosStatus?.ordens_de_servico || [];

                        let corKpi = "verde";

                        if (id !== "entrada" && id !== "finalizados") {
                            let temVermelho = false;
                            let temAmarelo = false;

                            ordensInternas.forEach(os => {
                                // Lógica de cores agora baseada no campo 'dias_espera' do JSON
                                if (os.dias_espera > 6) {
                                    temVermelho = true;
                                } else if (os.dias_espera >= 3) {
                                    temAmarelo = true;
                                }
                            });

                            if (temVermelho) {
                                corKpi = "vermelho";
                            } else if (temAmarelo) {
                                corKpi = "amarelo";
                            }
                        }

                        return (
                            <div key={id} className="flex-fill" style={{ minWidth: 0 }}>
                                <KpiStatus
                                    cor={corKpi}
                                    status={nomesExibicao[id]}
                                    valor={`${qtd} veículos`}
                                    ativo={kpiAtiva === id}
                                    onClick={() => setKpiAtiva(id)}
                                />
                            </div>
                        );
                    })}
                </div>

                <h4 className="fw-normal mt-4 mb-3 text-muted">{nomesExibicao[kpiAtiva]}</h4>

                <div className="d-flex flex-wrap gap-4 justify-content-start">
                    {listaOrdens.length === 0 && <p className="text-muted">Nenhum serviço encontrado.</p>}

                    {listaOrdens.map((os) => {
                        let corCard = "verde";
                        let icone = null;

                        // Lógica de cores do card baseada nos dias_espera vindos do backend
                        if (kpiAtiva !== "entrada" && kpiAtiva !== "finalizados") {
                            if (os.dias_espera > 6) {
                                corCard = "vermelho";
                                icone = <i className='bxr bx-alert-triangle text-danger fs-3'></i>;
                            } else if (os.dias_espera >= 3) {
                                corCard = "amarelo";
                                icone = <i className='bxr bx-alert-triangle text-warning fs-3'></i>;
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
                                    {kpiAtiva === 'entrada' && (
                                        <>
                                            <div><b>Dias restantes para Entrada:</b> <b className={`cor-fonte-${corCard}`}>{calcularDias(os.data_entrada_prevista, null)} Dias</b></div>
                                            <div><b>Data Agendada:</b> {os.data_entrada_prevista ? new Date(os.data_entrada_prevista + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}</div>
                                        </>
                                    )}

                                    {(kpiAtiva === 'orcamento' || kpiAtiva === 'autorizacao' || kpiAtiva === 'vaga') && (
                                        <>
                                            <div><b>Total do Serviço Orçado:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Dias em espera:</b> <b className={`cor-fonte-${corCard}`}>{os.dias_espera} Dias</b></div>
                                        </>
                                    )}

                                    {kpiAtiva === 'producao' && (
                                        <>
                                            <div><b>Total do Serviço:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Dias em produção:</b> <b className={`cor-fonte-${corCard}`}>{calcularDias(null, os.data_entrada_efetiva)} Dias</b></div>
                                        </>
                                    )}

                                    {kpiAtiva === 'finalizados' && (
                                        <>
                                            <div><b>Total do Serviço:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Duração do Serviço:</b> <b className="cor-fonte-verde">{calcularDias(os.data_saida_efetiva, os.data_entrada_efetiva)} Dias</b></div>
                                        </>
                                    )}
                                </div>

                                <div className="d-flex gap-2">
                                    {kpiAtiva === "entrada" && (
                                        <>
                                            <button className={`btn flex-grow-1 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/entrada/${os.veiculo?.placa}`, { state: { dadosOS: os } })}>
                                                Fazer Entrada
                                            </button>
                                            <button className="btn btn-outline-secondary px-3">
                                                Cancelar
                                            </button>
                                        </>
                                    )}

                                    {kpiAtiva === "orcamento" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/orcamento/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    placa: os.veiculo?.placa,
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                }
                                            }
                                        })}>
                                            Fazer Orçamento
                                        </button>
                                    )}

                                    {kpiAtiva === "autorizacao" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/autorizacao/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    placa: os.veiculo?.placa,
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                }
                                            }
                                        })}>
                                            Autorizar
                                        </button>
                                    )}

                                    {kpiAtiva === "vaga" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/aguardandoVaga/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    placa: os.veiculo?.placa,
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                }
                                            }
                                        })}>
                                            Enviar para Produção
                                        </button>
                                    )}

                                    {kpiAtiva === "producao" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/producao/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    placa: os.veiculo?.placa,
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                }
                                            }
                                        })}>
                                            Verificar Andamento
                                        </button>
                                    )}

                                    {kpiAtiva === "finalizados" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/finalizado/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    placa: os.veiculo?.placa,
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                }
                                            }
                                        })}>
                                            Analisar Ordem de Serviço
                                        </button>
                                    )}
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