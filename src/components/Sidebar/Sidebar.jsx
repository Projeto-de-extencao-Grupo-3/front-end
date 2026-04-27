import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Sidebar({ ativo }) {

  const navigate = useNavigate();
  const [sidebarFixada, setSidebarFixada] = useState(() => {
    const estadoSalvo = sessionStorage.getItem("SIDEBAR_FIXADA");
    return estadoSalvo === null ? true : estadoSalvo === "true";
  });
  const [sidebarEmHover, setSidebarEmHover] = useState(false);
  const [sidebarMobileAberta, setSidebarMobileAberta] = useState(true);

  const [usuario, _setUsuario] = useState(() => {
    const nomeSalvo = sessionStorage.getItem("NOME_USUARIO");
    const cargoSalvo = sessionStorage.getItem("CARGO_USUARIO");

    return {
      nome: nomeSalvo || "Usuário",
      cargo: cargoSalvo || "Colaborador"
    };
  });

  const estaTabletOuMobile = window.innerWidth < 992;
  const sidebarAberta = estaTabletOuMobile ? sidebarMobileAberta : sidebarFixada || sidebarEmHover;
  const sidebarCompacta = !estaTabletOuMobile && !sidebarFixada && !sidebarEmHover;

  const alternarSidebar = () => {
    if (estaTabletOuMobile) {
      setSidebarMobileAberta((prev) => !prev);
      return;
    }

    setSidebarFixada((prev) => !prev);
    setSidebarEmHover(false);
  };

  useEffect(() => {
    sessionStorage.setItem("SIDEBAR_FIXADA", String(sidebarFixada));
  }, [sidebarFixada]);

  const fecharSidebarNoTablet = () => {
    if (window.innerWidth < 992) {
      setSidebarMobileAberta(false);
    }
  };

  const navegarPara = (rota) => {
    navigate(rota);
    fecharSidebarNoTablet();
  };

  const mostrarSidebarNoHover = () => {
    if (!estaTabletOuMobile && !sidebarFixada) {
      setSidebarEmHover(true);
    }
  };

  const ocultarSidebarNoHover = () => {
    if (!estaTabletOuMobile && !sidebarFixada) {
      setSidebarEmHover(false);
    }
  };

  return (
    <>
      {estaTabletOuMobile && (
        <button
          type="button"
          className="btn btn-dark sidebar-toggle-btn"
          onClick={alternarSidebar}
          aria-label={sidebarAberta ? "Fechar menu lateral" : "Abrir menu lateral"}
        >
          <i className={`bx ${sidebarAberta ? "bx-x" : "bx-menu"}`} />
        </button>
      )}

      {sidebarAberta && estaTabletOuMobile && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setSidebarMobileAberta(false)}
        />
      )} 

    <div
      className={`sidebar ${estaTabletOuMobile ? "sidebar-mobile" : sidebarCompacta ? "sidebar-compacta" : "sidebar-expandida"} ${estaTabletOuMobile ? (sidebarAberta ? "show d-flex" : "d-none") : "d-flex"} col-12 col-md-4 col-lg-2 flex-column p-3`}
      style={{ height: "100vh", position: "sticky", top: 0, overflowY: "auto" }}
      // onMouseEnter={mostrarSidebarNoHover}
      // onMouseLeave={ocultarSidebarNoHover}  
    >
      {/* LOGO */}
      <div className="d-flex align-items-center mb-3 logo-box">
        <img src="/src/assets/images/logoEscura.svg" className="logo-img" alt="Logo" />

        <div className="ms-2 logo-texto">
          <h5 className="m-0 fw-bold">GROTrack</h5>
          {/* <small className="text-white-50">
            Sistema de Gestão da Geosmar
            Reformadora
          </small> */}
        </div>

        {estaTabletOuMobile && (
          <button
            type="button"
            className="btn btn-sm btn-outline-light ms-auto"
            onClick={() => setSidebarMobileAberta(false)}
            aria-label="Fechar menu lateral"
          >
            <i className="bx bx-x" />
          </button>
        )}
      </div>

      {!estaTabletOuMobile && (
        <button
          type="button"
          className="btn mb-3 btn-sm btn-outline-light sidebar-desktop-toggle-btn"
          onClick={alternarSidebar}
          aria-label={sidebarFixada ? "Recolher menu lateral" : "Fixar menu lateral"}
        >
          <i className={`bx ${sidebarFixada ? "bx-chevrons-left" : "bx-chevrons-right"}`} />
          {sidebarFixada ? <span className="ms-1">Fechar Barra Lateral</span> : null}
        </button>
      )}


      {/* NAV */}
      {/* Checa qual ta ativo para aplicar estilo, !!atenção aos nomes!! */}
      <ul className="menu list-unstyled flex-grow-1">
        <li className={ativo === "painel" ? "ativo" : ""} onClick={() => navegarPara("/painelControle")}>
          <i className='bx bxs-layout' style={{ fontSize: "25px" }}></i>
          <span className="menu-texto">Painel de Controle</span>
        </li>

        <li className={ativo === "financeiro" ? "ativo" : ""} onClick={() => navegarPara("/analiseFinanceira")}>
          <i className='bx  bx-chart-bar-columns' style={{ fontSize: "25px" }} ></i>
          <span className="menu-texto">Análise Financeira</span>
        </li>

        <li className={ativo === "clientes" ? "ativo" : ""} onClick={() => navegarPara("/clientes")}>
          <i className='bx bxs-group' style={{ fontSize: "25px" }}></i>
          <span className="menu-texto">Clientes</span>
        </li>

        {/* <li className={ativo === "servicos" ? "ativo" : ""}>
          <i className='bx bxs-spanner' style={{ fontSize: "25px" }}></i> Serviços
        </li> */}

        <li className={ativo === "estoque" ? "ativo" : ""} onClick={() => navegarPara("/estoque")}>
          <i className='bx bxs-package' style={{ fontSize: "25px" }}></i>
          <span className="menu-texto">Estoque</span>
        </li>

        <li className={ativo === "funcionarios" ? "ativo" : ""} onClick={() => navegarPara("/funcionarios")}>
          <i className='bx bxs-briefcase-alt-2' style={{ fontSize: "25px" }}></i>
          <span className="menu-texto">Funcionários</span>
        </li>

        {/* <li className={ativo === "veiculos" ? "ativo" : ""}>
          <i className='bx bxs-bus' style={{ fontSize: "25px" }}></i> Veículos
        </li> */}
      </ul>

      {/* CARD DO USUARIO */}
      <div className="user-card p-2 rounded mb-3">
        <div className="d-flex align-items-center gap-2">
          <div ><i className='bx bxs-user-circle' style={{ fontSize: "45px" }}></i></div>
          <div className="user-card-texto">
            <strong className="fs-6">{usuario.nome || "Não autenticado"}</strong>
            <div className="fs-6 text-muted" style={{ fontSize: "13px" }}>
              {usuario.cargo || "Não autenticado"}
            </div>
          </div>
        </div>
      </div>

      {/* SAIR */}
      <button className="logout-btn btn w-100 text-start" onClick={() => navegarPara("/")}>
        <i className="me-2" >↩</i>
        <span className="menu-texto">Sair</span>
      </button>
    </div>
    </>
  );
}

export default Sidebar;
