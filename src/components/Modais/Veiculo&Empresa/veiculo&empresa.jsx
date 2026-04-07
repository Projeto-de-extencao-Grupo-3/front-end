import "./veiculo&empresa.css";

function VeiculoEEmpresa({ isOpen, onClose, dadosRecebidos }) {
   
    if (!isOpen) return null;

    return (
        <div className="fundo-modal" onClick={onClose}>
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
                            <div className="valor-campo">{dadosRecebidos.marca}</div>
                        </div>

                        <div className="campo">
                            <label>Modelo*</label>
                            <div className="valor-campo">{dadosRecebidos.modelo} </div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Placa*</label>
                            <div className="valor-campo">{dadosRecebidos.placa}</div>
                        </div>

                        <div className="campo">
                            <label>Prefixo*</label>
                            <div className="valor-campo">{dadosRecebidos.prefixo}</div>
                        </div>
                    </div>

                    <div className="campo">
                        <label>Ano/Modelo*</label>
                        <div className="valor-campo">{dadosRecebidos.ano}</div>
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
                            <div className="valor-campo">{dadosRecebidos.cpf}</div>
                        </div>

                        <div className="campo">
                            <label>Nome/Razão Social*</label>
                            <div className="valor-campo">{dadosRecebidos.nome}</div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Telefone*</label>
                            <div className="valor-campo">{dadosRecebidos.telefone}</div>
                        </div>

                        <div className="campo">
                            <label>Email*</label>
                            <div className="valor-campo">{dadosRecebidos.email}</div>
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

                <button className="botao-fechar" onClick={onClose}>
                    Fechar
                </button>

            </div>
        </div>
    );
}

export default VeiculoEEmpresa;