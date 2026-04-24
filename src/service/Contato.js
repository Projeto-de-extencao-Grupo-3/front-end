import { useState } from "react";
import api from "./api";
import { exibirAlertaConfirmacao, exibirAlertaErro, exibirAlertaSucesso } from "./alertas";

function Contatos() {
    const [loading, setLoading] = useState(false);

    const atualizarContato = async (dados) => {
        const idCliente = dados.id_cliente;
        const idContato = dados.id_contato ?? dados?.contato?.id_contato;
        const payload = dados.contato ?? dados;

        if (!idCliente || !idContato) {
            throw new Error("id_cliente e id_contato são obrigatórios para atualizar contato.");
        }

        setLoading(true);
        try {
            const response = await api.put(`/clientes/${idCliente}/contatos/${idContato}`, payload);
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    const adicionarContato = async (dados) => {
        const idCliente = dados.id_cliente;
        const payload = dados.contato ?? dados;

        if (!idCliente) {
            throw new Error("id_cliente é obrigatório para adicionar contato.");
        }

        const response = await api.post(`/clientes/${idCliente}/contatos`, payload);
        return response.data;
    };

    const excluirContato = async (idCliente, idContato) => {
        const confirmacao = await exibirAlertaConfirmacao(
            "Deseja realmente excluir este contato?",
            "Sim, excluir",
            "Cancelar"
        );

        if (!confirmacao.isConfirmed) {
            return false;
        }

        try {
            await api.delete(`/clientes/${idCliente}/contatos/${idContato}`);
            exibirAlertaSucesso("Contato excluído com sucesso!");
            return true;
        } catch (error) {
            console.error("Erro ao excluir contato:", error);
            exibirAlertaErro("Erro ao excluir no servidor.");
            return false;
        }
    };

    return { adicionarContato, atualizarContato, excluirContato, loading };

}

export default Contatos;