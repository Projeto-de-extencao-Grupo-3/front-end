import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import StepperFluxo from "../../components/StepperFluxo/StepperFluxo";
import ServicosEItens from "../../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../../components/Resumo/ResumoDoOrcamento";
import Botoes from "../../components/Botoes/botoes"; 
import "./PagamentoPendente.css";
import { useParams } from "react-router-dom";

function PagamentoRealizadoPecas() {
  const { placa } = useParams(); 

  return (
    <Layout ativo={"painel"}>
      <header className="header-analise">
        <h1>Analise de Serviço</h1>
        <p>Verificação de Status e Resolução de Pendências do Serviço</p>
      </header>

      <StepperFluxo
        etapas={[
          { id: "1", label: "Produção Finalizada", icon: "bx bx-file", status: "concluido" },
          { id: "2", label: "Pagamento Realizado", icon: "bx bx-check", status: "concluido" },
          { id: "3", label: "Nota Fiscal Gerada", icon: "bx bx-file", status: "pendente" },
        ]}
      />

      <div className="painelteste">
        <ServicosEItens pagina={"analisar"} />
        <div className="teste2">
          {}
          <ResumoOrcamento pagina={"analisar"} />
          <Botoes pagina={"analisar2"} placa={placa} />
        </div>
      </div>
    </Layout>
  );
}

export default PagamentoRealizadoPecas;