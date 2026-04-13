import "./ResumoDoOrcamento.css";
import { formatarMoedaBR } from "../../utils/formatarTexto.js";

import resumoIcon from "../../assets/icons/resumo icon.png";

function ResumoDoOrcamento( { pagina, ticket }) {
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
                    <span className="valoresTexto">{formatarMoedaBR(ticket?.total_servico)}</span>
                    <span className="valoresTexto">{formatarMoedaBR(ticket?.total_produtos)}</span>

                    {pagina === "produzir" || pagina === "finalizar" || pagina === "analisar" ?
                        <span className="valoresTexto">{ticket.produtos_saida_estoque_concluida}/{ticket.produtos_saida_estoque_pendente + ticket.produtos_saida_estoque_concluida} Itens</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">{ticket?.pagamento_realizado === true ? "Realizada" : "Pendente"}</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">{ticket?.nota_fiscal_realizada === true ? "Realizada" : "Pendente"}</span>
                        : null
                    }
                </div>
            </div>

            <div className="box-total">
                <span className="titleTotal">Total Geral:</span>
                <span className="valorTotal">{formatarMoedaBR(ticket?.total_geral)}</span>
            </div>
        </div>
    );
}

export default ResumoDoOrcamento;