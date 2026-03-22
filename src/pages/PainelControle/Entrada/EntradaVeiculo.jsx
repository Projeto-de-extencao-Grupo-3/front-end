import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import ItemContador from "../../../components/ServicoCard/ItemContador";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./EntradaVeiculo.css";
import Clientes from "../../../service/Clientes";
import useEndereco from "../../../service/Endereco";
import Jornada from "../../../service/Jornada";


function EntradaVeiculo() {

    const { adicionarCliente } = Clientes()
    const { adicionarVeiculoRegistroEntradaSemCadastro } = Jornada()
    const { cadastrarEnderecoVazio } = useEndereco()

    const [formData, setFormData] = useState({
        // Veículo
        marca: "", modelo: "", placa: "", prefixo: "", ano_modelo: "",

        // Cliente
        cpf_cnpj: "", nome: "", telefone: "", email: "", tipoCliente: "PESSOA_FISICA",

        // Registro
        dataEntrada: new Date().toISOString().split('T')[0], responsavel: "", cpfResponsavel: "",
        geladeira: 0, macaco: 0, extinto: 0, estepe: 0,
        chave_roda: 0, monitor: 0, caixa_ferramentas: 0, som_dvd: 0,
        observacoes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCounterChange = (itemKey, novoValor) => {
        setFormData(prev => ({ ...prev, [itemKey]: novoValor }));
    };

    const handleFinalizar = async () => {
        try {
            const resEndereco = await cadastrarEnderecoVazio();
            const idEnderecoGerado = resEndereco.id_endereco;

            const cliente = await adicionarCliente({
                nome: formData.nome,
                cpf_cnpj: formData.cpf_cnpj,
                telefone: formData.telefone,
                email: formData.email,
                tipo_cliente: formData.tipoCliente,
                fk_endereco: idEnderecoGerado
            },
                {
                    id_endereco: idEnderecoGerado
                }
            );

            const resultadoJornada = await adicionarVeiculoRegistroEntradaSemCadastro({
                veiculo: {
                    placa: formData.placa,
                    marca: formData.marca,
                    modelo: formData.modelo,
                    prefixo: formData.prefixo,
                    ano_modelo: formData.ano_modelo,
                    id_cliente: cliente.id_cliente
                },
                entrada: {
                    dataEntradaPrevista: formData.dataEntrada,
                    dataEntradaEfetiva: formData.dataEntrada,
                    responsavel: formData.responsavel,
                    cpf: formData.cpfResponsavel,
                    observacoes: formData.observacoes,
                    geladeira: Number(formData.geladeira),
                    macaco: Number(formData.macaco),
                    extintor: Number(formData.extinto),
                    estepe: Number(formData.estepe),
                    chave_roda: Number(formData.chave_roda),
                    monitor: Number(formData.monitor),
                    caixa_ferramentas: Number(formData.caixa_ferramentas),
                    som_dvd: Number(formData.som_dvd),
                    fk_oficina: 1
                }
            });

            console.log("ID do Veículo criado:", resultadoJornada.id_veiculo);
            console.log("ID do Registro de Entrada:", resultadoJornada.id_registro_entrada);

            navigate(`/painelControle/orcamento/${formData.placa}/${resultadoJornada.id_registro_entrada}`, {
                state: {
                    idOrdemServico: resultadoJornada.id_registro_entrada,
                    veiculoDados: {
                        marca: formData.marca,
                        prefixo: formData.prefixo,
                        modelo: formData.modelo,
                        empresa: cliente.nome,
                        placa: formData.placa
                    }
                }
            });

        } catch (error) {
            console.error("Erro no fluxo de entrada:", error);
            alert("Ocorreu um erro ao salvar os dados.");
        }
    };

    const mapaItens = [
        { label: "Geladeira", key: "geladeira" },
        { label: "Chave de Roda", key: "chave_roda" },
        { label: "Macaco", key: "macaco" },
        { label: "TV/Monitor", key: "monitor" },
        { label: "Extintor", key: "extinto" },
        { label: "Caixa de Ferramentas", key: "caixa_ferramentas" },
        { label: "Estepe", key: "estepe" },
        { label: "Som/DVD", key: "som_dvd" }
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
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "ativo" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-wallet-note", status: "pendente" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "pendente" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "pendente" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "pendente" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />

            <div className="section1">
                <InformacoesCard titulo="Informações do Veículo" icone="bx bx-list-ul">
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Placa*</label>
                            <input name="placa" value={formData.placa} onChange={handleChange} placeholder="Ex: ABC-1234" />
                        </div>
                        <div className="input-field">
                            <label>Modelo*</label>
                            <input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ex: G7" />
                        </div>
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Marca*</label>
                            <input name="marca" value={formData.marca} onChange={handleChange} placeholder="Ex: Marcopolo" />
                        </div>
                        <div className="input-field">
                            <label>Prefixo*</label>
                            <input name="prefixo" value={formData.prefixo} onChange={handleChange} placeholder="Ex: 1700" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Ano/Modelo</label>
                        <input name="ano_modelo" value={formData.ano_modelo} onChange={handleChange} placeholder="Ex: 2020" />
                    </div>
                </InformacoesCard>

                <InformacoesCard titulo="Informações do Cliente" icone="bx bx-user">
                    <div className="input-field">
                        <label>CPF/CNPJ*</label>
                        <input name="cpf_cnpj" value={formData.cpf_cnpj} onChange={handleChange} placeholder="Ex: 123.456.789-00" />
                    </div>
                    <div className="input-field">
                        <label>Nome/Razão Social*</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome ou Razão Social..." />
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Telefone*</label>
                            <input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Ex: (11) 99999-9999" />
                        </div>
                        <div className="input-field">
                            <label>Email*</label>
                            <input name="email" value={formData.email} onChange={handleChange} placeholder="Ex: cliente@exemplo.com" />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Tipo de Cliente</label>
                        <div>
                            <input type="radio" name="tipoCliente" value="PESSOA_FISICA" checked={formData.tipoCliente === "PESSOA_FISICA"} onChange={handleChange} />
                            <label>Pessoa Física</label>
                            <input type="radio" name="tipoCliente" value="PESSOA_JURIDICA" checked={formData.tipoCliente === "PESSOA_JURIDICA"} onChange={handleChange} />
                            <label>Pessoa Jurídica</label>
                        </div>
                    </div>
                </InformacoesCard>
            </div>

            <div className="section1">
                <InformacoesCard titulo="Inventário do Veículo" icone="bx bx-bus">
                    <div className="itens-grid">
                        {mapaItens.map(item => (
                            <ItemContador
                                key={item.key}
                                label={item.label}
                                valor={formData[item.key]}
                                setValor={(novo) => handleCounterChange(item.key, novo)}
                            />
                        ))}
                    </div>
                    <div className="observacoes-section">
                        <label>Observações/Itens adicionais</label>
                        <input name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Detalhes extras..." />
                    </div>
                </InformacoesCard>

                <InformacoesCard titulo="Detalhes de Entrada" icone="bx bx-paste">
                    <div className="input-field">
                        <label>Data de Entrada*</label>
                        <input type="date" name="dataEntrada" value={formData.dataEntrada} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label>Nome do responsável*</label>
                        <input name="responsavel" value={formData.responsavel} onChange={handleChange} placeholder="Ex: João da Silva" />
                    </div>
                    <div className="input-field">
                        <label>CPF do responsável*</label>
                        <input name="cpfResponsavel" value={formData.cpfResponsavel} onChange={handleChange} placeholder="Ex: 123.456.789-00" />
                    </div>
                </InformacoesCard>
            </div>
            <div className="section-buttom">
                <button className="btn-secundario" onClick={() => navigate("/painelControle")}>Voltar para o painel</button>
                <button className="btn-primario" onClick={handleFinalizar}>Finalizar entrada</button>
            </div>

        </Layout>
    );
}

export default EntradaVeiculo;