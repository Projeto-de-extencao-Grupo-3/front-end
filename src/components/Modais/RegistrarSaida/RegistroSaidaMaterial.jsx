import { createPortal } from "react-dom";
import "./RegistroSaidaMaterial.css";

function RegistroSaidaMaterial({ aberto, aoConfirmar, aoCancelar, dados }) {
    if (!aberto) return null;

    // dados esperados:
    // { codigo, itemProduto, visibilidade, quantidadeSaida, precoPorUnidade, quantidadeEstoque }

    const qtdSaida = Number(dados?.quantidadeSaida || 0);
    const qtdEstoque = Number(dados?.quantidadeEstoque || 0);
    const resultado = qtdEstoque - qtdSaida;
    const insuficiente = qtdSaida > qtdEstoque;

    return createPortal(
        <div className="rsm-fundo" onClick={aoCancelar}>
            <div className="rsm-caixa" onClick={(e) => e.stopPropagation()}>

                <h2 className="rsm-titulo">Registro de Saída de Material</h2>

                {/* ALERTA */}
                {insuficiente && (
                    <div className="rsm-alerta">
                        <span className="rsm-alerta-icone">!</span>
                        Não é possível registrar saída deste material no estoque! Você não possui a quantidade suficiente!
                    </div>
                )}

                {/* SEÇÃO MATERIAL */}
                <div className="rsm-secao">
                    <div className="rsm-cabecalho-secao">
                        <span className="rsm-secao-icone">☰</span>
                        <span>Informações do Material</span>
                    </div>

                    <div className="rsm-linha-dupla">
                        <div className="rsm-campo rsm-campo-fixo">
                            <label>Codigo</label>
                            <div className="rsm-valor">{dados?.codigo || "—"}</div>
                        </div>
                        <div className="rsm-campo">
                            <label>Item/Produto</label>
                            <div className="rsm-valor">{dados?.itemProduto || "—"}</div>
                        </div>
                    </div>

                    <div className="rsm-campo">
                        <label>Visibilidade</label>
                        <div className="rsm-radio-grupo">
                            <input type="radio" readOnly checked className="rsm-radio" />
                            <span>{dados?.visibilidade || "Privado"}</span>
                        </div>
                    </div>

                    <div className="rsm-linha-dupla">
                        <div className="rsm-campo">
                            <label>Quantidade de Saída</label>
                            <div className="rsm-valor">{qtdSaida} Unidades</div>
                        </div>
                        <div className="rsm-campo">
                            <label>Preço por Unidade (R$)</label>
                            <div className="rsm-valor">R$ {dados?.precoPorUnidade || "0,00"}</div>
                        </div>
                    </div>
                </div>

                {/* SEÇÃO ESTOQUE */}
                <div className="rsm-secao">
                    <div className="rsm-cabecalho-secao">
                        <span className="rsm-secao-icone">$</span>
                        <span>Informações do Estoque</span>
                    </div>

                    <div className="rsm-info-linha">
                        <span>Quantidade em Estoque:</span>
                        <strong>{qtdEstoque} Unidades</strong>
                    </div>
                    <div className="rsm-info-linha">
                        <span>Quantidade de Saída:</span>
                        <strong>{qtdSaida} Unidades</strong>
                    </div>

                    <div className="rsm-divisor" />

                    <div className={`rsm-info-linha rsm-resultado ${insuficiente ? "rsm-resultado-erro" : ""}`}>
                        <span>Resultado Estoque:</span>
                        <strong>{insuficiente ? "Insuficiente" : `${resultado} Unidades`}</strong>
                    </div>
                </div>

                {/* BOTÕES */}
                <div className="rsm-botoes">
                    <button
                        className={`rsm-btn rsm-btn-confirmar ${insuficiente ? "rsm-btn-desabilitado" : ""}`}
                        onClick={() => !insuficiente && aoConfirmar(dados)}
                        disabled={insuficiente}
                    >
                        Confirmar
                    </button>
                    <button className="rsm-btn rsm-btn-cancelar" onClick={aoCancelar}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
}

export default RegistroSaidaMaterial;
