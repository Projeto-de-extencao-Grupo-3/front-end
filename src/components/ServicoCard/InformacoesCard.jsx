import './ServicoCard.css';

function InformacoesCard({ titulo, icone, children }) {

  return (
    <div className="servico-card-2">
      <div className="card-header">
        <span>{titulo}</span>
        <i className={icone}></i> 
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default InformacoesCard;