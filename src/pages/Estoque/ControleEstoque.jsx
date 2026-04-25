import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import TabelaEstoque from "../../components/Layout/TabelaEstoque.jsx";
import "./ControleEstoque.css";
import ExibirNovoItem from "../../components/ModalNovoItem/ExibirNovoItem.jsx";
import ModalNovoItem from "../../components/ModalNovoItem/ModalNovoItem.jsx";
import ModalDesativarEstoque from "../../components/ModalClientesFuncionarios/ModalDesativarEstoque.jsx";
import EditarQuantidadeEstoque from "../../components/ModalNovoItem/EditarQuantidadeEstoque.jsx";
import Produtos from "../../service/Produtos.js";
import Loading from "../../components/Loading/Loading.jsx";

function ControleEstoque() {
    const { produtos, loading, listarProdutosPaginados, listarProdutosPorBuscaDeNome, listarProdutosPaginadosPorServico, excluirProduto, adicionarProduto, atualizarProduto, realizarBaixaEstoqueProduto } = Produtos();

    const [produtosParaEditar, setProdutosParaEditar] = useState(null);
    const [itemParaDesativar, setItemParaDesativar] = useState(null);
    const [itemParaAjustarEstoque, setItemParaAjustarEstoque] = useState(null);

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarModalExibir, setMostrarModalExibir] = useState(false);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);
    const [editarQuantidadeEstoque, setEditarQuantidadeEstoque] = useState(false);

    const [categoriaAtiva, setCategoriaAtiva] = useState("TODOS");

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [tamanhoPagina] = useState(8);
    const [isSearching, setIsSearching] = useState("");

    const categorias = [
        { id: "FUNILARIA", label: "FUNILARIA", icon: "bx-gear" },
        { id: "PINTURA", label: "PINTURA", icon: "bx-paint-roll" },
        { id: "VEDACAO", label: "VEDACAO", icon: "bx-package" },
        { id: "POLIMENTO", label: "POLIMENTO", icon: "bx-paint-roll" },
        { id: "RECUPERACAO", label: "RECUPERACAO", icon: "bx-recycle" },
        { id: "DESMONTAGEM", label: "DESMONTAGEM", icon: "bx-package" },
        { id: "MONTAGEM", label: "MONTAGEM", icon: "bx-package" },
        { id: "TROCA", label: "TROCA", icon: "bx-package" },
        { id: "ELETRICA", label: "ELETRICA", icon: "bx-light-bulb" },
        { id: "MECANICA", label: "MECANICA", icon: "bx-spanner" },
        { id: "OUTROS", label: "OUTROS", icon: "bx-package" },
    ];

    const lidarComAjusteEstoque = (produto) => {
        setItemParaAjustarEstoque(produto);
        setEditarQuantidadeEstoque(true);
    };

    const lidarComEdicao = (produto) => {
        setProdutosParaEditar(produto);
        setMostrarModalExibir(true);
    };

    const lidarComDesativacao = (produto) => {
        setItemParaDesativar(produto);
        setIsModalDesativarOpen(true);
    };

    const confirmarDesativacao = async () => {
        try {
            const id = itemParaDesativar.id_peca || itemParaDesativar.id;
            await excluirProduto(id);

            if (categoriaAtiva === "TODOS") {
                await listarProdutosPaginados(paginaAtual, tamanhoPagina);
            } else {
                await listarProdutosPaginadosPorServico(categoriaAtiva, paginaAtual, tamanhoPagina);
            }

            setIsModalDesativarOpen(false);
            setItemParaDesativar(null);
        } catch (error) {
            console.error("Erro ao desativar item:", error);
        }
    };

    const salvarEdicao = async (dados, id) => {
        try {
            const idFinal = id || dados.id_peca || dados.idPeca || dados.id;
            await atualizarProduto(idFinal, dados);

            if (categoriaAtiva === "TODOS") {
                await listarProdutosPaginados(paginaAtual, tamanhoPagina);
            } else {
                await listarProdutosPaginadosPorServico(categoriaAtiva, paginaAtual, tamanhoPagina);
            }

            setMostrarModalExibir(false);
        } catch (error) {
            console.error("Erro no update:", error);
        }
    };

    const salvarNovo = async (dados) => {
        try {
            await adicionarProduto(dados);
            setMostrarModalAdicionar(false);
        } catch (error) {
            console.error("Erro no cadastro:", error);
        }
    };

    const confirmarAjusteEstoque = async (_novaQuantidade) => {
        try {
            const id = itemParaAjustarEstoque.id_peca || itemParaAjustarEstoque.id;

            await realizarBaixaEstoqueProduto(id);
            listarProdutosPaginados(paginaAtual, tamanhoPagina);
            setEditarQuantidadeEstoque(false);
            setItemParaAjustarEstoque(null);
        } catch (error) {
            console.error("Erro ao ajustar estoque:", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isSearching.trim()) {
                listarProdutosPorBuscaDeNome(isSearching.trim());
                return;
            }

            if (categoriaAtiva === "TODOS") {
                listarProdutosPaginados(paginaAtual, tamanhoPagina);
            } else {
                listarProdutosPaginadosPorServico(categoriaAtiva, paginaAtual, tamanhoPagina);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [paginaAtual, categoriaAtiva, isSearching]);

    const mudarCategoria = (id) => {
        setPaginaAtual(0);
        setCategoriaAtiva(categoriaAtiva === id ? "TODOS" : id);
    };

    return (
        <Layout ativo={"estoque"}>
            <Loading isLoading={loading} message="Carregando Estoque...">
                <div className="header-clientes">
                    <div>
                        <h1>Catálogo do Estoque</h1>
                        <p>Visão geral dos serviços/estoque</p>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrar itens por nome"
                            value={isSearching}
                            onChange={(e) => {
                                setPaginaAtual(0);
                                setIsSearching(e.target.value);
                            }}
                        />
                        <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                            Adicionar novo item +
                        </button>
                    </div>
                </div>

                <div className="d-flex gap-2 mb-4 mt-3 flex-wrap">
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => mudarCategoria(cat.id)}
                            className={`btn d-flex align-items-center gap-2 px-4 py-2 fw-semibold transition-all shadow-sm`}
                            style={{
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                backgroundColor: categoriaAtiva === cat.id ? '#1b4a7d' : '#fff',
                                color: categoriaAtiva === cat.id ? '#fff' : '#888',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase'
                            }}
                        >
                            <i className={`bx ${cat.icon}`} style={{ fontSize: '1.2rem' }}></i>
                            {cat.label}
                        </button>
                    ))}
                </div>

                <TabelaEstoque
                    produtos={produtos.content || []}
                    excluirProdutos={lidarComDesativacao}
                    editarProdutos={lidarComEdicao}
                    editarQuantidadeEstoque={lidarComAjusteEstoque}
                />

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted">
                        Página {paginaAtual + 1} de {produtos?.page?.total_pages || 1}
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
                            disabled={paginaAtual >= (produtos?.page?.total_pages - 1)}
                            onClick={() => setPaginaAtual(prev => prev + 1)}
                        >
                            Próximo
                        </button>
                    </div>
                </div>

                <ModalNovoItem
                    isOpen={mostrarModalAdicionar}
                    onClose={() => setMostrarModalAdicionar(false)}
                    onSave={salvarNovo}
                />

                <ExibirNovoItem
                    isOpen={mostrarModalExibir}
                    onClose={() => setMostrarModalExibir(false)}
                    onUpdate={salvarEdicao}
                    dadosDoProduto={produtosParaEditar}
                />

                <ModalDesativarEstoque
                    isOpen={isModalDesativarOpen}
                    onClose={() => setIsModalDesativarOpen(false)}
                    onConfirm={confirmarDesativacao}
                    itemParaDesativar={itemParaDesativar}
                />

                <EditarQuantidadeEstoque
                    show={editarQuantidadeEstoque}
                    handleClose={() => setEditarQuantidadeEstoque(false)}
                    handleConfirm={confirmarAjusteEstoque}
                    itemParaAjustarEstoque={itemParaAjustarEstoque}
                />
            </Loading>
        </Layout>
    );
}

export default ControleEstoque;