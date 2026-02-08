import "./StepperFluxo.css";

//recebe as etapas do fluxo, cada etapa tem id, label, status (concluido, em-andamento, pendente) e icon (classe do ícone)
function StepperFluxo({ etapas = [] }) {
  return (
    <div className="stepper-container">
      {etapas.map((etapa, index) => {
        const etapaAnterior = etapas[index - 1];

        // Define a classe da linha com base no status da etapa anterior
        let classeLinha = "stepper-line line-pendente";
        if (etapaAnterior && etapaAnterior.status === "concluido") {
          classeLinha = "stepper-line line-concluida";
        }
        
        //define o ícone da etapa, se a etapa estiver concluída, mostra o ícone de check, caso contrário, mostra o ícone definido na etapa
        let icone = <i className={etapa.icon}></i>;
        if (etapa.status === "concluido") {
          icone = <i className="bx bx-check"></i>;
        }

        // retyrn do componente, se for a primeira etapa, não renderiza a linha, caso contrário, renderiza a linha com a classe definida anteriormente
        return (
          <div key={etapa.id} className="stepper-item">
            
            {index !== 0 && <div className={classeLinha} />}

            <div className={`stepper-circle ${etapa.status}`}>
              {icone}
            </div>

            <span className="stepper-label">{etapa.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default StepperFluxo;
