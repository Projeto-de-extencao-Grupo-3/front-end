import { useEffect, useState } from "react";
import api from "./api";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarProdutos = async () => {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarProduto = async (dadosDoFormulario) => {
        try {
            const response = await api.post("/produtos", dadosDoFormulario);

            setProdutos(prevClientes => [...prevClientes, response.data]);

            return response.data;
        } catch (error) {
            console.error("Erro na requisição POST:", error);
            throw error;
        }
    };

    const excluirProduto = async (id) => {
        try {
            await api.delete(`/produtos/${id}`);

            setProdutos(prev => prev.filter(produto => {
                const atualId = produto.id_peca || produto.idPeca;
                return Number(atualId) !== Number(id);
            }));

            console.log("Produto removido da tela com sucesso");
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir no servidor.");
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

        return produtoAtualizado;
    } catch (error) {
        console.error("Erro ao atualizar: ", error);
        throw error;
    }
};

    useEffect(() => {
        listarProdutos();
    }, []);

    return { produtos, loading, adicionarProduto, excluirProduto, atualizarProduto };
}

export default Produtos