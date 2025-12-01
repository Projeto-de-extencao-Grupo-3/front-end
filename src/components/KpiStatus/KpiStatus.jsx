import './KpiStatus.css';

const cores = {
  verde: {
    cor1: "#4CAF50",
    cor2: "#7CCD7C",
    corTexto: "white"
  },
  vermelho: {
    cor1: "#D6244A",
    cor2: "#E84561",
    corTexto: "white"
  },
  amarelo: {
    cor1: "#FFE57F",
    cor2: "#FCD44C",
    corTexto: "black"
  }
};

function KpiStatus({ status, valor, descricao, cor }) {
  const estilo = cores[cor];

  return (
    <div
      className="kpi-card"
      style={{
        '--cor1': estilo.cor1,
        '--cor2': estilo.cor2,
        '--cor-texto': estilo.corTexto
      }}
    >
      <h6 className="kpi-status">{status}</h6>
      <h4 className="kpi-valor">{valor}</h4>
      <span className="kpi-descricao">{descricao}</span>
    </div>
  );
}

export default KpiStatus;
