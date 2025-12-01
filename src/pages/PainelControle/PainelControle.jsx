import KpiStatus from "../../components/KpiStatus/KpiStatus";
import Layout from "../../components/Layout/Layout";



function PainelControle() {
    return (

        <Layout ativo={"painel"}>
            <div className="d-flex flex-grow-1 justify-content-around flex-wrap">
                <KpiStatus
                    cor="verde"
                    status="Aguardando Entrada"
                    valor="2 veículos"
                    descricao="Agendados"
                />

                <KpiStatus
                    cor="vermelho"
                    status="Aguardando Orçamento"
                    valor="2 veículos"
                    descricao="Agendados"
                />

                <KpiStatus
                    cor="vermelho"
                    status="Aguardando Autorização"
                    valor="4 veículos"
                    descricao="Agendados"
                />

                <KpiStatus
                    cor="amarelo"
                    status="Aguardando Vaga"
                    valor="10 veículos"
                    descricao="Agendados"
                />

                <KpiStatus
                    cor="verde"
                    status="Em produção"
                    valor="5 veículos"
                    descricao="Agendados"
                />

                <KpiStatus
                    cor="verde"
                    status="Finalizados"
                    valor="1 veículos"
                    descricao="Agendados"
                />
            </div>


        </Layout>


    );
}

export default PainelControle;
