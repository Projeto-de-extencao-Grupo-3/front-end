import { createPortal } from "react-dom";
import "./EntradaVeiculo.css";

function EntradaVeiculo({ aberto, aoFechar, dadosRecebidos }) {
    if (!aberto) return null;

    console.log("Dados recebidos no modal de entrada:", dadosRecebidos);

    function formatarData(data) {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    function calcularDias() {
        const dataEntrada = new Date(dadosRecebidos.entrada.data_entrada_efetiva);
        const dataSaida = new Date(dadosRecebidos.data_saida_efetiva);
        const dias = Math.ceil((dataSaida - dataEntrada) / (1000 * 60 * 60 * 24));
        return dias > 0 ? dias : 0;
    }

    return createPortal(
        <div className="fundo-modal" onClick={aoFechar}>
            <div className="caixa-modal" onClick={(e) => e.stopPropagation()}>

                <h1 className="titulo-modal">Entrada do Veículo</h1>

             {/* SEÇÃO DETALHES DE ENTRADA */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Detalhes de Entrada</h2>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Data de Entrada</label>
                            <div className="valor-campo">{formatarData(dadosRecebidos.entrada.data_entrada_efetiva)}</div>
                        </div>
                        <div className="campo">
                            <label>Data de Saída</label>
                            <div className="valor-campo">{formatarData(dadosRecebidos.data_saida_efetiva)}</div>
                        </div>
                        <div className="campo">
                            <label>Dias de Permanência</label>
                            <div className="valor-campo">{calcularDias()} dias</div>
                        </div>
                    </div>

                    <div className="linha-dupla">
                        <div className="campo">
                            <label>Responsável</label>
                            <div className="valor-campo">{dadosRecebidos.entrada.responsavel}</div>
                        </div>
                        <div className="campo">
                            <label>CPF do Responsável</label>
                            <div className="valor-campo">{dadosRecebidos.entrada.cpf}</div>
                        </div>
                    </div>
                </div>


                {/* SEÇÃO ITENS DO VEÍCULO */}
                <div className="secao">
                    <div className="cabecalho-secao">
                        <h2>Itens do Veículo</h2>
                    </div>

                    {dadosRecebidos.entrada.itens_entrada.length > 0 ? (
                        <div className="tabela-itens">
                            <div className="tabela-header">
                                <span className="col-nome">Nome do Item</span>
                                <span className="col-qtd">Quantidade (Un)</span>
                            </div>
                            {dadosRecebidos.entrada.itens_entrada.map((item, index) => (
                                <div className="item-linha" key={index}>
                                    <span className="item-nome">{item.nome_item}</span>
                                    <span className="item-qtd">{item.quantidade}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="sem-itens">Nenhum item registrado</div>
                    )}
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
