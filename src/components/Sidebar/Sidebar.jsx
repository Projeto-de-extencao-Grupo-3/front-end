import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar col-12 col-md-4 col-lg-2 d-flex flex-column p-3">

      {/* LOGO */}
      <div className="d-flex align-items-center mb-4 logo-box">
        <img src="/src/assets/images/logo.svg" className="logo-img" alt="Logo" />

        <div className="ms-2">
          <h5 className="m-0 fw-bold">GROTrack</h5>
          <small className="text-white-50">
            Sistema de Gestão da Geosmar<br />
            Reformadora de Ônibus
          </small>
        </div>
      </div>

      {/* NAV */}
      <ul className="menu list-unstyled flex-grow-1">
        <li><i class='bxr  bxs-layout-search' style={{ fontSize: "25px"}}></i>  Painel de Controle</li>
        <li><i class='bxr  bxs-chart-trend' style={{ fontSize: "25px" }}></i> Análise Financeira</li>
        <li><i class='bxr  bxs-group' style={{ fontSize: "25px" }}></i>  Clientes</li>
        <li><i class='bxr  bxs-spanner' style={{ fontSize: "25px" }}></i>  Serviços</li>
        <li><i class='bxr  bxs-package' style={{ fontSize: "25px" }}></i>  Estoque</li>
        <li><i class='bxr  bxs-briefcase-alt-2' style={{ fontSize: "25px" }}></i>  Funcionários</li>
        <li><i class='bxr  bxs-bus' style={{ fontSize: "25px" }}></i>  Veículos</li>
      </ul>

      {/* CARD DO USUARIO */}
      <div className="user-card p-2 rounded mb-3">
        <div className="d-flex align-items-center gap-2">

          {/* div da foto */}
          <div ><i class='bxr  bxs-user-circle' style={{ fontSize: "45px" }}></i>  </div>

          <div>
            <strong className="fs-6">José da Silva</strong>
            <div className="fs-6 text-muted" style={{ fontSize: "13px" }}>
              Chefe de Produção
            </div>
          </div>
        </div>
      </div>

      {/* SAIR */}
      <button className="logout-btn btn w-100 text-start">
        <i className="me-2">↩</i> Sair
      </button>

    </div>
  );
}

export default Sidebar;
