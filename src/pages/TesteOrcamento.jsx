import Layout from "../components/Layout/Layout";
import ServicosEItens from "../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../components/Resumo/ResumoDoOrcamento";

function TesteOrcamento() {


    return (
        <Layout ativo={"painel"}>
            {/* <ServicosEItens /> */}
            <ResumoOrcamento />
        </Layout>
    );
}

export default TesteOrcamento;