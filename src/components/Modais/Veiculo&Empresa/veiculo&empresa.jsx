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
                            <div className="valor-campo">Marcopolo</div>
                        </div>

                        <div className="campo">
                            <label>Modelo*</label>
                            <div className="valor-campo">G8</div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Placa*</label>
                            <div className="valor-campo">ABC-1234</div>
                        </div>

                        <div className="campo">
                            <label>Prefixo*</label>
                            <div className="valor-campo">1200</div>
                        </div>
                    </div>

                    <div className="campo">
                        <label>Ano/Modelo*</label>
                        <div className="valor-campo">2020</div>
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
                            <div className="valor-campo">94065670000130</div>
                        </div>

                        <div className="campo">
                            <label>Nome/Razão Social*</label>
                            <div className="valor-campo">Sussantur Turismo LTDA</div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Telefone*</label>
                            <div className="valor-campo">(11) 91234-3210</div>
                        </div>

                        <div className="campo">
                            <label>Email*</label>
                            <div className="valor-campo">cliente@mail.com</div>
                        </div>
                    </div>

                    <div className="linha-unica">
                        <span>Tipo de Cliente</span>
                        <div className="radio-grupo">
                            <input className="checkBox" type="radio" readOnly />
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