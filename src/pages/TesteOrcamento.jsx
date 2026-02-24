import ServicosEItens from "../components/Servicos&Itens/Servicos&Itens";
import ResumoOrcamento from "../components/Resumo/ResumoDoOrcamento";
import Botoes from "../components/Botoes/botoes";
import "./testeorcamento.css";

function TesteOrcamento( {status }) {


    return (
        <div className="painelteste">
            <ServicosEItens />
            <div className="teste2">
                <ResumoOrcamento />
                <Botoes status={status}/>
            </div>
        </div>
    );
}

export default TesteOrcamento;