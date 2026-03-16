import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import TabelaEstoque from "../../components/Layout/TabelaEstoque.jsx";
import "./ControleEstoque.css";
import ExibirNovoItem from "../../components/ModalNovoItem/ExibirNovoItem.jsx";
import ModalNovoItem from "../../components/ModalNovoItem/ModalNovoItem.jsx";
import ModalDesativarEstoque from "../../components/ModalClientesFuncionarios/ModalDesativarEstoque.jsx";
import EditarQuantidadeEstoque from "../../components/ModalNovoItem/EditarQuantidadeEstoque.jsx";
import Produtos from "../../service/Produtos.js";

function ControleEstoque() {
    const { produtos, excluirProduto, adicionarProduto, atualizarProduto, atualizarQuantidadeEstoque } = Produtos();

    const [produtosParaEditar, setProdutosParaEditar] = useState(null);
    const [itemParaDesativar, setItemParaDesativar] = useState(null);
    const [itemParaAjustarEstoque, setItemParaAjustarEstoque] = useState(null);

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarModalExibir, setMostrarModalExibir] = useState(false);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);
    const [editarQuantidadeEstoque, setEditarQuantidadeEstoque] = useState(false);

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

    const confirmarAjusteEstoque = async (novaQuantidade) => {
        try {
            const id = itemParaAjustarEstoque.id_peca || itemParaAjustarEstoque.id;

            const dadosParaEnviar = {
                id: id, 
                quantidade_estoque: parseInt(novaQuantidade)
            };

            await atualizarQuantidadeEstoque(id, dadosParaEnviar);
            setEditarQuantidadeEstoque(false);
            setItemParaAjustarEstoque(null);
        } catch (error) {
            console.error("Erro ao ajustar estoque:", error);
        }
    };

    return (
        <Layout ativo={"estoque"}>
            <div className="header-clientes">
                <div>
                    <h1>Catálogo de Serviços</h1>
                    <p>Visão geral dos serviços/estoque</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                    <input type="text" className="form-control" placeholder="Filtrar itens por nome" />
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                        Adicionar novo item +
                    </button>
                </div>
            </div>

            <TabelaEstoque
                produtos={produtos}
                excluirProdutos={lidarComDesativacao}
                editarProdutos={lidarComEdicao}
                editarQuantidadeEstoque={lidarComAjusteEstoque}
            />

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
        </Layout>
    );
}

export default ControleEstoque;