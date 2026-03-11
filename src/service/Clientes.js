import { useEffect, useState } from "react";
import api from "./api";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarClientes = async () => {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarCliente = async (dadosDoFormulario) => {
        try {
            const response = await api.post("/clientes", dadosDoFormulario);

            setClientes(prevClientes => [...prevClientes, response.data]);

            return response.data;
        } catch (error) {
            console.error("Erro na requisição POST:", error);
            throw error;
        }
    };

    const excluirCliente = async (id) => {
        try {
            await api.delete(`/clientes/${id}`);

            setClientes(prev => prev.filter(cliente => {
                const atualId = cliente.idCliente || cliente.id_cliente || cliente.id;
                return Number(atualId) !== Number(id);
            }));

            console.log("Cliente removido da tela com sucesso");
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir no servidor.");
        }
    };

    const atualizarCliente = async (id, dadosAtualizados) => {
        const response = await api.put(`/clientes/${id}`, dadosAtualizados);
        setClientes(clientes.map(c => c.id === id ? response.data : c));
    };

    useEffect(() => {
        listarClientes();
    }, []);

    return { clientes, loading, adicionarCliente, excluirCliente, atualizarCliente };
}

export default Clientes;