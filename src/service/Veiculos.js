import api from "./api";
import { exibirAlertaErro } from './alertas';

function Veiculos() {
    const buscarVeiculosPorCliente = async (idCliente) => {
        try {
            const response = await api.get(`/veiculos/cliente/${idCliente}`);
            console.log("back:", response);
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar veículos do cliente!");
            console.error("Erro ao buscar veículos por cliente:", error);
            throw error;
        }
    };

    const buscarOrdensPorVeiculo = async (idVeiculo, periodo) => {
        try {
            const response = await api.get(`/ordens/veiculo/${idVeiculo}?intervalo=${periodo}`);
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar ordens do veículo!");
            console.error("Erro ao buscar ordens do veículo:", error);
            throw error;
        }
    };

    return {
        buscarVeiculosPorCliente,
        buscarOrdensPorVeiculo
    }
}


export default Veiculos