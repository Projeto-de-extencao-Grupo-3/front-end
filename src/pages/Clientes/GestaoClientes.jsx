import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionar from "../../components/ModalClientesFuncionarios/ModalAdicionar.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Clientes from "../../service/Clientes.js";
import Enderecos from "../../service/Endereco.js";
import Contatos from "../../service/Contato.js";
import "./GestaoClientes.css";
import ModalDesativar from "../../components/ModalClientesFuncionarios/ModalDesativar.jsx";
import ModalAdicionarEndereco from "../../components/ModalEnderecos/ModalAdicionarEndereco.jsx";
import ModalAdicionarContatos from "../../components/ModalClientesFuncionarios/ModalAdicionarContatos.jsx";
import ModalEditarCliente from "../../components/ModalClientesFuncionarios/ModalEditarClientes.jsx";
import { exibirAlertaErro, exibirAlertaSucesso } from "../../service/alertas";

function GestaoClientes() {
    const { clientes, loading, listarClientesPaginados, listarClientesPorBuscaDeNome, excluirCliente, adicionarCliente, atualizarCliente } = Clientes();
    const { _buscarEnderecoViaCEP, _cadastrarEnderecoVazio, atualizarEndereco, adicionarEndereco, excluirEndereco } = Enderecos();
    const { adicionarContato, atualizarContato, excluirContato } = Contatos();

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarModalEndereco, setMostrarModalEndereco] = useState(false);
    const [mostrarModalContatos, setMostrarModalContatos] = useState(false);
    const [dadosClienteTemp, setDadosClienteTemp] = useState(null);
    const [dadosEnderecoTemp, setDadosEnderecoTemp] = useState(null);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [clienteParaDesativar, setClienteParaDesativar] = useState(null);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(8);
    const [isSearching, setIsSearching] = useState("");

    const obterMensagemErroApi = (error, mensagemPadrao) => {
        const status = error?.response?.status;
        const payload = error?.response?.data;
        const mensagemApi =
            payload?.mensagem ||
            payload?.message ||
            payload?.erro ||
            (typeof payload === "string" ? payload : "");

        if (status === 409) {
            return mensagemApi || "Conflito de dados: o registro já existe.";
        }

        return mensagemApi || mensagemPadrao;
    };

    const sincronizarClienteSelecionado = async (idCliente) => {
        const dadosPaginados = await listarClientesPaginados(paginaAtual, tamanhoPagina);
        const listaClientes = Array.isArray(dadosPaginados?.content) ? dadosPaginados.content : [];

        const clienteAtualizado = listaClientes.find((item) =>
            String(item.id_cliente ?? item.idCliente ?? item.id) === String(idCliente)
        );

        if (clienteAtualizado) {
            setClienteSelecionado(clienteAtualizado);
        }
    };

    const handleAvancarParaEndereco = (dadosCliente) => {
        setDadosClienteTemp(dadosCliente);
        setMostrarModalAdicionar(false);
        setMostrarModalEndereco(true);
    };

    const handleFinalizarCadastroTotal = async (dadosEndereco) => {
        setDadosEnderecoTemp(dadosEndereco);
        setMostrarModalEndereco(false);
        setMostrarModalContatos(true);
    };

    const handleFinalizarCadastroComContatos = async (contatos) => {
        try {
            const payloadCadastro = {
                ...dadosClienteTemp,
                endereco: dadosEnderecoTemp,
                contatos: Array.isArray(contatos) ? contatos : [],
            };

            await adicionarCliente(payloadCadastro);

            setMostrarModalContatos(false);
            setDadosClienteTemp(null);
            setDadosEnderecoTemp(null);
        } catch (error) {
            console.error("Erro no processo:", error);
        }
    };

    const handleAbrirEdicao = (cliente) => {
        setClienteSelecionado(cliente);
        setModalEditarAberto(true);
    };

    const handleSalvarCliente = async (dadosNovos) => {
        try {
            await atualizarCliente(dadosNovos);
            await sincronizarClienteSelecionado(dadosNovos.id_cliente);
            exibirAlertaSucesso("Dados do cliente atualizados com sucesso.");

            setModalEditarAberto(false);
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            exibirAlertaErro(obterMensagemErroApi(error, "Não foi possível atualizar os dados do cliente."));
        }
    };

    const handleSalvarEndereco = async (dadosNovos) => {
        try {
            const operacao = dadosNovos.operacao;
            let enderecoSalvo = null;

            switch (operacao) {
                case "editar":
                    enderecoSalvo = await atualizarEndereco(dadosNovos);
                    exibirAlertaSucesso("Endereço atualizado com sucesso.");
                    break;
                case "novo":
                    enderecoSalvo = await adicionarEndereco(dadosNovos);
                    exibirAlertaSucesso("Novo endereço adicionado com sucesso.");
                    break;
                default:
                    throw new Error(`Operação de endereço inválida: ${operacao}`);
            }

            await sincronizarClienteSelecionado(dadosNovos.id_cliente);

            return enderecoSalvo;
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            exibirAlertaErro(obterMensagemErroApi(error, "Não foi possível salvar o endereço."));
            return null;
        }
    };

    const handleSalvarContato = async (dadosNovos) => {
        try {
            const operacao = dadosNovos.operacao;
            let contatoSalvo = null;

            switch (operacao) {
                case "editar":
                    contatoSalvo = await atualizarContato(dadosNovos);
                    exibirAlertaSucesso("Contato atualizado com sucesso.");
                    break;
                case "novo":
                    contatoSalvo = await adicionarContato(dadosNovos);
                    exibirAlertaSucesso("Novo contato adicionado com sucesso.");
                    break;
                default:
                    throw new Error(`Operação de contato inválida: ${operacao}`);
            }

            await sincronizarClienteSelecionado(dadosNovos.id_cliente);
            return contatoSalvo;
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            exibirAlertaErro(obterMensagemErroApi(error, "Não foi possível salvar o contato."));
            return null;
        }
    };

    const handleExcluirEndereco = async ({ idCliente, idEndereco }) => {
        const excluiu = await excluirEndereco(idCliente, idEndereco);

        if (excluiu) {
            await listarClientesPaginados(paginaAtual, tamanhoPagina);
        }

        return excluiu;
    };

    const handleExcluirContato = async ({ idCliente, idContato }) => {
        const excluiu = await excluirContato(idCliente, idContato);

        if (excluiu) {
            await listarClientesPaginados(paginaAtual, tamanhoPagina);
        }

        return excluiu;
    };

    const abrirModalDesativar = (cliente) => {
        setClienteParaDesativar(cliente);
        setIsModalDesativarOpen(true);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isSearching.trim() !== "") {
                // Se a busca for local ou não paginada no back-end
                await listarClientesPorBuscaDeNome(isSearching);
            } else {
                // Carregamento paginado padrão
                await listarClientesPaginados(paginaAtual, tamanhoPagina);
            }
        };

        const delayDebounce = setTimeout(fetchData, isSearching ? 500 : 0);

        return () => {
            isMounted = false;
            clearTimeout(delayDebounce);
        };
    }, [isSearching, paginaAtual]);;

    const confirmarDesativacao = async () => {
        try {
            const id = clienteParaDesativar.id_cliente;

            await excluirCliente(id);
            await listarClientesPaginados(paginaAtual, tamanhoPagina);

            setIsModalDesativarOpen(false);
            setClienteParaDesativar(null);
        } catch (error) {
            console.error("Erro ao excluir:", error);
            exibirAlertaErro("Não foi possível desativar o cliente.");
        }
    };


    return (
        <Layout ativo={"clientes"}>
            <Loading isLoading={loading} message="Carregando Clientes...">
                <div className="header-clientes">
                    <div>
                        <h1>Gestão de Clientes</h1>
                        <p>Visão geral dos Clientes</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            onChange={(e) => setIsSearching(e.target.value)} />
                        <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                            Adicionar novo Cliente +
                        </button>

                        {/* Modal 1: Informações Básicas */}
                        <ModalAdicionar
                            isOpen={mostrarModalAdicionar}
                            onClose={() => setMostrarModalAdicionar(false)}
                            onSave={handleAvancarParaEndereco}
                        />

                        {/* Modal 2: Endereço */}
                        <ModalAdicionarEndereco
                            isOpen={mostrarModalEndereco}
                            onClose={() => setMostrarModalEndereco(false)}
                            onSaveEndereco={handleFinalizarCadastroTotal}
                        />

                        {/* Modal 3: Contatos */}
                        <ModalAdicionarContatos
                            isOpen={mostrarModalContatos}
                            onClose={() => setMostrarModalContatos(false)}
                            onSaveContatos={handleFinalizarCadastroComContatos}
                        />
                    </div>
                </div>
                <Tabela
                    clientes={clientes.content || []}
                    excluirCliente={abrirModalDesativar}
                    editarCliente={handleAbrirEdicao}>
                </Tabela>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted">
                        Página {paginaAtual + 1} de {clientes?.page?.total_pages || 1}
                    </span>

                    <div className="btn-group">
                        <button
                            className="btn btn-outline-dark"
                            disabled={paginaAtual === 0}
                            onClick={() => setPaginaAtual(prev => prev - 1)}
                        >
                            Anterior
                        </button>

                        <button
                            className="btn btn-outline-dark"
                            // Se a página atual for a última (total - 1), desabilita
                            disabled={paginaAtual >= (clientes?.page?.total_pages - 1)}
                            onClick={() => setPaginaAtual(prev => prev + 1)}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </Loading>
            <ModalDesativar
                isOpen={isModalDesativarOpen}
                onClose={() => {
                    setIsModalDesativarOpen(false);
                    setClienteParaDesativar(null);
                }}
                onConfirm={confirmarDesativacao}
                titulo="Desativar Cliente"
                subtitulo="Informações do Cliente"
                textoBotao="Desativar"
                corBotao="#dc3545"
                iconClass="bx-user"
                dados={clienteParaDesativar ? [
                    { label: "Nome", value: clienteParaDesativar.nome, fullWidth: true },
                    { label: "CPF/CNPJ", value: clienteParaDesativar.cpfCnpj || clienteParaDesativar.cpf_cnpj },
                    { label: "Tipo de Cliente", value: clienteParaDesativar.tipoCliente || clienteParaDesativar.tipo_cliente },
                    { label: "Endereços", value: clienteParaDesativar.enderecos?.map((endereco) => endereco.logradouro).join(", "), fullWidth: true },
                    { label: "Telefone", value: clienteParaDesativar.meios_contato.length, fullWidth: true }
                ] : []}
            />
            <ModalEditarCliente
                isOpen={modalEditarAberto}
                onClose={() => setModalEditarAberto(false)}
                clienteParaEditar={clienteSelecionado}
                onSave={handleSalvarCliente}
                onSaveEndereco={handleSalvarEndereco}
                onSaveContato={handleSalvarContato}
                onDeleteEndereco={handleExcluirEndereco}
                onDeleteContato={handleExcluirContato}
            />
        </Layout>
    );
}

export default GestaoClientes;