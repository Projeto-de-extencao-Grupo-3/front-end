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
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const adicionarCliente = async (dados) => {
        try {
            const payload = {
                nome: dados.nome,
                cpf_cnpj: dados.cpf_cnpj,
                tipo_cliente: dados.tipo_cliente || dados.tipo || "PESSOA_FISICA",
                inscricao_estadual: dados.inscricao_estadual,
                fk_oficina: 1,
                endereco: dados.endereco,
                contatos: Array.isArray(dados.contatos) ? dados.contatos : []
            };

            console.log("Payload para adicionar cliente:", payload);

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
                setClientes((prev) => {
                    const removerCliente = (lista) =>
                        lista.filter((c) => {
                            const atualId = c.idCliente || c.id_cliente || c.id;
                            return Number(atualId) !== Number(id);
                        });

                    if (Array.isArray(prev)) {
                        return removerCliente(prev);
                    }

                    if (prev && Array.isArray(prev.content)) {
                        return { ...prev, content: removerCliente(prev.content) };
                    }

                    return prev;
                });
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