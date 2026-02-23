import Layout from "../components/Layout/Layout";
import ServicosEItens from "../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../components/Resumo/ResumoDoOrcamento";
import Botoes from "../components/Botoes/botoes";
import "./TesteOrcamento.css";

function TesteOrcamento() {


    return (
        <Layout ativo={"painel"}>
            <div className="painelteste">
                <ServicosEItens />
                <div className="teste2">
                    <ResumoOrcamento />
                    <Botoes />
                </div>
            </div>

        </Layout>
    );
}

export default TesteOrcamento;