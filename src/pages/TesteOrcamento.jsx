import ServicosEItens from "../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../components/Resumo/ResumoDoOrcamento";
import Botoes from "../components/Botoes/botoes";
import "./componentesInferiores.css";
import Layout from "../components/Layout/Layout";

function TesteOrcamento( {status }) {


    return (
        <Layout ativo={"painel"}>
            <div className="painelteste">
                <ServicosEItens pagina={status} />
                <div className="teste2">
                    <ResumoOrcamento />
                    <Botoes status={status}/>
                </div>
            </div>
        </Layout>
    );
}

export default TesteOrcamento;