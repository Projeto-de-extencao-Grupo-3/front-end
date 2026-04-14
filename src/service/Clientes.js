import { useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarClientesPaginados = async (pagina, tamanho) => {
        try {
            const response = await api.get(`/clientes/clientes-paginados?page=${pagina}&size=${tamanho}`);
            console.log("Resposta da API Clientes Paginados:", response.data);
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarCliente = async (dados) => {
        try {
            const payload = {
                nome: dados.nome,
                cpf_cnpj: dados.cpf_cnpj,
                telefone: dados.telefone,
                email: dados.email,
                tipo_cliente: dados.tipo_cliente === "Pessoa Física" ? "PESSOA_FISICA" : "PESSOA_JURIDICA",
                fk_oficina: 1,
                endereco: dados.endereco
            };

            const response = await api.post("/clientes", payload);
            await listarClientesPaginados(0, 8);
            exibirAlertaSucesso("Cliente adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar cliente. Verifique os dados e tente novamente.");
            console.error("Erro no Back-end:", error.response?.data);
            throw error;
        }
    };

    const excluirCliente = async (id) => {
        const confirmacao = await exibirAlertaConfirmacao(
            "Deseja realmente excluir este cliente?",
            "Sim, excluir",
            "Cancelar"
        );

        if (confirmacao.isConfirmed) {
            try {
                await api.delete(`/clientes/${id}`);
                setClientes(prev => prev.filter(c => {
                    const atualId = c.idCliente || c.id_cliente || c.id;
                    return Number(atualId) !== Number(id);
                }));
                exibirAlertaSucesso("Cliente excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir cliente:", error);
                exibirAlertaErro("Erro ao excluir no servidor.");
            }
        }
    };

    const atualizarCliente = async (dadosAtualizados) => {
        try {
            const response = await api.put("/clientes", dadosAtualizados);
            await listarClientesPaginados(0, 8);
            exibirAlertaSucesso("Cliente atualizado com sucesso!");
            return response.data;
        } catch (error) {
            console.error("Erro no Back-end (PUT):", error.response?.data);
            exibirAlertaErro("Erro ao atualizar cliente.");
            throw error;
        }
    };

    return { clientes, loading, listarClientesPaginados, adicionarCliente, excluirCliente, atualizarCliente };
}

export default Clientes;