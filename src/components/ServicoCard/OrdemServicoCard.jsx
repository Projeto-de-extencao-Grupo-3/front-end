import "./OrdemServicoCard.css";

function OrdemServicoCard({ placa }) {
  return (
    <div className="dados-reconhecidos">
      <div className="bus-icon">
        <i class='bx bxs-bus' style={{ fontSize: "38px" }}></i>
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