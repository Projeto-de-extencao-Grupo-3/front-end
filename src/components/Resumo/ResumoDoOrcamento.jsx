import "./ResumoDoOrcamento.css";
import { formatarTexto, formatarMoedaBR } from "../../utils/formatarTexto.js";

import resumoIcon from "../../assets/icons/resumo icon.png";

function ResumoDoOrcamento( { pagina, ticket, atualizarLista  }) {
    pagina = "analisar"
    const totalItens = ticket?.produtos?.length || 0;
    const itensBaixados = ticket?.produtos?.filter(p => p.baixado === true).length || 0;
    return (
        <div className="resumo-orcamento">

            <div className="box-titulo">
                <div
                    className="icon"
                    style={{ backgroundImage: `url(${resumoIcon})` }}
                ></div>
                <span className="titulo">Resumo do Orçamento</span>
            </div>

            <div className="box-infos">
                <div className="box-chaves">
                    <span className="chaveTexto">Total em Serviços:</span>
                    <span className="chaveTexto">Total em Peças:</span>

                    {pagina === "produzir" || pagina === "finalizar" || pagina === "analisar" ?
                        <span className="chaveTexto">Saída Estoque:</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="chaveTexto">Pagamento:</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="chaveTexto">Nota Fiscal:</span>
                        : null
                    }
                </div>

                <div className="box-valores">
                    <span className="valoresTexto">{formatarMoedaBR(ticket?.valor_total_servicos)}</span>
                    <span className="valoresTexto">{formatarMoedaBR(ticket?.valor_total_produtos)}</span>

                    {pagina === "produzir" || pagina === "finalizar" || pagina === "analisar" ?
                        <span className="valoresTexto">{itensBaixados}/{totalItens} Itens</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">{ticket?.pagt_realizado === true ? "Realizada" : "Pendente"}</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">{ticket?.nf_realizada === true ? "Realizada" : "Pendente"}</span>
                        : null
                    }
                </div>
            </div>

            <div className="box-total">
                <span className="titleTotal">Total Geral:</span>
                <span className="valorTotal">{formatarMoedaBR(ticket?.valor_total)}</span>
            </div>
        </div>
    );
}

export default ResumoDoOrcamento;