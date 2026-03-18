import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import ItemContador from "../../../components/ServicoCard/ItemContador";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import "./EntradaVeiculo.css";
import ReconhecimentoPlaca from "../../../service/ReconhecimentoPlaca";

function EntradaVeiculoCamera() {
    const itensDaLista = [
        "Geladeira", "Chave de Roda",
        "Macaco", "TV/Monitor",
        "Extintor", "Caixa de Ferramentas",
        "Estepe", "Som/DVD"
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const { placa: placaDaUrl } = useParams();

    const [placa, setPlaca] = useState(placaDaUrl || '');
    const [marca, setMarca ] = useState();
    const [modelo, setModelo ] = useState();
    const [prefixo, setPrefixo ] = useState();

    const [_loading, setLoading] = useState(false);

    const { reconhecerPlaca } = ReconhecimentoPlaca();
    const [veiculo, setVeiculo] = useState(null);


    async function send_to_gateway(arquivo) {
        setLoading(true);
        try {
            const dadosVeiculo = await reconhecerPlaca(arquivo);
            console.log("DAdos do veiuclo: ", dadosVeiculo)
            if (dadosVeiculo && dadosVeiculo.length > 0) {
                const principal = dadosVeiculo[0];
                setPlaca(principal.placa);
                setMarca(principal.marca)
                setModelo(principal.modelo)
                setPrefixo(principal.prefixo)

                setVeiculo(principal); 

                console.log("Veículo encontrado:", principal);
                navigate(`/painelControle/entrada/${principal.placa}`, { replace: true });
            }
        } catch (error) {
            console.error("Erro no fluxo de reconhecimento:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (location.state?.arquivoCapturado) {
            send_to_gateway(location.state.arquivoCapturado);
        }
    }, [location.state]);

    return (
        <Layout ativo={"painel"}>
            <div>
                <h1>Entrada de Veículo</h1>
                <p>Visão geral da situação da sua oficina</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "ativo" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "pendente" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "pendente" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "pendente" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />
            <div>
                <OrdemServicoCard 
                marca={marca}
                prefixo={prefixo}
                modelo={modelo}
                placa={placa} />
            </div>
            <div className="section1">
                <InformacoesCard titulo="Informações do Veículo" icone="bx bx-bus">
                    <div className="itens-grid">
                        {itensDaLista.map(item => (
                            <ItemContador key={item} label={item} />
                        ))}
                    </div>

                    <div className="observacoes-section">
                        <label>Observações/Itens adicionais</label>
                        <input type="text" placeholder="Ex: 123.456.789.01" />
                    </div>
                </InformacoesCard>

                <InformacoesCard titulo="Detalhes de Entrada" icone="bx bx-paste">
                    <div className="input-field">
                        <label>Data de Entrada*</label>
                        <input type="text" placeholder="Ex: 01/01/2025" />
                    </div>
                    <div className="input-field">
                        <label>Nome do responsável*</label>
                        <input type="text" placeholder="Ex: João da Silva" />
                    </div>
                    <div className="input-field">
                        <label>CPF do responsável*</label>
                        <input type="text" placeholder="Ex: 123.456.789-00" />
                    </div>
                </InformacoesCard>
            </div>
            <div className="section-buttom">
                <button className="btn-secundario" onClick={() => navigate("/painelControle")}>Voltar para o painel</button>
                <button className="btn-primario" onClick={() => navigate(`/painelControle/orcamento/${placa}`)}>Finalizar entrada</button>
            </div>

        </Layout >
    );
}

export default EntradaVeiculoCamera;