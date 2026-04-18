import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionar from "../../components/ModalClientesFuncionarios/ModalAdicionar.jsx";
import Clientes from "../../service/Clientes.js";
import Enderecos from "../../service/Endereco.js";
import "./GestaoClientes.css";
import ModalDesativar from "../../components/ModalClientesFuncionarios/ModalDesativar.jsx";
import ModalAdicionarEndereco from "../../components/ModalEnderecos/ModalAdicionarEndereco.jsx";
import ModalEditarCliente from "../../components/ModalClientesFuncionarios/ModalEditarClientes.jsx";

function GestaoClientes() {
    const { clientes, _loading, listarClientesPaginados, excluirCliente, adicionarCliente, atualizarCliente } = Clientes();
    const { buscarEnderecoViaCEP, cadastrarEnderecoVazio, atualizarEndereco } = Enderecos();

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarModalEndereco, setMostrarModalEndereco] = useState(false);
    const [dadosClienteTemp, setDadosClienteTemp] = useState(null);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [clienteParaDesativar, setClienteParaDesativar] = useState(null);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(8);

    const handleAvancarParaEndereco = (dadosCliente) => {
        setDadosClienteTemp(dadosCliente);
        setMostrarModalAdicionar(false);
        setMostrarModalEndereco(true);
    };

    const handleFinalizarCadastroTotal = async (dadosEndereco) => {
        try {
            //const responseEndereco = await api.post('/enderecos', dadosEndereco);
            //const idCapturado = responseEndereco.data.idEndereco || responseEndereco.data.id_endereco;
            //const enderecoComId = { id_endereco: idCapturado };

            dadosClienteTemp.endereco = dadosEndereco; // Adiciona o endereço ao objeto do cliente 

            await adicionarCliente(dadosClienteTemp);

            setMostrarModalEndereco(false);
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

            setModalEditarAberto(false);
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            alert("Erro ao atualizar cliente.");
        }
    };

    const handleSalvarEndereco = async (dadosNovos) => {
        try {
            await atualizarEndereco(dadosNovos);

            setModalEditarAberto(false);
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            alert("Erro ao atualizar cliente.");
        }
    };

    const handleSalvarContato = async (dadosNovos) => {
        try {
            await atualizarCliente(dadosNovos);

            setModalEditarAberto(false);
        } catch (error) {
            console.error("Erro capturado no componente:", error);
            alert("Erro ao atualizar cliente.");
        }
    };

    const abrirModalDesativar = (cliente) => {
        setClienteParaDesativar(cliente);
        setIsModalDesativarOpen(true);
    };

    useEffect(() => {
        listarClientesPaginados(paginaAtual, tamanhoPagina);
    }, [paginaAtual]);

    const confirmarDesativacao = async () => {
        try {
            const id = clienteParaDesativar.idCliente || clienteParaDesativar.id_cliente;

            await excluirCliente(id);

            setIsModalDesativarOpen(false);
            setClienteParaDesativar(null);
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Não foi possível desativar o cliente.");
        }
    };


    return (
        <Layout ativo={"clientes"}>
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
                    />
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
            />
        </Layout>
    );
}

export default GestaoClientes;