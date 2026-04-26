import { useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';


function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarProdutosPaginados = async (tamanhoPagina, pagina) => {
        try {
            const response = await api.get(`/produtos/produtos-paginados?size=${pagina}&page=${tamanhoPagina}`);
            console.log("Resposta da API Produtos Paginados:", response.data);
            setProdutos(response.data);
        } catch (error) {
            exibirAlertaErro("Erro ao buscar produtos.");
            throw error
        } finally {
            setLoading(false);
        }
    };

    const listarProdutosPaginadosPorServico = async (servico, tamanhoPagina, pagina) => {
        try {
            const response = await api.get(`/produtos/por-servico?tipo=${servico}&size=${pagina}&page=${tamanhoPagina}`);
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

    const listarTipoServicos = async () => {
        try {
            const response = await api.options("/produtos/tipos_servico");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar tipos de serviços.");
            throw error;
        }
    }

    const excluirProduto = async (id) => {
        const confirmacao = await exibirAlertaConfirmacao("Deseja realmente excluir este produto?");

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/produtos/${id}`);
                exibirAlertaSucesso("Produto excluído com sucesso!");
                return true;
            } catch (error) {
                exibirAlertaErro("Erro ao excluir produto.");
                throw error
            }
        }
    };

    const atualizarProduto = async (id, dadosAtualizados) => {
        try {
            const response = await api.put(`/produtos/${id}`, dadosAtualizados);
            exibirAlertaSucesso("Produto atualizado com sucesso!");
            return response.data; 
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar produto.");
            throw error;
        }
    };

    const realizarBaixaEstoqueProduto = async (id) => {
        try {
            const response = await api.patch(`/itens-produtos/baixa-estoque/${id}`);
            const produtoAtualizado = response.data;
            exibirAlertaSucesso("Quantidade atualizada com sucesso!");
            return produtoAtualizado;
        } catch (error) {
            exibirAlertaErro("Erro ao dar baixo no produto.");
            throw error;
        }
    };

    const listarProdutosPorBuscaDeNome = async (nome) => {
        try {
            const response = await api.get(`/produtos/busca/nome?nome=${encodeURIComponent(nome)}`);
            console.log("Resposta da API Produtos por Nome:", response.data);
            setProdutos(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos por nome:", error);
            throw error;
        }
    }

    return {
        produtos,
        listarProdutosById,
        listarProdutosPaginados,
        listarProdutosPorBuscaDeNome,
        listarProdutosPaginadosPorServico,
        loading,
        adicionarProduto,
        excluirProduto,
        atualizarProduto,
        realizarBaixaEstoqueProduto,
        listarTipoServicos
    };
}

export default Produtos;