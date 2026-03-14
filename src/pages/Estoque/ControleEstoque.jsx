import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import TabelaEstoque from "../../components/Layout/TabelaEstoque.jsx";
import "./ControleEstoque.css";
import ExibirNovoItem from "../../components/ModalNovoItem/ExibirNovoItem.jsx";
import ModalNovoItem from "../../components/ModalNovoItem/ModalNovoItem.jsx";
import Produtos from "../../service/Produtos.js";

function ControleEstoque() {
    const { produtos, excluirProduto, adicionarProduto, atualizarProduto } = Produtos();
    const [produtosParaEditar, setProdutosParaEditar] = useState(null);

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);

    const [mostrarModalExibir, setMostrarModalExibir] = useState(false);

    const lidarComEdicao = (produto) => {
        console.log("Abrindo modal para editar:", produto);
        setProdutosParaEditar(produto);
        setMostrarModalExibir(true);
    };

    const abrirModalNovo = () => {
        console.log("Abrindo modal para novo");
        setProdutosParaEditar(null);
        setMostrarModalAdicionar(true);
    };

    const salvarEdicao = async (dados, id) => {
        try {
            const idFinal = id || dados.id_peca || dados.idPeca || dados.id;

            if (!idFinal) {
                console.error("Erro: ID do produto não encontrado!");
                alert("Não foi possível identificar o item para atualizar.");
                return;
            }

            await atualizarProduto(idFinal, dados);
            setMostrarModalExibir(false);
        } catch (error) {
            console.error("Erro no update:", error);
        }
    };

    // Função de Create (usada pelo Modal Adicionar)
    const salvarNovo = async (dados) => {
        try {
            await adicionarProduto(dados);
            setMostrarModalAdicionar(false);
        } catch (error) {
            console.error("Erro no cadastro:", error);
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar itens por nome"
                        aria-label="Filtrar itens"
                    />
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={abrirModalNovo}>
                        Adicionar novo item +
                    </button>
                    <ModalNovoItem
                        isOpen={mostrarModalAdicionar}
                        onClose={() => setMostrarModalAdicionar(false)}
                        onSave={salvarNovo}
                        produtosParaEditar={produtosParaEditar}
                    />
                    <ExibirNovoItem
                        isOpen={mostrarModalExibir}
                        onClose={() => setMostrarModalExibir(false)}
                        onUpdate={salvarEdicao}
                        dadosDoProduto={produtosParaEditar}
                    />
                </div>
            </div>
            <TabelaEstoque
                produtos={produtos}
                excluirProdutos={excluirProduto}
                editarProdutos={lidarComEdicao}
            />
        </Layout>
    );
}

export default ControleEstoque;