import Layout from "../components/Layout/Layout";
import Resumo from "../components/ResumoOrcamento/Resumo";
import StepperFluxo from "../components/StepperFluxo/StepperFluxo";

function TesteOrcamento() {


    return (
        <Layout ativo={"painel"}>
            <Resumo />
        </Layout>
    );
}

export default TesteOrcamento;