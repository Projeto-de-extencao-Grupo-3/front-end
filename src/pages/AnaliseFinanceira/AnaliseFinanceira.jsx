import './AnaliseFinanceira.css';
import Layout from '../../components/Layout/Layout';
import KpiStatus from "../../components/KpiStatus/KpiStatus";

function AnaliseFinanceira() {
    return (
        <Layout ativo={"financeiro"}>

            <div className="d-flex flex-column">

                {/* CABECALHO */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex flex-column">
                        <h2 className="m-0">Análise Financeira</h2>
                        <span className="fs-5 text-muted">
                            Visão geral da situação financeira no mês de <b id='mes-filtro'>Setembro/2025</b>
                        </span>
                    </div>

                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-dark d-flex align-items-center gap-1">
                            Selecionar outro mês <i className='bx bx-calendar'></i>
                        </button>

                        <button className="btn btn-dark d-flex align-items-center gap-1">
                            Gerar relatório mensal <i class='bxr  bxs-clipboard-detail'></i>
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-grow-1 gap-3 justify-content-between flex-wrap">
                    <KpiStatus
                        cor="verde"
                        status="Aguardando Entrada"
                        valor="2 veículos"
                        descricao="Agendados"
                        ativo={false}
                        onClick={() => console.log("entrada")}
                    />

                    <KpiStatus
                        cor="vermelho"
                        status="Aguardando Orçamento"
                        valor="2 veículos"
                        descricao="Pendentes"
                        ativo={false}
                        onClick={() => console.log("orcamento")}
                    />

                    <KpiStatus
                        cor="vermelho"
                        status="Aguardando Autorização"
                        valor="4 veículos"
                        descricao="Para aprovar"
                        ativo={false}
                        onClick={() => console.log("autorizacao")}
                    />

                </div>

            </div>
        </Layout>
    );
}

export default AnaliseFinanceira