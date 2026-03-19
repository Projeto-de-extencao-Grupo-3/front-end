import { useState, useEffect } from "react";
import api from "../../service/api";
import Layout from "../../components/Layout/Layout";
import KpiStatus from "../../components/KpiStatus/KpiStatus";
import ServicoCard from "../../components/ServicoCard/ServicoCard";
import { useNavigate } from "react-router-dom";
import "./AnaliseFinanceira.css";

function AnaliseFinanceira() {
    const [financeiro, setFinanceiro] = useState(null);
    const navigate = useNavigate();

    // Chaves exatas vindas do seu JSON (image_c4af02.png)
    const categorias = {
        pagamento: "SERVICOS_PAGAMENTO_PENDENTE",
        notaFiscal: "SERVICOS_NOTA_FISCAL_PENDENTE",
        realizado: "SERVICOS_PAGAMENTO_REALIZADO"
    };

    const fetchDadosFinanceiros = () => {
        api.get("/analise-financeira")
            .then((res) => {
                setFinanceiro(res.data);
                console.log("Dados Financeiros Recebidos:", res.data);
            })
            .catch((err) => console.error("Erro na API Financeira:", err));
    };

    useEffect(() => {
        fetchDadosFinanceiros();
    }, []);

    function calcularDias(data1, data2) {
        let dataObjeto1 = new Date();
        let dataObjeto2 = new Date();
        if (data1) dataObjeto1 = new Date(data1);
        if (data2) dataObjeto2 = new Date(data2);

        dataObjeto1.setHours(0, 0, 0, 0);
        dataObjeto2.setHours(0, 0, 0, 0);

        const milissegundosDeDiferenca = dataObjeto1 - dataObjeto2;
        const umDiaEmMilissegundos = 1000 * 60 * 60 * 24;
        return Math.round(milissegundosDeDiferenca / umDiaEmMilissegundos);
    }

    function definirCorKpi(listaOrdens, chave) {
        if (chave === categorias.realizado) return "verde";
        let corResult = "verde";
        let temVermelho = false;
        let temAmarelo = false;

        listaOrdens.forEach(os => {
            const dias = calcularDias(null, os.data_entrada_efetiva);
            if (dias > 10) {
                temVermelho = true;
            } else if (dias > 5) {
                temAmarelo = true;
            }
        });

        if (temVermelho) {
            corResult = "vermelho";
        }
        else if (temAmarelo) {
            corResult = "amarelo";
        }
        
        return corResult;
    }

    return (
        <Layout ativo="financeiro">
            <div className="analise-financeira d-flex flex-column w-100">

                {/* CABEÇALHO */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column">
                        <h2 className="m-0">Análise Financeira</h2>
                        <span className="fs-5 text-muted">
                            Visão geral da situação financeira no mês de <b>Setembro/2025</b>
                        </span>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark d-flex align-items-center gap-1">
                            Selecionar outro mês <i className='bx bx-calendar'></i>
                        </button>
                        <button className="btn btn-dark d-flex align-items-center gap-1">
                            Gerar relatório mensal <i className='bx bxs-clipboard-detail'></i>
                        </button>
                    </div>
                </div>

                {/* GRID DE RAIAS (3 COLUNAS) */}
                <div className="row g-4 w-100 m-0">

                    {/* COLUNA 1 - PAGAMENTO PENDENTE */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dados = financeiro?.[categorias.pagamento] || {};
                            const ordens = dados.ordens_de_servicos || [];
                            const corKpi = definirCorKpi(ordens, categorias.pagamento);
                            const valorTotal = dados.total_valor || 0;
                            const qtd = dados.quantidade_servicos_pagamento_pendentes || 0;

                            return (
                                <>
                                    <KpiStatus
                                        cor={corKpi}
                                        status="Total de Serviços a receber"
                                        valor={`R$ ${valorTotal.toLocaleString('pt-BR')} (${qtd} Serviços)`}
                                    />
                                    <p className="texto-raia m-0">Pagamento com pendência</p>
                                    <div className="d-flex flex-column gap-3">
                                        {ordens.map(os => (
                                            <CardFinanceiro key={os.id_ordem_servico} os={os} categoria={categorias.pagamento} calcularDias={calcularDias} navigate={navigate} />
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* COLUNA 2 - NOTA FISCAL PENDENTE */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dados = financeiro?.[categorias.notaFiscal] || {};
                            const ordens = dados.ordens_de_servicos || [];
                            const corKpi = definirCorKpi(ordens, categorias.notaFiscal);
                            const qtd = dados.quantidade_notas_fiscais_pendentes || 0;

                            return (
                                <>
                                    <KpiStatus
                                        cor={corKpi}
                                        status="Serviços com Nota Fiscal Pendente"
                                        valor={`${qtd} Serviços`}
                                    />
                                    <p className="texto-raia m-0">Nota Fiscal com pendência</p>
                                    <div className="d-flex flex-column gap-3">
                                        {ordens.map(os => (
                                            <CardFinanceiro key={os.id_ordem_servico} os={os} categoria={categorias.notaFiscal} calcularDias={calcularDias} navigate={navigate} />
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {/* COLUNA 3 - PAGAMENTO REALIZADO */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-3">
                        {(() => {
                            const dados = financeiro?.[categorias.realizado] || {};
                            const ordens = dados.ordens_de_servicos || [];
                            const qtd = dados.quantidade_servicos_pagamento_concluido || 0;

                            return (
                                <>
                                    <KpiStatus
                                        cor="verde"
                                        status="Serviços com Pagamento Realizado"
                                        valor={`${qtd} Serviços`}
                                    />
                                    <p className="texto-raia m-0">Concluídos sem pendência</p>
                                    <div className="d-flex flex-column gap-3">
                                        {ordens.map(os => (
                                            <CardFinanceiro key={os.id_ordem_servico} os={os} categoria={categorias.realizado} calcularDias={calcularDias} navigate={navigate} />
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                </div>
            </div>
        </Layout>
    );
}

function CardFinanceiro({ os, categoria, calcularDias, navigate }) {
    let corCard = "verde";
    let icone = <i className='bxr bxs-check-circle text-success fs-4'></i>;
    const diasAtraso = calcularDias(null, os.data_entrada_efetiva);

    // Parametrização de cores (Exceto na raia de concluídos)
    if (categoria !== "SERVICOS_PAGAMENTO_REALIZADO") {
        if (diasAtraso > 10) {
            corCard = "vermelho";
            icone = <i className='bxr bx-alert-triangle text-danger fs-4'></i>;
        } else if (diasAtraso > 5) {
            corCard = "amarelo";
            icone = <i className='bxr bx-alert-triangle text-warning fs-4'></i>;
        }
    }

    //logica de navegacao dos botoes - comeca no SERVICOS_PAGAMENTO_PENDENTE
    let rotaDestino = `pendente`;

    if (categoria === "SERVICOS_NOTA_FISCAL_PENDENTE") {
        rotaDestino = `xxx`; //falta tela?
    }

    if (categoria === "SERVICOS_PAGAMENTO_REALIZADO") {
        rotaDestino = `xxx`; //falta tela?
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
            <div className="small mt-1">
                <strong>Placa:</strong> {os.veiculo?.placa}
            </div>
            <hr className="my-2" />
            <div className="small">
                <div><strong>Total do Serviço:</strong> R$ {os.valor_total?.toLocaleString('pt-BR') || '0,00'}</div>
                {categoria === "SERVICOS_PAGAMENTO_REALIZADO" ? (
                    <div><strong>Data de Finalização:</strong> <b className="cor-fonte-verde">{os.data_saida_efetiva ? new Date(os.data_saida_efetiva).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '---'}</b></div>
                ) : (
                    <div><strong>Dias em espera:</strong> <b className={`cor-fonte-${corCard}`}>{diasAtraso} Dias</b></div> //validar - data errada
                )}
            </div>

            {/* BOTÃO COM ROTA E TEXTO DINÂMICO */}
            <button
                className={`btn w-100 mt-3 btn-status-${corCard}`}
                onClick={() => navigate(rotaDestino)}
            >
                Analisar
            </button>
        </ServicoCard>
    );
}

export default AnaliseFinanceira;