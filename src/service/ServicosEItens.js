import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from './alertas';


function ServicosItens() {
    const buscarOrdem = async (id) => {
        try {
            const response = await api.get(`/ordens/${id}`);
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar ordem!");
            console.error(error);
            throw error;
        }
    };

    const buscarProdutos = async () => {
        try {
            const response = await api.get("/produtos");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar produtos!");
            console.error(error);
            throw error;
        }
    };

    const adicionarServico = async (dadosNecessarios) => {
        try {
            const response = await api.post(`/jornada/${dadosNecessarios.fk_ordem_servico}/servicos`, dadosNecessarios);
            console.log("Dados recebidos para adicionar serviço:", dadosNecessarios);
            exibirAlertaSucesso("Serviço adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar serviço.");
            throw error;
        }
    };

    const adicionarProduto = async (dadosNecessarios) => {
        try {
            const response = await api.post(`/jornada/${dadosNecessarios.fk_ordem_servico}/produtos`, dadosNecessarios);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    };

    const editarServico = async (idServico, dadosEditados) => {
        try {
            const response = await api.put(`/itens-servicos/${idServico}`, dadosEditados);

            exibirAlertaSucesso("Serviço atualizado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar serviço.");
            console.error("Erro na API ao editar serviço:", error);
            throw error;
        }
    };

    const excluirServico = async (idServico) => {
        try {
            const _response = await api.delete(`/itens-servicos/${idServico}`);
            exibirAlertaSucesso("Serviço excluído com sucesso!");
            return true;
        } catch (error) {
            exibirAlertaErro("Erro ao excluir serviço.");
            console.error("Erro ao excluir serviço:", error);
            throw error;
        }
    };

    const excluirProduto = async (idProduto) => {
        try {
            const _response = await api.delete(`/itens-produtos/${idProduto}`);
            exibirAlertaSucesso("Produto excluído com sucesso!");
            return true;
        } catch (error) {
            exibirAlertaErro("Erro ao excluir produto.");
            console.error("Erro ao excluir produto:", error);
            throw error;
        }
    };

    return {
        buscarOrdem,
        buscarProdutos,
        adicionarServico,
        adicionarProduto,
        editarServico,
        excluirServico,
        excluirProduto
    };
}

export default ServicosItens;


