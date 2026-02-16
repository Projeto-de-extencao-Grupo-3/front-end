import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../service/api_python";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import ItemContador from "../../../components/ServicoCard/ItemContador";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./EntradaVeiculo.css";

function EntradaVeiculoCamera() {
    const itensDaLista = [
        "Geladeira", "Chave de Roda",
        "Macaco", "TV/Monitor",
        "Extintor", "Caixa de Ferramentas",
        "Estepe", "Som/DVD"
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const [placa, setPlaca] = useState('');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');


    useEffect(() => {
        if (location.state?.arquivoCapturado) {
            send_to_python_api(location.state.arquivoCapturado);
        }
    }, [location.state]);

    async function send_to_python_api(arquivo) {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', arquivo); 

        try {
            const response = await api.post('/recognize', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Preenche o campo de placa com o retorno da API
            setPlaca(response.data.placa);
            console.log("Placa reconhecida:", response.data.data);
            localStorage.setItem('TOKEN', response.data.token);
        } catch (error) {
            console.error("Erro ao processar imagem:", error);
            alert("Não foi possível ler a placa. Digite manualmente.");
        } finally {
            setLoading(false);
        }
    }

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
                <button className="btn-primario" onClick={() => navigate("/")}>Finalizar entrada</button>
            </div>

        </Layout>
    );
}

export default EntradaVeiculoCamera;