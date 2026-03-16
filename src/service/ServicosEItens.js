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
            const response = await api.post("/itens-servicos", dadosNecessarios);
            exibirAlertaSucesso("Serviço adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar serviço.");
            throw error;
        }
    };

    const adicionarProduto = async (dadosNecessarios) => {
        try {
            const response = await api.post("/itens-produtos", dadosNecessarios);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    };
    return {
        buscarOrdem,
        buscarProdutos,
        adicionarServico,
        adicionarProduto
    };
}

export default ServicosItens;


