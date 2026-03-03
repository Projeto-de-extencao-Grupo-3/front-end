import "./OrdemServicoCard.css";

function OrdemServicoCard({ placa }) {
  return (
    <div className="dados-reconhecidos">
      <div className="bus-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM6 6h12v5H6V6z" />
        </svg>
      </div>

      <div className="section">
        <p>Ordem de Serviço #0001</p>
        <p>Marcopolo G8 - 1200</p>
      </div>

      <div className="divider" />

      <div className="section">
        <p>Empresa: Sussantur</p>
        <p>Placa: {placa}</p>
      </div>
    </div>
  );
}

export default OrdemServicoCard;