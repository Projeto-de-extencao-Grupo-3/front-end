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
        api.get("/painel-controle")
            .then((res) => {
                setServicos(res.data);
                console.log("Dados do painel de controle:", res.data);
            })
            .catch((err) => console.error("Erro na API:", err));
    };

    useEffect(() => {
        fetchServicos();
    }, []);

    // FUNÇÃO CORRIGIDA: Parâmetros batendo com as variáveis internas
    function calcularDias(data1, data2) {
        // Começamos assumindo que ambas as datas são 'hoje'
        let dataObjeto1 = new Date();
        let dataObjeto2 = new Date();

        // Se o usuário passou a primeira data, usamos ela
        if (data1) {
            dataObjeto1 = new Date(data1);
        }

        // Se o usuário passou a segunda data, usamos ela
        if (data2) {
            dataObjeto2 = new Date(data2);
        }

        // Zeramos as horas para garantir que a conta considere apenas o dia do calendário
        dataObjeto1.setHours(0, 0, 0, 0);
        dataObjeto2.setHours(0, 0, 0, 0);

        const milissegundosDeDiferenca = dataObjeto1 - dataObjeto2;

        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;

        const totalDias = Math.round(milissegundosDeDiferenca / umDiaEmMilissegundos);

        return totalDias;
    }

    const chaveBack = chavesStatus[kpiAtiva];
    const listaOrdens = servicos?.[chaveBack]?.ordens_de_servico || [];

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

                {/* KPIS - paremetros de cores baseados na criticidade dos cards internos */}
                <div className="d-flex gap-3">
                    {Object.keys(chavesStatus).map((id) => {
                        const dadosStatus = servicos?.[chavesStatus[id]];
                        const qtd = dadosStatus?.quantidade_ordens || 0;
                        const ordensInternas = dadosStatus?.ordens_de_servico || [];

                        let corKpi = "verde";

                        // parametro cores da KPI
                        // entrada e finalizados sempre verde
                        if (id !== "entrada" && id !== "finalizados") {
                            let temVermelho = false;
                            let temAmarelo = false;

                            ordensInternas.forEach(os => {
                                const atraso = calcularDias(null, os.data_entrada_efetiva);
                                if (atraso > 10) { // VALIDAR QTD DIAS PARA SER VERMELHO
                                    temVermelho = true;
                                } else if (atraso > 5) { // VALIDAR QTD DIAS PARA SER AMARELO
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
                            ? calcularDias(os.data_entrada_prevista, null)
                            : calcularDias(null, os.data_entrada_efetiva);

                        // parametro por dias (entrada e finalizados sempre verde)
                        if (kpiAtiva !== "entrada" && kpiAtiva !== "finalizados") {
                            if (diasAtraso > 10) { // VALIDAR QTD DIAS PARA SER VERMELHO
                                corCard = "vermelho";
                                icone = <i className='bxr bx-alert-triangle text-danger fs-3'></i>;
                            } else if (diasAtraso > 5) {
                                corCard = "amarelo"; // VALIDAR QTD DIAS PARA SER AMARELO
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
                                    {/* logica plotagem de dados de acordo com kpis */}
                                    {kpiAtiva === 'entrada' && (
                                        <>
                                            <div><b>Dias restantes para Entrada:</b> <b className={`cor-fonte-${corCard}`}>{diasAtraso} Dias</b></div>
                                            <div><b>Data Agendada:</b> {os.data_entrada_prevista ? new Date(os.data_entrada_prevista).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : 'N/A'}</div>
                                        </>
                                    )}

                                    {kpiAtiva === 'orcamento' && (
                                        <>
                                            <div><b>Dias em espera:</b> <b className={`cor-fonte-${corCard}`}>{diasAtraso} Dias</b></div> {/* errado, validar*/}
                                        </>
                                    )}

                                    {(kpiAtiva === 'autorizacao') && (
                                        <>
                                            <div><b>Total do Serviço Orçado:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Dias em espera:</b> <b className={`cor-fonte-${corCard}`}>{diasAtraso} Dias</b></div> {/* errado, validar*/}
                                        </>
                                    )}

                                    {(kpiAtiva === 'vaga') && (
                                        <>
                                            <div><b>Total do Serviço:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Dias em espera:</b> <b className={`cor-fonte-${corCard}`}>6 Dias</b></div> {/* errado, validar*/}
                                        </>
                                    )}

                                    {(kpiAtiva === 'producao') && (
                                        <>
                                            <div><b>Total do Serviço:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Dias restantes:</b> <b className={`cor-fonte-${corCard}`}>6 Dias</b></div> {/* errado, validar*/}
                                        </>
                                    )}

                                    {kpiAtiva === 'finalizados' && (
                                        <>
                                            <div><b>Total do Serviço:</b> R${os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                                            <div><b>Duração do Serviço:</b> <b className={`cor-fonte-${corCard}`}>{diasAtraso} Dias</b></div> {/* validar*/}
                                        </>
                                    )}




                                </div>

                                {/* logica plotar botoes de acordo com status */}
                                <div className="d-flex gap-2">
                                    {kpiAtiva === "entrada" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/entrada/${os.veiculo?.placa}`, {
                                            state: {
                                                dadosOS: os,
                                            }
                                        })}>
                                            Fazer Entrada
                                        </button>
                                    )}

                                    {kpiAtiva === "orcamento" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/orcamento/${os.veiculo?.placa}/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                },
                                            }
                                        })}>
                                            Fazer Orçamento
                                        </button>
                                    )}

                                    {kpiAtiva === "autorizacao" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/autorizacao/${os.veiculo?.placa}/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                },
                                            }
                                        })}>
                                            Autorizar
                                        </button>
                                    )}

                                    {kpiAtiva === "vaga" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/aguardandoVaga/${os.veiculo?.placa}/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                },
                                            }
                                        })}>
                                            Enviar para Produção
                                        </button>
                                    )}

                                    {kpiAtiva === "producao" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/producao/${os.veiculo?.placa}/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                },
                                            }
                                        })}>
                                            Verificar Andamento
                                        </button>
                                    )}

                                    {kpiAtiva === "finalizados" && (
                                        <button className={`btn w-100 fs-5 btn-status-${corCard}`} onClick={() => navigate(`/painelControle/finalizado/${os.veiculo?.placa}/${os.id_ordem_servico}`, {
                                            state: {
                                                veiculoDados: {
                                                    marca: os.veiculo?.marca,
                                                    modelo: os.veiculo?.modelo,
                                                    prefixo: os.veiculo?.prefixo,
                                                    nome: os.cliente?.nome,
                                                },
                                            }
                                        })}>
                                            Analisar Ordem de Serviço
                                        </button>
                                    )}

                                    {checkEntrada && (
                                        <button className="btn btn-outline-secondary px-3">
                                            Cancelar
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