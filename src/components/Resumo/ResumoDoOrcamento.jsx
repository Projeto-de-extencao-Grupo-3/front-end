import "./ResumoDoOrcamento.css";
import resumoIcon from "../../assets/icons/resumo icon.png";


function ResumoDoOrcamento( { pagina }) {
    console.log("Página atual no Resumo:", pagina);
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
                    <span className="valoresTexto">R$3.000,00</span>
                    <span className="valoresTexto">R$150,00</span>

                    {pagina === "produzir" || pagina === "finalizar" || pagina === "analisar" ?
                        <span className="valoresTexto">0/1 Itens</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">Pendente</span>
                        : null
                    }

                    {pagina === "analisar" ?
                        <span className="valoresTexto">Pendente</span>
                        : null
                    }
                </div>
            </div>

            <div className="box-total">
                <span className="titleTotal">Total Geral:</span>
                <span className="valorTotal">R$3.150,00</span>
            </div>
        </div>
    );
}

export default ResumoDoOrcamento;