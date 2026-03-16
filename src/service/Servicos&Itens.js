import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from './alertas';


function ServicosItens() {

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
    return {
        adicionarServico
    };
}

export default ServicosItens;


