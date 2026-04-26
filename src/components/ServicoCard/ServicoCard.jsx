import './ServicoCard.css';

const cores = {
  verde: {
    cor: "#52B256",
    borda: "0 0 0 5px"
  },
  vermelho: {
    cor: "#DD1B42",
    borda: "5px 5px 5px 5px"
  },
  amarelo: {
    cor: "#ebc429ff",
    borda: "0 0 0 5px"
  }
};

function ServicoCard({ cor, children, className = "" }) {
  const estilo = cores[cor];

  return (
    <div
      className={`servico-card ${className}`.trim()}
      style={{ '--cor': estilo.cor, '--borda': estilo.borda }}
    >
      {children}
    </div>
  );
}

export default ServicoCard;
