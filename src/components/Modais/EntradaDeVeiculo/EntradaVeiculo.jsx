import { createPortal } from "react-dom";
import "./EntradaVeiculo.css";

function EntradaVeiculo({ aberto, aoFechar }) {
    if (!aberto) return null;

    return createPortal(
        <div className="fundo-modal" onClick={aoFechar}>
            <div className="caixa-modal" onClick={(e) => e.stopPropagation()}>

                <h1 className="titulo-modal">Entrada do Veículo</h1>

                {/* SEÇÃO ITENS DO VEÍCULO */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Itens do Veículo</h2>
                    </div>

                    <div className="linha-itens">
                        <div className="item-campo">
                            <span className="item-nome">Geladeira</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">Chave de Roda</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">Extintor</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">Caixa de Ferramentas</span>
                            <span className="item-qtd">1</span>
                        </div>
                    </div>

                    <div className="linha-itens">
                        <div className="item-campo">
                            <span className="item-nome">Macaco</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">TV/Monitor</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">Estepe</span>
                            <span className="item-qtd">1</span>
                        </div>
                        <div className="item-campo">
                            <span className="item-nome">Som/DVD</span>
                            <span className="item-qtd">1</span>
                        </div>
                    </div>

                    <div className="campo">
                        <label>Observações/Itens adicionais</label>
                        <div className="valor-campo valor-obs">
                            O veículo entrou com dois sacos de salgadinhos cheetos no porta-bagagens
                        </div>
                    </div>
                </div>

                {/* SEÇÃO DETALHES DE ENTRADA */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Detalhes de Entrada</h2>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Data de Entrada*</label>
                            <div className="valor-campo">14/03/2025</div>
                        </div>
                        <div className="campo">
                            <label>Data de Saída*</label>
                            <div className="valor-campo">19/03/2025</div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Nome do responsável*</label>
                            <div className="valor-campo">João Sávio da Silva</div>
                        </div>
                        <div className="campo">
                            <label>CPF do responsável*</label>
                            <div className="valor-campo">123.456.789.01</div>
                        </div>
                    </div>
                </div>

                <button className="botao-fechar" onClick={aoFechar}>
                    Fechar
                </button>

            </div>
        </div>,
        document.body
    );
}

export default EntradaVeiculo;
