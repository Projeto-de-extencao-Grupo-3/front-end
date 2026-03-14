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
            console.error("Erro ao buscar clientes:", error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarCliente = async (dadosDoCliente, dadosDoEndereco) => {
        try {
            const payload = {
                // Ajustado para bater com o RequestPostCliente.java
                nome: dadosDoCliente.nome,
                cpf_cnpj: dadosDoCliente.cpfCnpj.replace(/\D/g, ''), // CamelCase
                telefone: dadosDoCliente.telefone.replace(/\D/g, ''),
                email: dadosDoCliente.email,
                tipo_cliente: dadosDoCliente.tipo === "Pessoa Física" ? "PESSOA_FISICA" : "PESSOA_JURIDICA",
                fk_oficina: 1,
                fk_endereco: Number(dadosDoEndereco.id_endereco)
            };

            console.log("Enviando Payload:", payload);
            const response = await api.post("/clientes", payload);

            await listarClientes();

            return response.data;
        } catch (error) {
            console.error("Erro no Back-end:", error.response?.data);
            throw error;
        }
    };

    const excluirCliente = async (id) => {
        try {
            await api.delete(`/clientes/${id}`);
            setClientes(prev => prev.filter(c => {
                const atualId = c.idCliente || c.id_cliente || c.id;
                return Number(atualId) !== Number(id);
            }));
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir no servidor.");
        }
    };

    const atualizarCliente = async (dadosAtualizados) => {
        try {
            const response = await api.put("/clientes", dadosAtualizados);

            await listarClientes();

            return response.data;
        } catch (error) {
            console.error("Erro no Back-end (PUT):", error.response?.data);
            throw error;
        }
    };

    useEffect(() => {
        listarClientes();
    }, []);

    return { clientes, loading, adicionarCliente, excluirCliente, atualizarCliente };
}

export default Clientes;