import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import "./EntradaVeiculo.css";
import Clientes from "../../../service/Clientes";
import useEndereco from "../../../service/Endereco";
import Jornada from "../../../service/Jornada";
import api, { buscarVeiculoPorPlaca } from "../../../service/api";


function EntradaVeiculo() {

    const obterIdRegistroEntrada = (os) => (
        os?.fk_entrada ||
        os?.entrada?.id_registro_entrada ||
        os?.entrada?.fk_registro ||
        os?.entrada?.idRegistroEntrada ||
        null
    );

    const obterIdOrdemServico = (os) => (
        os?.id_ordem_servico ||
        os?.idOrdemServico ||
        os?.ordemServico?.id_ordem_servico ||
        null
    );

    const obterIdVeiculo = (os) => (
        os?.veiculo?.id_veiculo ||
        os?.veiculo?.idVeiculo ||
        null
    );

    const obterIdCliente = (os) => (
        os?.cliente?.id_cliente ||
        os?.cliente?.idCliente ||
        null
    );

    const itensPadrao = ["Geladeira", "Macaco", "Extintor", "Estepe", "Monitor"];

    const { adicionarCliente } = Clientes()
    const { adicionarVeiculoRegistroEntradaSemCadastro, adicionarRegistroEntrada, confirmarEntradaAgendada } = Jornada()
    const { cadastrarEnderecoVazio } = useEndereco()

    const location = useLocation();
    const { placa } = useParams();
    const dadosOS = location.state?.dadosOS;
    const veiculoState = location.state?.veiculoDados;
    const clienteState = location.state?.clienteDados;

    const [dadosEntradaExistente, setDadosEntradaExistente] = useState({
        idCliente: obterIdCliente(dadosOS),
        idVeiculo: obterIdVeiculo(dadosOS),
        idOrdemServico: obterIdOrdemServico(dadosOS),
        idRegistroEntrada: obterIdRegistroEntrada(dadosOS)
    });
    const [clientesDisponiveis, setClientesDisponiveis] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [veiculosDisponiveis, setVeiculosDisponiveis] = useState([]);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
    const [preencherComDadosCliente, setPreencherComDadosCliente] = useState(false);

    const clientePreenchido = {
        cpf_cnpj: dadosOS?.cliente?.cpf_cnpj || clienteState?.cpf_cnpj || "",
        nome: dadosOS?.cliente?.nome || clienteState?.nome || veiculoState?.empresa || veiculoState?.nome || "",
        telefone: dadosOS?.cliente?.telefone || clienteState?.telefone || "",
        email: dadosOS?.cliente?.email || clienteState?.email || "",
        tipoCliente: dadosOS?.cliente?.tipo_cliente || clienteState?.tipoCliente || "PESSOA_FISICA"
    };

    const veiculoPreenchido = {
        placa: dadosOS?.veiculo?.placa || veiculoState?.placa || "",
        marca: dadosOS?.veiculo?.marca || veiculoState?.marca || "",
        modelo: dadosOS?.veiculo?.modelo || veiculoState?.modelo || "",
        prefixo: dadosOS?.veiculo?.prefixo || veiculoState?.prefixo || "",
        ano_modelo: dadosOS?.veiculo?.ano_modelo || veiculoState?.ano_modelo || ""
    };

    const camposBaseBloqueados = Boolean(
        placa ||
        clientePreenchido.nome ||
        clientePreenchido.cpf_cnpj ||
        veiculoPreenchido.placa
    );

    const [formData, setFormData] = useState({
        // Veículo
        marca: veiculoPreenchido.marca, modelo: veiculoPreenchido.modelo, placa: veiculoPreenchido.placa,
        prefixo: veiculoPreenchido.prefixo, ano_modelo: veiculoPreenchido.ano_modelo,

        // Cliente
        cpf_cnpj: clientePreenchido.cpf_cnpj, nome: clientePreenchido.nome, telefone: clientePreenchido.telefone,
        email: clientePreenchido.email, tipoCliente: clientePreenchido.tipoCliente,

        // Registro
        dataEntrada: new Date().toISOString().split('T')[0], responsavel: "", cpfResponsavel: "",
        itensEntrada: itensPadrao.map((nome) => ({ nome_item: nome, quantidade_item: 1 })),
        observacoes: ""
    });

    const clienteBloqueadoPorSelecao = Boolean(clienteSelecionado?.id_cliente);
    const veiculoBloqueadoPorSelecao = Boolean(veiculoSelecionado?.id_veiculo);

    const extrairListaClientes = (payload) => {
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.content)) return payload.content;
        return [];
    };

    const normalizarCliente = (cliente) => {
        const contatos = Array.isArray(cliente?.contatos) ? cliente.contatos : [];
        const contatoPrincipal = contatos[0] || {};

        return {
            id_cliente: cliente?.id_cliente || cliente?.idCliente,
            nome: cliente?.nome || "",
            cpf_cnpj: cliente?.cpf_cnpj || cliente?.cpfCnpj || "",
            telefone: cliente?.telefone || contatoPrincipal?.telefone || "",
            email: cliente?.email || contatoPrincipal?.email || "",
            tipoCliente: cliente?.tipo_cliente || cliente?.tipoCliente || "PESSOA_FISICA"
        };
    };

    const buscarClientes = async () => {
        try {
            const response = await api.get("/clientes");
            const listaNormalizada = extrairListaClientes(response.data).map(normalizarCliente);
            setClientesDisponiveis(listaNormalizada);
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            setClientesDisponiveis([]);
        }
    };

    const normalizarVeiculo = (veiculo) => ({
        id_veiculo: veiculo?.id_veiculo || veiculo?.idVeiculo,
        placa: veiculo?.placa || "",
        marca: veiculo?.marca || "",
        modelo: veiculo?.modelo || "",
        prefixo: veiculo?.prefixo || "",
        ano_modelo: veiculo?.ano_modelo || veiculo?.anoModelo || ""
    });

    const buscarVeiculosPorCliente = async (idCliente) => {
        try {
            const response = await api.get(`/veiculos/cliente/${idCliente}`);
            const lista = Array.isArray(response.data) ? response.data : [];
            setVeiculosDisponiveis(lista.map(normalizarVeiculo));
        } catch (error) {
            console.error("Erro ao listar veiculos do cliente:", error);
            setVeiculosDisponiveis([]);
        }
    };

    useEffect(() => {
        if (!dadosOS) return;

        setDadosEntradaExistente((prev) => ({
            ...prev,
            idCliente: obterIdCliente(dadosOS) || prev.idCliente,
            idVeiculo: obterIdVeiculo(dadosOS) || prev.idVeiculo,
            idOrdemServico: obterIdOrdemServico(dadosOS) || prev.idOrdemServico,
            idRegistroEntrada: obterIdRegistroEntrada(dadosOS) || prev.idRegistroEntrada
        }));
    }, [dadosOS]);

    useEffect(() => {
        if (placa) return;
        buscarClientes();
    }, [placa]);

    useEffect(() => {
        if (dadosOS) return;

        if (!clienteSelecionado?.id_cliente || placa) {
            setVeiculosDisponiveis([]);
            setVeiculoSelecionado(null);
            setDadosEntradaExistente((prev) => ({ ...prev, idVeiculo: null }));
            return;
        }

        buscarVeiculosPorCliente(clienteSelecionado.id_cliente);
    }, [clienteSelecionado, placa]);

    useEffect(() => {
        // Só busca por placa se:
        // 1. Há placa no parâmetro
        // 2. NÃO tem dadosOS (não é um agendamento)
        // 3. NÃO tem idVeiculo ainda preenchido
        if (!placa || dadosOS || dadosEntradaExistente.idVeiculo) return;

        const carregarDadosPorPlaca = async () => {
            try {
                const [veiculoResponse, clienteResponse] = await Promise.all([
                    buscarVeiculoPorPlaca(placa),
                    api.get(`/clientes/placa/${placa}`)
                ]);

                const veiculo = veiculoResponse.data?.[0] || null;
                const cliente = clienteResponse.data || null;

                if (!veiculo) return;

                setFormData((prev) => ({
                    ...prev,
                    placa: veiculo.placa || placa,
                    marca: veiculo.marca || "",
                    modelo: veiculo.modelo || "",
                    prefixo: veiculo.prefixo || "",
                    ano_modelo: veiculo.anoModelo || "",
                    nome: cliente?.nome || veiculo.nomeCliente || "",
                    cpf_cnpj: cliente?.cpfCnpj || "",
                    telefone: cliente?.telefone || "",
                    email: cliente?.email || "",
                    tipoCliente: cliente?.tipoCliente || "PESSOA_FISICA"
                }));

                setDadosEntradaExistente((prev) => ({
                    ...prev,
                    idCliente: veiculo.idCliente || cliente?.idCliente || prev.idCliente,
                    idVeiculo: veiculo.idVeiculo || prev.idVeiculo
                }));
            } catch (error) {
                console.error("Erro ao buscar dados por placa:", error);
            }
        };

        carregarDadosPorPlaca();
    }, [placa, dadosOS, dadosEntradaExistente.idVeiculo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (formData.tipoCliente !== "PESSOA_FISICA" && preencherComDadosCliente) {
            setPreencherComDadosCliente(false);
        }
    }, [formData.tipoCliente, preencherComDadosCliente]);

    useEffect(() => {
        if (!preencherComDadosCliente || formData.tipoCliente !== "PESSOA_FISICA") return;

        setFormData((prev) => {
            const novoResponsavel = prev.nome || "";
            const novoCpfResponsavel = prev.cpf_cnpj || "";

            if (prev.responsavel === novoResponsavel && prev.cpfResponsavel === novoCpfResponsavel) {
                return prev;
            }

            return {
                ...prev,
                responsavel: novoResponsavel,
                cpfResponsavel: novoCpfResponsavel
            };
        });
    }, [preencherComDadosCliente, formData.tipoCliente, formData.nome, formData.cpf_cnpj]);

    const selecionarCliente = (idSelecionado) => {
        const cliente = clientesDisponiveis.find((item) => Number(item.id_cliente) === Number(idSelecionado));

        if (!cliente) {
            setClienteSelecionado(null);
            setVeiculoSelecionado(null);
            setVeiculosDisponiveis([]);
            setDadosEntradaExistente((prev) => ({ ...prev, idCliente: null, idVeiculo: null }));
            setFormData((prev) => ({
                ...prev,
                cpf_cnpj: "",
                nome: "",
                telefone: "",
                email: "",
                tipoCliente: "PESSOA_FISICA",
                placa: "",
                marca: "",
                modelo: "",
                prefixo: "",
                ano_modelo: ""
            }));
            return;
        }

        setClienteSelecionado(cliente);
        setVeiculoSelecionado(null);
        setDadosEntradaExistente((prev) => ({ ...prev, idCliente: cliente.id_cliente, idVeiculo: null }));
        setFormData((prev) => ({
            ...prev,
            cpf_cnpj: cliente.cpf_cnpj,
            nome: cliente.nome,
            telefone: cliente.telefone,
            email: cliente.email,
            tipoCliente: cliente.tipoCliente,
            placa: "",
            marca: "",
            modelo: "",
            prefixo: "",
            ano_modelo: ""
        }));
    };

    const selecionarVeiculo = (idSelecionado) => {
        const veiculo = veiculosDisponiveis.find((item) => Number(item.id_veiculo) === Number(idSelecionado));

        if (!veiculo) {
            setVeiculoSelecionado(null);
            setDadosEntradaExistente((prev) => ({ ...prev, idVeiculo: null }));
            return;
        }

        setVeiculoSelecionado(veiculo);
        setDadosEntradaExistente((prev) => ({ ...prev, idVeiculo: veiculo.id_veiculo }));
        setFormData((prev) => ({
            ...prev,
            placa: veiculo.placa,
            marca: veiculo.marca,
            modelo: veiculo.modelo,
            prefixo: veiculo.prefixo,
            ano_modelo: veiculo.ano_modelo
        }));
    };

    const limparSelecaoCliente = () => {
        setClienteSelecionado(null);
        setVeiculoSelecionado(null);
        setVeiculosDisponiveis([]);
        setDadosEntradaExistente((prev) => ({ ...prev, idCliente: null, idVeiculo: null }));
        setFormData((prev) => ({
            ...prev,
            cpf_cnpj: "",
            nome: "",
            telefone: "",
            email: "",
            tipoCliente: "PESSOA_FISICA",
            placa: "",
            marca: "",
            modelo: "",
            prefixo: "",
            ano_modelo: ""
        }));
    };

    const handleItemEntradaChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            itensEntrada: prev.itensEntrada.map((item, itemIndex) => {
                if (itemIndex !== index) return item;

                if (field === "quantidade_item") {
                    return {
                        ...item,
                        quantidade_item: Math.max(0, Number(value) || 0)
                    };
                }

                return {
                    ...item,
                    [field]: value
                };
            })
        }));
    };

    const adicionarItemEntrada = () => {
        setFormData((prev) => ({
            ...prev,
            itensEntrada: [...prev.itensEntrada, { nome_item: "", quantidade_item: 1 }]
        }));
    };

    const removerItemEntrada = (index) => {
        setFormData((prev) => ({
            ...prev,
            itensEntrada: prev.itensEntrada.filter((_, itemIndex) => itemIndex !== index)
        }));
    };

    const handleFinalizar = async () => {
        try {
            const itensEntradaPayload = formData.itensEntrada
                .filter((item) => String(item.nome_item || "").trim().length > 0)
                .map((item) => ({
                    nome_item: String(item.nome_item).trim(),
                    quantidade: Number(item.quantidade_item) || 0
                }))
                .filter((item) => String(item.nome_item || "").trim().length > 0 && item.quantidade > 0);

            if (itensEntradaPayload.length === 0) {
                alert("Adicione pelo menos um item válido com nome e quantidade maior que zero.");
                return;
            }

            const payloadEntrada = {
                dataEntradaPrevista: formData.dataEntrada,
                dataEntradaEfetiva: formData.dataEntrada,
                responsavel: formData.responsavel,
                cpf: formData.cpfResponsavel,
                observacoes: formData.observacoes,
                itens_entrada: itensEntradaPayload,
                fk_oficina: 1
            };

            const payloadConfirmacaoEntrada = {
                responsavel: formData.responsavel,
                cpf: formData.cpfResponsavel,
                itens_entrada: itensEntradaPayload
            };

            const agendamentoExistente = Boolean(
                dadosEntradaExistente.idOrdemServico && dadosEntradaExistente.idRegistroEntrada && dadosEntradaExistente.idVeiculo
            );

            if (agendamentoExistente) {
                const resultadoEntrada = await confirmarEntradaAgendada({
                    fk_registro: dadosEntradaExistente.idRegistroEntrada,
                    entrada: payloadConfirmacaoEntrada
                });

                const idOrdemServicoGerada =
                    dadosEntradaExistente.idOrdemServico ||
                    resultadoEntrada?.entrada?.fkOrdemServico ||
                    resultadoEntrada?.fk_ordem_servico;

                navigate(`/painelControle/orcamento/${idOrdemServicoGerada}`, {
                    state: {
                        idOrdemServico: idOrdemServicoGerada,
                        veiculoDados: {
                            marca: formData.marca,
                            prefixo: formData.prefixo,
                            modelo: formData.modelo,
                            nome: formData.nome,
                            placa: formData.placa
                        }
                    }
                });

                return;
            }

            const clienteSelecionadoSemVeiculo = Boolean(
                clienteSelecionado?.id_cliente && !veiculoSelecionado?.id_veiculo && !placa
            );

            const idVeiculoParaEntrada = clienteSelecionadoSemVeiculo
                ? null
                : dadosEntradaExistente.idVeiculo;

            // Se tem veículo (seja de agendamento ou seleção), processa entrada do veículo existente
            if (idVeiculoParaEntrada) {
                let resultadoEntrada;

                // Se é um agendamento (tem ordem de serviço e registro), confirma agendamento
                if (dadosEntradaExistente.idOrdemServico && dadosEntradaExistente.idRegistroEntrada) {
                    resultadoEntrada = await confirmarEntradaAgendada({
                        fk_registro: dadosEntradaExistente.idRegistroEntrada,
                        entrada: payloadConfirmacaoEntrada
                    });
                } 
                // Caso contrário, adiciona novo registro de entrada
                else {
                    resultadoEntrada = await adicionarRegistroEntrada({
                        fk_veiculo: idVeiculoParaEntrada,
                        entrada: {
                            ...payloadEntrada,
                            fk_cliente: dadosEntradaExistente.idCliente,
                            fk_veiculo: idVeiculoParaEntrada
                        }
                    });
                }

                const idOrdemServicoGerada =
                    dadosEntradaExistente.idOrdemServico ||
                    resultadoEntrada?.entrada?.fkOrdemServico ||
                    resultadoEntrada?.fk_ordem_servico;

                navigate(`/painelControle/orcamento/${idOrdemServicoGerada}`, {
                    state: {
                        idOrdemServico: idOrdemServicoGerada,
                        veiculoDados: {
                            marca: formData.marca,
                            prefixo: formData.prefixo,
                            modelo: formData.modelo,
                            nome: formData.nome,
                            placa: formData.placa
                        }
                    }
                });
                return;
            }

            // Se não tem veículo existente, cria novo cliente + veículo
            let idClienteParaEntrada = dadosEntradaExistente.idCliente;
            let nomeClienteParaEntrada = formData.nome;

            if (!idClienteParaEntrada) {
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

                idClienteParaEntrada = cliente.id_cliente;
                nomeClienteParaEntrada = cliente.nome;
            }

            const resultadoJornada = await adicionarVeiculoRegistroEntradaSemCadastro({
                veiculo: {
                    placa: formData.placa,
                    marca: formData.marca,
                    modelo: formData.modelo,
                    prefixo: formData.prefixo,
                    ano_modelo: formData.ano_modelo,
                    id_cliente: idClienteParaEntrada
                },
                entrada: {
                    ...payloadEntrada
                }
            });

            console.log("ID do Veículo criado:", resultadoJornada.id_veiculo);
            console.log("ID do Registro de Entrada:", resultadoJornada.id_registro_entrada);

            navigate(`/painelControle/orcamento/${resultadoJornada.id_registro_entrada}`, {
                state: {
                    idOrdemServico: resultadoJornada.id_registro_entrada,
                    veiculoDados: {
                        marca: formData.marca,
                        prefixo: formData.prefixo,
                        modelo: formData.modelo,
                        empresa: nomeClienteParaEntrada,
                        placa: formData.placa
                    }
                }
            });

        } catch (error) {
            console.error("Erro no fluxo de entrada:", error);
            alert("Ocorreu um erro ao salvar os dados.");
        }
    };

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

            <div className="entrada-layout">
                <div className="coluna-esquerda">
                    <InformacoesCard titulo="Informações do Cliente" icone="bx bx-user">
                        {!placa && (
                            <div className="cliente-select-wrapper">
                                <label>Selecionar Cliente</label>
                                <div className="cliente-select-row">
                                    <select
                                        value={clienteSelecionado?.id_cliente || ""}
                                        onChange={(e) => selecionarCliente(e.target.value)}
                                    >
                                        <option value="">Selecione um cliente</option>
                                        {clientesDisponiveis.map((cliente) => (
                                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                {cliente.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {clienteBloqueadoPorSelecao && (
                                    <button type="button" className="btn-limpar-cliente" onClick={limparSelecaoCliente}>
                                        Limpar selecao
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="input-field">
                            <label>CPF/CNPJ*</label>
                            <input name="cpf_cnpj" value={formData.cpf_cnpj} onChange={handleChange} placeholder="Ex: 123.456.789-00" readOnly={camposBaseBloqueados || clienteBloqueadoPorSelecao} />
                        </div>
                        <div className="input-field">
                            <label>Nome/Razão Social*</label>
                            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome ou Razão Social..." readOnly={camposBaseBloqueados || clienteBloqueadoPorSelecao} />
                        </div>
                        <div className="input-field">
                            <label>Tipo de Cliente</label>
                            <div>
                                <input type="radio" name="tipoCliente" value="PESSOA_FISICA" checked={formData.tipoCliente === "PESSOA_FISICA"} onChange={handleChange} disabled={camposBaseBloqueados || clienteBloqueadoPorSelecao} />
                                <label>Pessoa Física</label>
                                <input type="radio" name="tipoCliente" value="PESSOA_JURIDICA" checked={formData.tipoCliente === "PESSOA_JURIDICA"} onChange={handleChange} disabled={camposBaseBloqueados || clienteBloqueadoPorSelecao} />
                                <label>Pessoa Jurídica</label>
                            </div>
                        </div>
                    </InformacoesCard>

                    <InformacoesCard titulo="Informações do Veículo" icone="bx bx-list-ul">
                    {!placa && clienteBloqueadoPorSelecao && (
                        <div className="cliente-select-wrapper">
                            <label>Selecionar Veículo do Cliente</label>
                            <div className="cliente-select-row">
                                <select
                                    value={veiculoSelecionado?.id_veiculo || ""}
                                    onChange={(e) => selecionarVeiculo(e.target.value)}
                                >
                                    <option value="">Selecione um veículo</option>
                                    {veiculosDisponiveis.map((veiculo) => (
                                        <option key={veiculo.id_veiculo} value={veiculo.id_veiculo}>
                                            {`${veiculo.placa} - ${veiculo.modelo}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Placa*</label>
                            <input name="placa" value={formData.placa} onChange={handleChange} placeholder="Ex: ABC-1234" readOnly={camposBaseBloqueados || veiculoBloqueadoPorSelecao} />
                        </div>
                        <div className="input-field">
                            <label>Modelo*</label>
                            <input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ex: G7" readOnly={camposBaseBloqueados || veiculoBloqueadoPorSelecao} />
                        </div>
                    </div>
                    <div className="input-group-row">
                        <div className="input-field">
                            <label>Marca*</label>
                            <input name="marca" value={formData.marca} onChange={handleChange} placeholder="Ex: Marcopolo" readOnly={camposBaseBloqueados || veiculoBloqueadoPorSelecao} />
                        </div>
                        <div className="input-field">
                            <label>Prefixo*</label>
                            <input name="prefixo" value={formData.prefixo} onChange={handleChange} placeholder="Ex: 1700" readOnly={camposBaseBloqueados || veiculoBloqueadoPorSelecao} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Ano/Modelo</label>
                        <input name="ano_modelo" value={formData.ano_modelo} onChange={handleChange} placeholder="Ex: 2020" readOnly={camposBaseBloqueados || veiculoBloqueadoPorSelecao} />
                    </div>
                    </InformacoesCard>

                    <InformacoesCard titulo="Detalhes de Entrada" icone="bx bx-paste">
                        <div className="input-field">
                            <label>Data de Entrada*</label>
                            <input type="date" name="dataEntrada" value={formData.dataEntrada} onChange={handleChange} />
                        </div>
                        {formData.tipoCliente === "PESSOA_FISICA" && (
                            <div className="input-field">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={preencherComDadosCliente}
                                        onChange={(e) => setPreencherComDadosCliente(e.target.checked)}
                                    />
                                    {' '}Preencher responsavel com dados do cliente
                                </label>
                            </div>
                        )}
                        <div className="input-field">
                            <label>Nome do responsável*</label>
                            <input
                                name="responsavel"
                                value={formData.responsavel}
                                onChange={handleChange}
                                placeholder="Ex: João da Silva"
                                disabled={preencherComDadosCliente && formData.tipoCliente === "PESSOA_FISICA"}
                            />
                        </div>
                        <div className="input-field">
                            <label>CPF do responsável*</label>
                            <input
                                name="cpfResponsavel"
                                value={formData.cpfResponsavel}
                                onChange={handleChange}
                                placeholder="Ex: 123.456.789-00"
                                disabled={preencherComDadosCliente && formData.tipoCliente === "PESSOA_FISICA"}
                            />
                        </div>
                    </InformacoesCard>
                </div>

                <div className="coluna-direita">
                    <InformacoesCard titulo="Itens de Entrada" icone="bx bx-bus">
                    <div className="item-entrada-list">
                        {formData.itensEntrada.map((item, index) => (
                            <div className="item-entrada-row" key={`item-entrada-${index}`}>
                                <input
                                    className="item-entrada-input"
                                    value={item.nome_item}
                                    onChange={(e) => handleItemEntradaChange(index, "nome_item", e.target.value)}
                                    placeholder="Nome do item"
                                />
                                <input
                                    className="item-entrada-quantidade"
                                    type="number"
                                    min="0"
                                    value={item.quantidade_item}
                                    onChange={(e) => handleItemEntradaChange(index, "quantidade_item", e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn-remover-item"
                                    onClick={() => removerItemEntrada(index)}
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="btn-adicionar-item" onClick={adicionarItemEntrada}>
                        Adicionar novo item
                    </button>
                    <div className="observacoes-section">
                        <label>Observações/Itens adicionais</label>
                        <input name="observacoes" value={formData.observacoes} onChange={handleChange} placeholder="Detalhes extras..." />
                    </div>
                    </InformacoesCard>
                </div>
            </div>
            <div className="section-buttom">
                <button className="btn-secundario" onClick={() => navigate("/painelControle")}>Voltar para o painel</button>
                <button className="btn-primario" onClick={handleFinalizar}>Finalizar entrada</button>
            </div>

        </Layout>
    );
}

export default EntradaVeiculo;