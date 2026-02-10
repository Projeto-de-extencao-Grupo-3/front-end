import { useState } from "react";
import "./ZoomButtons.css";

function ZoomButtons({ min = 1, max = 1.3, step = 0.1 }) {
  const [zoom, setZoom] = useState(1);
  const [aberto, setAberto] = useState(false);

  function zoomIn() {
    setZoom((atual) => {
      if (atual >= 1.3) return atual;
      const novo = atual + 0.1;
      document.body.style.zoom = novo;
      return novo;
    });
  }

  function zoomOut() {
    setZoom((atual) => {
      if (atual == 1) return atual;
      const novo = atual - 0.1;
      document.body.style.zoom = novo;
      return novo;
    });
  }

  return (
    <div className="zoom-fab">
      {aberto && (
        <div className="zoom-actions">
          <button className="zoom-btn" onClick={zoomOut}>−</button>
          <button className="zoom-btn" onClick={zoomIn}>+</button>
        </div>
      )}

      <button
        className="zoom-main d-flex align-items-center justify-content-center"
        onClick={() => setAberto(!aberto)}
        title="Zoom"
      >
        <i class="bx bx-search" />
      </button>
    </div>
  );
}

export default ZoomButtons;
