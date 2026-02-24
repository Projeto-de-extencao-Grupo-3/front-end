import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./Finalizado.css";
import TesteOrcamento from "../../TesteOrcamento";

function Finalizado() {
    const navigate = useNavigate();

    return (
        <Layout ativo={"painel"}>
            <div>
                <h1>Em Produção</h1>
                <p>Acompanhe o Andamento do serviço deste veículo</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "concluido" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "concluido" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "concluido" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "concluido" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "concluido" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "ativo" },
                ]}
            />
            <TesteOrcamento/>

        </Layout>
    );
}

export default Finalizado;