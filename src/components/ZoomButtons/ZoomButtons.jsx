import { useState } from "react";
import "./ZoomButtons.css";

function ZoomButtons({ compacta }) {
  const [zoom, setZoom] = useState(1);
  const [aberto, setAberto] = useState(false);

  function ajustarZoom(delta) {
    setZoom((atual) => {
      const novo = Math.min(Math.max(atual + delta, 1), 1.3);
      document.body.style.zoom = novo;
      return novo;
    });
  }

  return (
    <div className={`zoom-sidebar-container ${compacta ? "zoom-compacto" : "zoom-expandido"}`}>
      {/* Na sidebar expandida, mostramos o controle horizontal sempre visível */}
      {!compacta ? (
        <div className="zoom-content-full">
          <span className="zoom-label">Visualização</span>
          <div className="zoom-controls">
            <button className="zoom-action-btn" onClick={() => ajustarZoom(-0.1)} title="Diminuir">
              <i className='bx bx-minus'></i>
            </button>
            <span className="zoom-value">{Math.round(zoom * 100)}%</span>
            <button className="zoom-action-btn" onClick={() => ajustarZoom(0.1)} title="Aumentar">
              <i className='bx bx-plus'></i>
            </button>
          </div>
        </div>
      ) : (
        /* Na sidebar compacta, mostramos a lupa que abre o menu flutuante */
        <div className="zoom-content-mini">
          {aberto && (
            <div className="zoom-mini-actions">
              <button className="zoom-mini-btn" onClick={() => ajustarZoom(0.1)}>+</button>
              <button className="zoom-mini-btn" onClick={() => ajustarZoom(-0.1)}>−</button>
            </div>
          )}
          <button
            className="zoom-mini-main"
            onClick={() => setAberto(!aberto)}
          >
            <i className="bx bx-search" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ZoomButtons;