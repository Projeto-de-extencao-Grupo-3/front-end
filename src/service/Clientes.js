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

const adicionarCliente = async (dadosDoCliente, dadosDoEndereco) => {
    try {
        const payload = {
            nome: dadosDoCliente.nome,
            cpf_cnpj: dadosDoCliente.cpfCnpj, 
            telefone: dadosDoCliente.telefone,
            email: dadosDoCliente.email,
            tipo_cliente: dadosDoCliente.tipo === "Pessoa Física" ? "PESSOA_FISICA" : "PESSOA_JURIDICA",
            fk_oficina: 1, 
            fk_endereco: Number(dadosDoEndereco.id_endereco) 
        };

        console.log("Enviando para o DTO:", payload);
        const response = await api.post("/clientes", payload);
        return response.data;
    } catch (error) {
        console.error("Erro no Back-end:", error.response?.data);
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