import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import ItemContador from "../../../components/ServicoCard/ItemContador";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./EntradaVeiculo.css";
import { use } from "react";

function EntradaVeiculo() {
    const itensDaLista = [
        "Geladeira", "Chave de Roda",
        "Macaco", "TV/Monitor",
        "Extintor", "Caixa de Ferramentas",
        "Estepe", "Som/DVD"
    ];

    const navigate = useNavigate();

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
                <InformacoesCard titulo="Informações do Veículo" icone="bx bx-list-ul">
                    <div className="input-field">
                        <label>Buscar por placa</label>
                        <input type="text" placeholder="Digite a placa..." />
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Marca*</label>
                            <input placeholder="Ex: Marcopolo" />
                        </div>
                        <div className="input-field">
                            <label>Modelo*</label>
                            <input placeholder="Ex: G7" />
                        </div>
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Placa*</label>
                            <input placeholder="Ex: ABC-1234" />
                        </div>
                        <div className="input-field">
                            <label>Prefixo*</label>
                            <input placeholder="Ex: 1700" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Ano/Modelo</label>
                        <input type="text" placeholder="Ex: 2020" />
                    </div>
                </InformacoesCard>

                <InformacoesCard titulo="Informações do Cliente" icone="bx bx-user">
                    <div className="input-field">
                        <label>CPF/CNPJ*</label>
                        <input type="text" placeholder="Ex: 123.456.789-00" />
                    </div>
                    <div className="input-field">
                        <label>Nome/Razão Social*</label>
                        <input type="text" placeholder="Nome ou Razão Social..." />
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Telefone*</label>
                            <input placeholder="Ex: (11) 99999-9999" />
                        </div>
                        <div className="input-field">
                            <label>Email*</label>
                            <input placeholder="Ex: cliente@exemplo.com" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Tipo de Cliente</label>
                        <div>
                            <input type="radio" name="tipoCliente" value="Particular" />
                            <label>Particular</label>
                            <input type="radio" name="tipoCliente" value="Empresa" />
                            <label>Empresa</label>
                        </div>

                    </div>
                </InformacoesCard>

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
                <button className="btn-secundario"  onClick={() => navigate("/painelControle")}>Voltar para o painel</button>
                <button className="btn-primario"  onClick={() => navigate("/")}>Finalizar entrada</button>
            </div>

        </Layout>
    );
}

export default EntradaVeiculo;