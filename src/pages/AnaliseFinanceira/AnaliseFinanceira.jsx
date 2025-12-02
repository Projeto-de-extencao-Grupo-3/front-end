import './AnaliseFinanceira.css';
import Layout from '../../components/Layout/Layout';

function AnaliseFinanceira() {
    return (
        <Layout ativo={"financeiro"}>
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
        </Layout>
    );
}

export default AnaliseFinanceira