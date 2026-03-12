import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import StepperFluxo from "../../components/StepperFluxo/StepperFluxo";
import "./NotaFiscalPecas.css"; 

function NotaFiscalPecas() {
  const [abaAtiva, setAbaAtiva] = useState("servicos");
  const [dados, setDados] = useState([]);

  // Mock de dados (adicionei o segundo item para a tabela ficar mais preenchida)
  const ticket = {
    servicos: [
      { id: 1, tipo: "Pintura", parte: "Para-Choque", lado: "Dianteiro", preco: 400 },
      { id: 2, tipo: "Funilaria", parte: "Para-Choque", lado: "Dianteiro", preco: 200 }
    ],
    itens: [
      { id: 1, codigo: "00024", item: "Tinta Azul-Fiap", visibilidade: "Privado", quantidade: 8, preco: 30, saidaEst: "Pendente", status: "Concluido" },
      { id: 2, codigo: "00025", item: "Primer", visibilidade: "Privado", quantidade: 10, preco: 30, saidaEst: "Concluído", status: "Pendente" }
    ]
  };

  useEffect(() => {
    setDados(abaAtiva === "servicos" ? ticket.servicos : ticket.itens);
  }, [abaAtiva]);

  return (
    <Layout ativo={"Análise Financeira"}>
      <div className="container-principal">
        
        <header className="header-analise">
          <h1>Analise de Serviço</h1>
          <p>Verificação de Status e Resolução de Pendências do Serviço</p>
        </header>

        <div className="stepper-container">
          <StepperFluxo
            etapas={[
              { id: "1", label: "Produção Finalizada", icon: "bx bx-file", status: "concluido" },
              { id: "2", label: "Pagamento Realizado", icon: "bx bx-check", status: "pendente" },
              { id: "3", label: "Nota Fiscal Gerada", icon: "bx bx-file", status: "pendente" },
            ]}
          />
        </div>

        <div className="layout-grid">
          
          {/* COLUNA ESQUERDA: Abas e Tabela */}
          <div className="resumo-container-tabela">
            <div className="bar-menu">
              <div className="bar-options full">
                <button 
                  className={`buttons ${abaAtiva === "servicos" ? "selecionado" : ""}`} 
                  onClick={() => setAbaAtiva("servicos")}
                >
                  Serviços
                </button>
                <button 
                  className={`buttons ${abaAtiva === "itens" ? "selecionado" : ""}`} 
                  onClick={() => setAbaAtiva("itens")}
                >
                  Itens
                </button>
              </div>
            </div>

            <div className="conteudo-tabela">
              <table className="tabela-financeira">
                <thead>
                  <tr>
                    {abaAtiva === "servicos" ? (
                      <>
                        <th>Tipo Serviço</th>
                        <th>Parte</th>
                        <th>Lado</th>
                        <th>Preço</th>
                        <th>Opções</th>
                      </>
                    ) : (
                      <>
                        <th>Código</th>
                        <th>Item</th>
                        <th>Visibilidade</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Saída Est.</th>
                        <th>Status</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dados.map((item) => (
                    <tr key={item.id}>
                      {abaAtiva === "servicos" ? (
                        <>
                          <td><span className="badge-tipo">{item.tipo}</span></td>
                          <td><strong>{item.parte}</strong></td>
                          <td>{item.lado}</td>
                          <td><strong>R${item.preco},00</strong></td>
                          <td><i className='bx bx-spreadsheet icon-opcoes'></i></td>
                        </>
                      ) : (
                        <>
                          <td><span className="badge-tipo">{item.codigo}</span></td>
                          <td><strong>{item.item}</strong></td>
                          <td>{item.visibilidade}</td>
                          <td>{item.quantidade}</td>
                          <td><strong>R${item.preco},00</strong></td>
                          <td>{item.saidaEst}</td>
                          <td>{item.status}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COLUNA DIREITA: Resumo e Botões */}
          <div className="coluna-acoes">
            <div className="card-resumo-financeiro">
              <h3><i className='bx bx-receipt'></i> Resumo do Orçamento</h3>
              <div className="resumo-detalhes">
                <div className="linha-resumo"><span>Total em Serviços:</span> <strong>R$3.000,00</strong></div>
                <div className="linha-resumo"><span>Total em Peças:</span> <strong>R$150,00</strong></div>
                <div className="linha-resumo"><span>Saída Estoque:</span> <strong>1/3 Materiais</strong></div>
                <div className="linha-resumo"><span>Pagamento:</span> <strong>Pendente</strong></div>
                <div className="linha-resumo"><span>Nota Fiscal:</span> <strong>Pendente</strong></div>
                <hr className="divisor" />
                <div className="linha-resumo total-geral">
                  <span>Total Geral:</span> <strong>R$3.150,00</strong>
                </div>
              </div>
            </div>

            <button className="btn-concluir">$ Concluir Nota Fiscal</button>
            <button className="btn-dados-veiculo">Ver Dados de Veículo</button>
            <button className="btn-entrada-veiculo">Ver Entrada do Veículo</button>
            <button className="btn-voltar">Voltar para o Painel</button>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default NotaFiscalPecas;