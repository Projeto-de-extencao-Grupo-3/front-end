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
                            status="Total a receber dos serviços"
                            valor="R$42.700,00 (5 serviços)"
                        />

                        <p className="texto-raia">Pagamento com pendência</p>

                        <ServicoCard cor="amarelo">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "#ebc429ff" }}></i>
                                Auto Viação 1001
                            </strong>

                            <strong>OS#3114</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Busscar Vissta Buss 400
                            </div>
                            <div><strong>Placa:</strong> LKP-8821</div>

                            <hr />

                            <div><strong>Total do serviço:</strong> R$ 6.750</div>
                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">6 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Real Expresso
                            </strong>

                            <strong>OS#3149</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Irizar i6S
                            </div>
                            <div><strong>Placa:</strong> REA-3030</div>

                            <hr />

                            <div><strong>Total do serviço:</strong> R$ 7.150</div>
                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">3 Dias</b></div>

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
                            valor="2 Serviços"
                        />

                        <p className="texto-raia">Nota fiscal com pendência</p>

                        <ServicoCard cor="vermelho">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-alert-triangle' style={{ fontSize: "25px", color: "red" }}></i>
                                Expresso Guanabara
                            </strong>

                            <strong>OS#3135</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Marcopolo Paradiso New G7 1200
                            </div>
                            <div><strong>Placa:</strong> OCP-9102</div>

                            <hr />

                            <div><strong>Total do serviço:</strong> R$ 14.900</div>
                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">21 Dias</b></div>

                            <div className="d-flex gap-2 mt-3">
                                <button className="btn btn-status flex-grow-1">Analisar</button>
                            </div>
                        </ServicoCard>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                GaelTur
                            </strong>

                            <strong>OS#3165</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Comil Campione 3.25
                            </div>
                            <div><strong>Placa:</strong> KJH-4567</div>

                            <hr />

                            <div><strong>Total do serviço:</strong> R$3.800</div>
                            <div><strong>Dias em espera:</strong> <b className="cor-fonte">2 Dias</b></div>

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
                            valor="1 Serviços"
                        />

                        <p className="texto-raia">Concluídos sem pendência</p>

                        <ServicoCard cor="verde">
                            <strong className="d-flex align-items-center gap-2">
                                <i className='bx bxs-check-circle' style={{ fontSize: "25px", color: "green" }}></i>
                                Nilson Turismos
                            </strong>

                            <strong>OS#3178</strong>
                            <div className="d-flex align-items-center gap-1">
                                <i className='bx bxs-bus' style={{ fontSize: "22px" }}></i>
                                Marcopolo Paradiso G7 1600 LD
                            </div>
                            <div><strong>Placa:</strong> BRL-9988</div>

                            <hr />

                            <div><strong>Total do serviço:</strong> R$ 10.100</div>
                            <div><strong>Data de finalização: </strong>12/09/2025</div>

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
