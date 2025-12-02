import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

function Sidebar({ ativo }) {

  const navigate = useNavigate();


  return (
    
    <div className="sidebar col-12 col-md-4 col-lg-2 d-flex flex-column p-3">
      {/* LOGO */}
      <div className="d-flex align-items-center mb-4 logo-box">
        <img src="/src/assets/images/logoEscura.svg" className="logo-img" alt="Logo" />

        <div className="ms-2">
          <h5 className="m-0 fw-bold">GROTrack</h5>
          <small className="text-white-50">
            Sistema de Gestão da Geosmar<br />
            Reformadora de Ônibus
          </small>
        </div>
      </div>

      {/* NAV */}
      {/* Checa qual ta ativo para aplicar estilo, !!atenção aos nomes!! */}
      <ul className="menu list-unstyled flex-grow-1">
        <li className={ativo === "painel" ? "ativo" : ""} onClick={() => navigate("/painelControle")}>
          <i class='bx bxs-layout' style={{ fontSize: "25px" }}></i>  Painel de Controle
        </li>

        <li className={ativo === "financeiro" ? "ativo" : ""} onClick={() => navigate("/analiseFinanceira")}>
          <i class='bx  bx-chart-bar-columns' style={{ fontSize: "25px" }} ></i> Análise Financeira
        </li>

        <li className={ativo === "clientes" ? "ativo" : ""}>
          <i class='bx bxs-group' style={{ fontSize: "25px" }}></i> Clientes
        </li>

        <li className={ativo === "servicos" ? "ativo" : ""}>
          <i class='bx bxs-spanner' style={{ fontSize: "25px" }}></i> Serviços
        </li>

        <li className={ativo === "estoque" ? "ativo" : ""}>
          <i class='bx bxs-package' style={{ fontSize: "25px" }}></i> Estoque
        </li>

        <li className={ativo === "funcionarios" ? "ativo" : ""}>
          <i class='bx bxs-briefcase-alt-2' style={{ fontSize: "25px" }}></i> Funcionários
        </li>

        <li className={ativo === "veiculos" ? "ativo" : ""}>
          <i class='bx bxs-bus' style={{ fontSize: "25px" }}></i> Veículos
        </li>
      </ul>

      {/* CARD DO USUARIO */}
      <div className="user-card p-2 rounded mb-3">
        <div className="d-flex align-items-center gap-2">
          <div ><i class='bx bxs-user-circle' style={{ fontSize: "45px" }}></i></div>
          <div>
            <strong className="fs-6">José da Silva</strong>
            <div className="fs-6 text-muted" style={{ fontSize: "13px" }}>
              Chefe de Produção
            </div>
          </div>
        </div>
      </div>

      {/* SAIR */}
      <button className="logout-btn btn w-100 text-start" onClick={() => navigate("/")}>
        <i className="me-2" >↩</i> Sair
      </button>
    </div>
  );
}

export default Sidebar;
