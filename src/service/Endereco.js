import { useState } from "react";
import api from "./api";
import { exibirAlertaConfirmacao, exibirAlertaErro, exibirAlertaSucesso } from "./alertas";

function Enderecos() {
    const [loading, setLoading] = useState(false);

    const buscarEnderecoViaCEP = async (cep) => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) return null;

        setLoading(true);
        try {
            const response = await api.get(`/clientes/sem_id/enderecos/viacep/${cepLimpo}`);

            console.log("Endereço encontrado:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao encontrar o endereço:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const atualizarEndereco = async (dados) => {
        const idCliente = dados.id_cliente;
        const idEndereco = dados.id_endereco;
        const payload = dados.endereco;

        if (!idCliente || !idEndereco) {
            throw new Error("id_cliente e id_endereco são obrigatórios para atualizar endereço.");
        }

        const response = await api.put(`/clientes/${idCliente}/enderecos/${idEndereco}`, payload);
        return response.data;
    };

    const adicionarEndereco = async (dados) => {
        const idCliente = dados.id_cliente;
        const payload = dados.endereco;

        if (!idCliente) {
            throw new Error("id_cliente é obrigatório para adicionar endereço.");
        }

        const response = await api.post(`/clientes/${idCliente}/enderecos`, payload);
        return response.data;
    };

    const cadastrarEnderecoVazio = async (idCliente) => {
        try {
            const response = await api.post(`/clientes/${idCliente}/enderecos/registrar-vazio`);
            return response.data;
        } catch (error) {
            console.error("Erro ao cadastrar endereço vazio:", error);
            return null;
        }
    };

    const excluirEndereco = async (idCliente, idEndereco) => {
        const confirmacao = await exibirAlertaConfirmacao(
            "Deseja realmente excluir este endereço?",
            "Sim, excluir",
            "Cancelar"
        );

        if (!confirmacao.isConfirmed) {
            return false;
        }

        try {
            await api.delete(`/clientes/${idCliente}/enderecos/${idEndereco}`);
            exibirAlertaSucesso("Endereço excluído com sucesso!");
            return true;
        } catch (error) {
            console.error("Erro ao excluir endereço:", error);
            exibirAlertaErro("Erro ao excluir no servidor.");
            return false;
        }
    };


    return { adicionarEndereco, buscarEnderecoViaCEP, cadastrarEnderecoVazio, atualizarEndereco, loading, excluirEndereco };
}

export default Enderecos;