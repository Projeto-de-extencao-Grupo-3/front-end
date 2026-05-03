import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import ModalAdicionarFuncionario from "../../components/ModalClientesFuncionarios/ModalAdicionarFuncionario.jsx";
import "./GestaoFuncionarios.css";
import ModalDesativar from "../../components/ModalClientesFuncionarios/ModalDesativar.jsx";
import TabelaFuncionarios from "../../components/Layout/TabelaFuncionarios.jsx";
import Funcionarios from "../../service/Funcionarios.js";
import Loading from "../../components/Loading/Loading.jsx";

function GestaoFuncionarios() {
    const { funcionarios, loading, listarFuncionariosPaginados, listarFuncionariosPorBuscaDeNome, excluirFuncionario, adicionarFuncionario, atualizarFuncionario } = Funcionarios();
    const [funcionarioParaEditar, setFuncionarioParaEditar] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [funcionarioParaDesativar, setFuncionarioParaDesativar] = useState(null);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);

    const lidarComEdicao = (funcionario) => {
        console.log("Abrindo modal para editar:", funcionario);
        setFuncionarioParaEditar(funcionario);
        setModalAberto(true);
    };

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(8);
    const [isSearching, setIsSearching] = useState("");

    const abrirModalNovo = () => {
        console.log("Abrindo modal para novo");
        setFuncionarioParaEditar(null);
        setModalAberto(true);
    };

    const salvar = async (dados, id) => {
        try {
            if (id) {
                await atualizarFuncionario(id, dados);
            } else {
                await adicionarFuncionario(dados);
            }

            await listarFuncionariosPaginados(paginaAtual, tamanhoPagina);
            setModalAberto(false);
            setFuncionarioParaEditar(null);
        } catch (error) {
            console.error("Falha ao salvar no banco:", error);
        }
    };

    const abrirModalDesativar = (funcionario) => {
        setFuncionarioParaDesativar(funcionario);
        setIsModalDesativarOpen(true);
    };

    const confirmarDesativacao = async () => {
        try {
            const id = funcionarioParaDesativar.idFuncionario || funcionarioParaDesativar.id_funcionario;

            await excluirFuncionario(id);
            await listarFuncionariosPaginados(paginaAtual, tamanhoPagina);
            setIsModalDesativarOpen(false);
            setFuncionarioParaDesativar(null);
        } catch (error) {
            console.error("Erro ao desativar funcionário:", error);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isSearching.trim() !== "") {
                // Se a busca for local ou não paginada no back-end
                await listarFuncionariosPorBuscaDeNome(isSearching);
            } else {
                // Carregamento paginado padrão
                await listarFuncionariosPaginados(paginaAtual, tamanhoPagina);
            }
        };

        const delayDebounce = setTimeout(fetchData, isSearching ? 500 : 0);

        return () => {
            isMounted = false;
            clearTimeout(delayDebounce);
        };
    }, [isSearching, paginaAtual]);;

    return (
        <Layout ativo={"funcionarios"}>
            <Loading isLoading={loading} message="Carregando Funcionários...">
                <div className="header-funcionarios">
                    <div>
                        <h1>Gestão de Funcionários</h1>
                        <p>Visão geral dos Funcionários</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            onChange={(e) => setIsSearching(e.target.value)} />
                        <button className="add_funcionario btn btn-dark" onClick={abrirModalNovo}>
                            Adicionar novo Funcionário +
                        </button>

                        <ModalDesativar
                            isOpen={isModalDesativarOpen}
                            onClose={() => setIsModalDesativarOpen(false)}
                            onConfirm={confirmarDesativacao}
                            titulo="Desativar Funcionário"
                            subtitulo="Dados do Colaborador"
                            textoBotao="Desativar"
                            corBotao="#dc3545"
                            iconClass="bx-briefcase"
                            dados={funcionarioParaDesativar ? [
                                { label: "Nome Completo", value: funcionarioParaDesativar.nome, fullWidth: true },
                                { label: "Cargo", value: funcionarioParaDesativar.cargo },
                                { label: "Especialidade", value: funcionarioParaDesativar.especialidade },
                                { label: "Email Profissional", value: funcionarioParaDesativar.email, fullWidth: true },
                                { label: "Telefone", value: funcionarioParaDesativar.telefone, fullWidth: true }
                            ] : []}
                        />

                        <ModalAdicionarFuncionario
                            isOpen={modalAberto}
                            onClose={() => setModalAberto(false)}
                            funcionarioParaEditar={funcionarioParaEditar}
                            onSave={salvar}
                        />
                    </div>
                </div>

                <TabelaFuncionarios
                    funcionarios={funcionarios?.content ?? []}
                    excluirFuncionario={abrirModalDesativar}
                    editarFuncionario={lidarComEdicao}
                />

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted">
                        Página {paginaAtual + 1} de {funcionarios?.page?.total_pages ?? 1}
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
                            disabled={paginaAtual >= (funcionarios?.page?.total_pages - 1)}
                            onClick={() => setPaginaAtual(prev => prev + 1)}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </Loading>
        </Layout>
    );
}

export default GestaoFuncionarios;