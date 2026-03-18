import "./OrdemServicoCard.css";

function OrdemServicoCard({ marca, modelo, prefixo, cliente, idOrdemServico, placa }) {
  return (
    <div className="dados-reconhecidos">
      <div className="bus-icon">
        <i className='bx bxs-bus' style={{ fontSize: "38px" }}></i>
      </div>

      <div className="section">
        <p>Ordem de Serviço {idOrdemServico || "#0001"}</p>
        <p>{marca} {modelo} - {prefixo}</p>
      </div>

      <div className="divider" />

      <div className="section">
        <p>Empresa: {cliente}</p>
        <p>Placa: {placa}</p>
      </div>
    </div>
  );
}

export default OrdemServicoCard;