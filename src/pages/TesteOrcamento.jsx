import Layout from "../components/Layout/Layout";
import ServicosEItens from "../components/Servicos&Itens/Servicos&Itens";
import StepperFluxo from "../components/StepperFluxo/StepperFluxo";

function TesteOrcamento() {


    return (
        <Layout ativo={"painel"}>
            <ServicosEItens />
        </Layout>
    );
}

export default TesteOrcamento;