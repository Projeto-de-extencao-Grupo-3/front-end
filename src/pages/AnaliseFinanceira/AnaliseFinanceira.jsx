import './AnaliseFinanceira.css';
import Layout from '../../components/Layout/Layout';
import KpiStatus from "../../components/KpiStatus/KpiStatus";
import ServicoCard from '../../components/ServicoCard/ServicoCard';

function AnaliseFinanceira() {
    return (
        <Layout ativo={"financeiro"}>

            <div className="analise-financeira d-flex flex-column w-100">

                {/* CABEÇALHO */}
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
                            Gerar relatório mensal <i className='bx bxs-clipboard-detail'></i>
                        </button>
                    </div>
                </div>

                <div className="d-flex justify-content-between w-100 row">

                    {/* RAIA 1 */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-4">

                        <KpiStatus
                            cor="azul"
                            status="Total de serviços a receber"
                            valor="R$ 17.000,00 (5 serviços)"
                        />

                        <p className="texto-raia">Serviços aguardando pagamento</p>

                        <ServicoCard cor="amarelo">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "#ebc429ff" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Caio Induscar Apache VIP V
                            </div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Caio Induscar Apache VIP V
                            </div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                    </div>

                    {/* RAIA 2 */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-4">

                        <KpiStatus
                            cor="vermelho"
                            status="Serviços com nota fiscal pendente"
                            valor="5 Serviços"
                        />

                        <p className="texto-raia">Serviços finalizados mas sem emissão de NF</p>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Caio Induscar Apache VIP V
                            </div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Caio Induscar Apache VIP V
                            </div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                    </div>

                    {/* RAIA 3 */}
                    <div className="col-12 col-md-4 d-flex flex-column gap-4">

                        <KpiStatus
                            cor="verde"
                            status="Serviços com pagamento realizado"
                            valor="3 Serviços"
                        />

                        <p className="texto-raia">Serviços já pagos e concluídos</p>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Viação Gontijo
                            </strong>

                            <strong>OS#0047</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Caio Induscar Apache VIP V
                            </div>
                            <div><strong>Placa:</strong> LHS-7045</div>

                            <hr />

                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">20 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                    </div>

                </div>

            </div>
        </Layout>
    );
}

export default AnaliseFinanceira;
