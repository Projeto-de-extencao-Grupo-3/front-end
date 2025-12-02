import './ServicoCard.css';

const cores = {
  verde: {
    cor: "#52B256",
  },
  vermelho: {
    cor: "#DD1B42",
  },
  amarelo: {
    cor: "#FFE26F",
  }
};

function ServicoCard({cor}) {
  const estilo = cores[cor];

  return (
    <div
      className={"servico-card"}
      style={{
        '--cor': estilo.cor,
      }}
    >
      <h1>oi</h1>
    </div>
  );
}

export default ServicoCard;