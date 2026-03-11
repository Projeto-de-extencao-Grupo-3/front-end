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
        await api.delete(`/clientes/${id}`);
        setClientes(clientes.filter(c => c.id !== id));
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