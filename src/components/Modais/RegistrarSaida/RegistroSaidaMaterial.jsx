import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import "./RegistroSaidaMaterial.css";
import ListarQuantidade from "../../../service/Produtos"; // Mantive para a busca inicial

function RegistroSaidaMaterial({ aberto, aoConfirmar, aoCancelar, produto }) {
    const { listarProdutosById } = ListarQuantidade();
    const [infoDoProdutoEstoque, setInfoDoProdutoEstoque] = useState(null);

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
        }
    }, [produto, aberto]);

    if (!aberto) return null;

    const qtdSaida = Number(produto?.quantidade || 0);
    const qtdEstoque = Number(infoDoProdutoEstoque?.quantidade_estoque || 0);
    const resultado = qtdEstoque - qtdSaida; // Essa é a nova quantidade de estoque
    const insuficiente = qtdSaida > qtdEstoque;

    const jaBaixado = produto?.baixado === true; // Verifica se já foi dado baixa
    const desabilitarBotao = insuficiente || jaBaixado;

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

                {jaBaixado && (
                    <div className="rsm-alerta" style={{ backgroundColor: "#e3f2fd", color: "#0d47a1", borderLeftColor: "#0d47a1" }}>
                        <span className="rsm-alerta-icone" style={{ backgroundColor: "#0d47a1" }}>i</span>
                        A saída deste material já foi registrada anteriormente!
                    </div>
                )}

                {/* SEÇÃO MATERIAL */}
                {/* ... (Todo o seu HTML da Seção de Material fica igualzinho!) ... */}
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
                            <div className="rsm-valor">{produto?.nome_produto || "—"}</div>
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
                            <label>Quantidade de Saída</label>
                            <div className="rsm-valor">{qtdSaida} Unidades</div>
                        </div>
                        <div className="rsm-campo">
                            <label>Preço por Unidade (R$)</label>
                            <div className="rsm-valor">R$ {produto?.preco_peca || produto?.preco_venda || "0,00"}</div>
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

                <div className="rsm-botoes">
                    <button
                        className={`rsm-btn rsm-btn-confirmar ${desabilitarBotao ? "rsm-btn-desabilitado" : ""}`}
                        onClick={() => !desabilitarBotao && aoConfirmar(produto, resultado)}
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