import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from "./alertas";

function GerarPdf() {

    const gerarOrdemServico = async (idOrcamento) => {
        try {
            await api.post(`/arquivos/ordem_servico/${idOrcamento}`);
        } catch (error) {
            exibirAlertaErro("Erro ao gerar pdf da ordem de serviço.");
            console.error(error);
            throw error;
        }
    };

    const gerarOrcamento = async (idOrdemServico) => {
        try {
            await api.post(`/arquivos/orcamento/${idOrdemServico}`);
        } catch (error) {
            exibirAlertaErro("Erro ao gerar pdf da ordem de serviço.");
            console.error(error);
            throw error;
        }
    };

    const buscarOrcamento = async (idOrcamento) => {
        try {
            const response = await api.get(`/arquivos/orcamento/${idOrcamento}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const buscarOrdemServico = async (idOrdemServico) => {
        try {
            const response = await api.get(`/arquivos/ordem_servico/${idOrdemServico}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        gerarOrdemServico,
        gerarOrcamento,
        buscarOrcamento,
        buscarOrdemServico
    };
}

export default GerarPdf;