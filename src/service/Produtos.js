import { useEffect, useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';


function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarProdutos = async () => {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            exibirAlertaErro("Erro ao buscar produtos.");
            throw error
        } finally {
            setLoading(false);
        }
    };

    const listarProdutosById = async (id) => {
        try {
            const response = await api.get(`/produtos/${id}`);
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar produtos.");
            throw error
        } 
    };

    const adicionarProduto = async (dadosDoFormulario) => {
        try {
            const response = await api.post("/produtos", dadosDoFormulario);
            setProdutos(prevClientes => [...prevClientes, response.data]);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    };

    const excluirProduto = async (id) => {
        const confirmacao = await exibirAlertaConfirmacao("Deseja realmente excluir este produto?");
        
        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/produtos/${id}`);
                setProdutos(prev => prev.filter(produto => {
                    const atualId = produto.id_peca || produto.idPeca;
                    return Number(atualId) !== Number(id);
                }));
                exibirAlertaSucesso("Produto excluído com sucesso!");
            } catch (error) {
                exibirAlertaErro("Erro ao excluir produto.");
                throw error
            }
        }
    };

    const atualizarProduto = async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`/produtos/${id}`, dadosAtualizados);
            const produtoAtualizado = response.data;
            setProdutos(prev => prev.map(p => {
                const isTarget = p.id_peca === id || p.idPeca === id || p.id === id;
                return isTarget ? produtoAtualizado : p;
            }));
            exibirAlertaSucesso("Produto atualizado com sucesso!");
            return produtoAtualizado;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar produto.");
            throw error;
        }
    };

    const atualizarQuantidadeEstoque = async (id, dadosAtualizados) => {
        try {
            const response = await api.patch(`/produtos/quantidade-estoque`, dadosAtualizados);
            const produtoAtualizado = response.data;
            setProdutos(prev => prev.map(p => {
                const isTarget = p.id_peca === id || p.idPeca === id || p.id === id;
                return isTarget ? produtoAtualizado : p;
            }));
            exibirAlertaSucesso("Quantidade atualizado com sucesso!");
            return produtoAtualizado;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar a quantidade.");
            throw error;
        }
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    return { 
        produtos, 
        listarProdutosById,
        loading, 
        adicionarProduto, 
        excluirProduto, 
        atualizarProduto, 
        atualizarQuantidadeEstoque };
}

export default Produtos;