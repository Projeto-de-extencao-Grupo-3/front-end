import './ServicoCard.css';

const cores = {
  verde: { cor: "#52B256" },
  vermelho: { cor: "#DD1B42" },
  amarelo: { cor: "#ebc429ff" }
};

function ServicoCard({ cor, children }) {
  const estilo = cores[cor];

  return (
    <div
      className="servico-card"
      style={{ '--cor': estilo.cor }}
    >
      {children}
    </div>
  );
}

export default ServicoCard;
