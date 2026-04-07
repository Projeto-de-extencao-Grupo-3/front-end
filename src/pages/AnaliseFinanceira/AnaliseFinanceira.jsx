import { useState, useEffect } from "react";
import api from "../../service/api";
import Layout from "../../components/Layout/Layout";
import KpiStatus from "../../components/KpiStatus/KpiStatus";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../../assets/icons/CalendarIcon.png";
import "./AnaliseFinanceira.css";

function AnaliseFinanceira() {
    // funcionalidade puxar data atual para filtro inicial
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');

    const anoMesAtual = `${ano}-${mes}`;



    const [financeiro, setFinanceiro] = useState(null);
    const [anoMes, setAnoMes] = useState(anoMesAtual);
    const [mostrarModalFiltro, setMostrarModalFiltro] = useState(false);
    const navigate = useNavigate();

    const categorias = {
        pagamento: "SERVICOS_PAGAMENTO_PENDENTE",
        notaFiscal: "SERVICOS_NOTA_FISCAL_PENDENTE",
        realizado: "SERVICOS_PAGAMENTO_REALIZADO"
    };

    const fetchDadosFinanceiros = () => {
        api.get("/jornada/listagem", {
            params: {
                map: "ANALISE_FINANCEIRA",
                anoMes: anoMes
            }
        })
            .then((res) => {
                setFinanceiro(res.data);
                console.log(`${anoMes} - Dados Financeiros Recebidos:`, res.data);
            })
            .catch((err) => console.error("Erro na API Financeira:", err));
    };

    useEffect(() => {
        fetchDadosFinanceiros();
    }, [anoMes]);


    function definirCorKpi(listaOrdens) {
        if (!listaOrdens || listaOrdens.length === 0) return "verde";
        let temVermelho = false;
        let temAmarelo = false;

        listaOrdens.forEach(os => {
            if (os.dias_espera > 6) temVermelho = true;
            else if (os.dias_espera >= 3) temAmarelo = true;
        });

        if (temVermelho) return "vermelho";
        if (temAmarelo) return "amarelo";
        return "verde";
    }

    return (
        <Layout ativo="financeiro">
            <div className="analise-financeira d-flex flex-column w-100">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column">
                        <h2 className="m-0">Análise Financeira</h2>
                        <span className="fs-5 text-muted">
                            Situação financeira de <b>{anoMes.split('-').reverse().join('/')}</b>
                        </span>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark d-flex align-items-center gap-1" onClick={() => setMostrarModalFiltro(true)}>
                            Selecionar outro mês <i className='bx bx-calendar'></i>
                        </button>
                        <button className="btn btn-dark d-flex align-items-center gap-1">
                            Gerar relatório mensal <i className='bx bxs-clipboard-detail'></i>
                        </button>
                    </div>
                </div>

                {mostrarModalFiltro && (
                    <ModalFiltroData
                        valorAtual={anoMes}
                        aoConfirmar={(novaData) => { setAnoMes(novaData); setMostrarModalFiltro(false); }}
                        aoCancelar={() => setMostrarModalFiltro(false)}
                    />
                )}

                <div className="row g-4 w-100 m-0">
                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dadosPagto = financeiro?.listagem_analise_financeira?.[categorias.pagamento] || {};

                            const ordensPagto = dadosPagto.ordens_de_servicos || [];


                            const corKpi = definirCorKpi(ordensPagto);

                            return (
                                <>
                                    <KpiStatus
                                        cor={corKpi}
                                        status="Total de Serviços a receber"
                                        valor={`R$ ${dadosPagto?.total_valor?.toLocaleString('pt-BR') || '0,00'} (${dadosPagto?.quantidade_servicos_pagamento_pendentes || 0} Serviços)`}
                                    />
                                    <p className="texto-raia m-0">Pagamento com pendência</p>
                                    {ordensPagto.map(os => (
                                        <CardFinanceiro
                                            key={os.id_ordem_servico}
                                            os={os}
                                            categoria={categorias.pagamento}
                                            navigate={navigate}
                                        />
                                    ))}
                                </>
                            );
                        })()}
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dados = financeiro?.listagem_analise_financeira?.[categorias.notaFiscal] || {};
                            const ordens = dados.ordens_de_servicos || [];
                            const corKpi = definirCorKpi(ordens);
                            return (
                                <>
                                    <KpiStatus cor={corKpi} status="Notas Fiscais Pendentes" valor={`${dados.quantidade_notas_fiscais_pendentes || 0} Serviços`} />
                                    <p className="texto-raia m-0">Nota Fiscal com pendência</p>
                                    {ordens.map(os => <CardFinanceiro key={os.id_ordem_servico} os={os} categoria={categorias.notaFiscal} navigate={navigate} />)}
                                </>
                            );
                        })()}
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dados = financeiro?.listagem_analise_financeira?.[categorias.realizado] || {};
                            const ordens = dados.ordens_de_servicos || [];
                            return (
                                <>
                                    <KpiStatus cor="verde" status="Pagamentos Realizados" valor={`${dados.quantidade_servicos_pagamento_concluido || 0} Serviços`} />
                                    <p className="texto-raia m-0">Concluídos sem pendência</p>
                                    {ordens.map(os => <CardFinanceiro key={os.id_ordem_servico} os={os} categoria={categorias.realizado} navigate={navigate} />)}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

function ModalFiltroData({ valorAtual, aoConfirmar, aoCancelar }) {
    const [dataTmp, setDataTmp] = useState(valorAtual);

    return (
        <div className="rs-fundo" onClick={aoCancelar}>
            <div className="rs-caixa" onClick={(e) => e.stopPropagation()}>
                <div className="rs-cabecalho">
                    <img className="rs-icone" src={CalendarIcon} alt="" />
                    <h2 className="rs-titulo">Filtrar por Período</h2>
                </div>
                <div className="rs-campo">
                    <label className="rs-label">Escolha a data para visualização</label>
                    <div className="rs-input-wrapper">
                        <input
                            className="rs-input"
                            type="month"
                            value={dataTmp}
                            onChange={(e) => setDataTmp(e.target.value)}
                        />
                        <img className="rs-input-icone" src={CalendarIcon} alt="" />
                    </div>
                </div>
                <div className="rs-botoes">
                    <button className="rs-btn rs-btn-confirmar" onClick={() => aoConfirmar(dataTmp)}>Aplicar Filtro</button>
                    <button className="rs-btn rs-btn-cancelar" onClick={aoCancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

function CardFinanceiro({ os, categoria, navigate }) {
    let corCard = "verde";
    let icone = <i className='bxr bxs-check-circle text-success fs-4'></i>;
    let rotaDestino = `validarPraOndevai`; // TO DO;

    if (categoria !== "SERVICOS_PAGAMENTO_REALIZADO") {
        if (os.dias_espera > 6) {
            corCard = "vermelho";
            icone = <i className='bxr bx-alert-triangle text-danger fs-4'></i>;
        } else if (os.dias_espera >= 3) {
            corCard = "amarelo";
            icone = <i className='bxr bx-alert-triangle text-warning fs-4'></i>;
        }
    }

    if (categoria === "SERVICOS_NOTA_FISCAL_PENDENTE") {
        rotaDestino = `validarPraOndevai`; // TO DO
    } else if (categoria === "SERVICOS_PAGAMENTO_REALIZADO") {
        rotaDestino = `validarPraOndevai`; // TO DO
    }

    return (
        <ServicoCard cor={corCard}>
            <div className="d-flex align-items-center gap-2">
                {icone}
                <strong className="fs-5">{os.cliente?.nome}</strong>
            </div>
            <div className="d-flex align-items-center gap-1 mt-1">
                <strong className="me-2">OS#{os.id_ordem_servico}</strong>
                <i className='bx bxs-bus text-muted'></i>
                <span className="small text-muted">{os.veiculo?.modelo}</span>
            </div>
            <div className="small mt-1"><strong>Placa:</strong> {os.veiculo?.placa}</div>
            <hr className="my-2" />
            <div className="small">
                <div><strong>Total:</strong> R$ {os.valor_total?.toLocaleString('pt-BR')}</div>
                {categoria === "SERVICOS_PAGAMENTO_REALIZADO" ? (
                    <div><strong>Data Baixa:</strong> <b className="cor-fonte-verde">{os.data_saida_efetiva ? new Date(os.data_saida_efetiva + 'T00:00:00').toLocaleDateString('pt-BR') : '---'}</b></div>
                ) : (
                    <div><strong>Em espera:</strong> <b className={`cor-fonte-${corCard}`}>{os.dias_espera} Dias</b></div>
                )}
            </div>
            <button className={`btn w-100 mt-3 btn-status-${corCard}`} onClick={() => navigate(rotaDestino)}>
                Analisar
            </button>
        </ServicoCard>
    );
}

export default AnaliseFinanceira;