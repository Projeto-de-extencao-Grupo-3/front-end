import './KpiStatus.css';

const cores = {
  verde: {
    cor1: "#52B256",
    cor2: "#75C178",
    corBorda:"#4B7F61",
    corTexto: "white"
  },
  vermelho: {
    cor1: "#DD1B42",
    cor2: "#E44968",
    corBorda:"#760118",
    corTexto: "white"
  },
  amarelo: {
    cor1: "#FFE26F",
    cor2: "#FFE689",
    corBorda:"#D5AA00",
    corTexto: "black"
  }
};

function KpiStatus({ status, valor, descricao, cor, ativo, onClick }) {
  const estilo = cores[cor];

  return (
    <div
      className={`kpi-card ${ativo ? "ativo" : ""}`}
      style={{
        '--cor1': estilo.cor1,
        '--cor2': estilo.cor2,
        '--cor-texto': estilo.corTexto,
        '--cor-borda': estilo.corBorda    // border usa a cor principal
      }}
      onClick={onClick}
    >
      <h6 className="kpi-status">{status}</h6>
      <h4 className="kpi-valor">{valor}</h4>
      <span className="kpi-descricao ">{descricao}</span>
    </div>
  );
}

export default KpiStatus;