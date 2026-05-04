import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import "./RegistroSaidaMaterial.css";
import ListarQuantidade from "../../../service/Produtos";
import { formatarTexto } from "../../../utils/formatarTexto.js";

function RegistroSaidaMaterial({ aberto, aoConfirmar, aoCancelar, produto }) {
    const { listarProdutosById } = ListarQuantidade();
    const [infoDoProdutoEstoque, setInfoDoProdutoEstoque] = useState(null);
    const [qtdEfetiva, setQtdEfetiva] = useState(0);

    const infoDoProdutoEstoqueGet = async () => {
        if (!produto) return;
        try {
            const dados = await listarProdutosById(produto.id_produto_estoque);
            setInfoDoProdutoEstoque({ ...dados });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (aberto) {
            infoDoProdutoEstoqueGet();
            setQtdEfetiva(Number(produto?.quantidade || 0));
        }
    }, [produto, aberto]);

    if (!aberto) return null;

    const qtdPlanejada = Number(produto?.quantidade || 0);
    const qtdEstoque = Number(infoDoProdutoEstoque?.quantidade_estoque || 0);

    const resultado = qtdEstoque - qtdEfetiva;
    const insuficiente = qtdEfetiva > qtdEstoque;

    const jaBaixado = produto?.baixado === true;
    const desabilitarBotao = insuficiente || jaBaixado || qtdEfetiva < 0;

    return createPortal(
        <div className="rsm-fundo" onClick={aoCancelar}>
            <div className="rsm-caixa" onClick={(e) => e.stopPropagation()}>

                <h2 className="rsm-titulo">Registro de Saída de Material</h2>

                {insuficiente && (
                    <div className="rsm-alerta">
                        <span className="rsm-alerta-icone">!</span>
                        Não é possível registrar saída deste material no estoque! Você não possui a quantidade suficiente!
                    </div>
                )}

                {jaBaixado && (
                    <div className="rsm-alerta" style={{ backgroundColor: "#e3f2fd", color: "#0d47a1", borderLeftColor: "#0d47a1" }}>
                        <span className="rsm-alerta-icone" style={{ backgroundColor: "#0d47a1" }}>i</span>
                        A saída deste material já foi registrada anteriormente!
                    </div>
                )}

                <div className="rsm-secao">
                    <div className="rsm-cabecalho-secao">
                        <span className="rsm-secao-icone">☰</span>
                        <span>Informações do Material</span>
                    </div>

                    <div className="rsm-linha-dupla">
                        <div className="rsm-campo rsm-campo-fixo">
                            <label>Codigo</label>
                            <div className="rsm-valor">{produto?.id_produto_estoque || "—"}</div>
                        </div>
                        <div className="rsm-campo">
                            <label>Item/Produto</label>
                            <div className="rsm-valor">{formatarTexto(produto?.nome_produto || "—")}</div>
                        </div>
                    </div>

                    <div className="rsm-campo">
                        <label>Visibilidade</label>
                        <div className="rsm-radio-grupo">
                            <input type="radio" readOnly checked className="rsm-radio" />
                            <span>{produto?.visibilidade === 1 || produto?.visivel_orcamento ? "Público" : "Privado"}</span>
                        </div>
                    </div>

                    <div className="rsm-linha-dupla">
                        <div className="rsm-campo">
                            <label>Quantidade Planejada</label>
                            <div className="rsm-valor">{qtdPlanejada} Unidades</div>
                        </div>

                        <div className="rsm-campo">
                            <label>Quantidade de Saída Efetiva</label>
                            <input
                                type="number"
                                min="0"
                                value={qtdEfetiva}
                                onChange={(e) => setQtdEfetiva(Number(e.target.value))}
                                className="rsm-input"
                                disabled={jaBaixado}
                            />
                        </div>
                    </div>
                </div>

                {!jaBaixado && (
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
                            <span>Quantidade de Saída Efetiva:</span>
                            <strong>{qtdEfetiva} Unidades</strong>
                        </div>

                        <div className="rsm-divisor" />

                        <div className={`rsm-info-linha rsm-resultado ${insuficiente ? "rsm-resultado-erro" : ""}`}>
                            <span>Resultado Estoque:</span>
                            <strong>{insuficiente ? "Insuficiente" : `${resultado} Unidades`}</strong>
                        </div>
                    </div>
                )}

                <div className="rsm-botoes">
                    <button
                        className={`rsm-btn rsm-btn-confirmar ${desabilitarBotao ? "rsm-btn-desabilitado" : ""}`}
                        onClick={() => !desabilitarBotao && aoConfirmar(produto, qtdEfetiva)}
                        disabled={desabilitarBotao}
                    >
                        {jaBaixado ? "Já Registrado" : "Confirmar"}
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