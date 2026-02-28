import "./veiculo&empresa.css";

function VeiculoEEmpresa({ aberto, aoFechar }) {
    if (!aberto) return null;

    return (
        <div className="fundo-modal" onClick={aoFechar}>
            <div className="caixa-modal" onClick={(e) => e.stopPropagation()}>

                <h1 className="titulo-modal">
                    Informações
                </h1>

                {/* SEÇÃO VEÍCULO */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Informações do Veículo</h2>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Marca*</label>
                            <input type="text" defaultValue="Marcopolo" />
                        </div>

                        <div className="campo">
                            <label>Modelo*</label>
                            <input type="text" defaultValue="G8" />
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Placa*</label>
                            <input type="text" defaultValue="ABC-1234" />
                        </div>

                        <div className="campo">
                            <label>Prefixo*</label>
                            <input type="text" defaultValue="1200" />
                        </div>
                    </div>

                    <div className="campo">
                        <label>Ano/Modelo*</label>
                        <input type="text" placeholder="Ex: 2020" />
                    </div>
                </div>

                {/* SEÇÃO CLIENTE */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Informações do Cliente</h2>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>CPF/CNPJ*</label>
                            <input type="text" defaultValue="94065670000130" />
                        </div>

                        <div className="campo">
                            <label>Nome/Razão Social*</label>
                            <input type="text" defaultValue="Sussantur Turismo LTDA" />
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Telefone*</label>
                            <input type="text" defaultValue="(11) 91234-3210" />
                        </div>

                        <div className="campo">
                            <label>Email*</label>
                            <input type="email" defaultValue="cliente@mail.com" />
                        </div>
                    </div>

                    <div className="linha-unica">
                        <span>Tipo de Cliente</span>
                        <div className="radio-grupo">
                            <input  className="checkBox" type="radio" />
                            <span>Empresa</span>
                        </div>
                    </div>
                </div>

                <button className="botao-fechar" onClick={aoFechar}>
                    Fechar
                </button>

            </div>
        </div>
    );
}

export default VeiculoEEmpresa;