import "./ResumoDoOrcamento.css";
import { useState, useEffect } from "react";
import { buscarServicos, buscarItens } from "../../service/api";
import resumoIcon from "../../assets/icons/resumo icon.png";

function ResumoDoOrcamento() {
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
                    <span className="chaveTexto">Saída Estoque:</span>
                    <span className="chaveTexto">Pagamento:</span>
                    <span className="chaveTexto">Nota Fiscal:</span>
                </div>

                <div className="box-valores">
                    <span className="valoresTexto">R$3.000,00</span>
                    <span className="valoresTexto">R$150,00</span>
                    <span className="valoresTexto">0/1 Itens</span>
                    <span className="valoresTexto">Pendente</span>
                    <span className="valoresTexto">Pendente</span>
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