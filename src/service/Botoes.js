import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from './alertas';


function Botoes() {
    const definirDataPrevista = async (idOrdem, infosAgendamento) => {
        try {
            const response = await api.patch(`/jornada/${idOrdem}/definir-data-saida-prevista`, infosAgendamento );
            exibirAlertaSucesso("Data de saída prevista definida com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao definir data de saída prevista da ordem de serviço.");
            console.error("Erro na API ao definir data de saída prevista da ordem de serviço:", error);
            throw error;
        }
    };

    const atualizarStatus = async (idOrdem, novoStatus) => {
        try {
            const response = await api.patch(`/jornada/${idOrdem}/atualizar-status`,  novoStatus );

            exibirAlertaSucesso("Status atualizado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar status da ordem de serviço.");
            console.error("Erro na API ao atualizar status da ordem de serviço:", error);
            throw error;
        }
    };

    const realizarNotaFiscal = async (idOrdem) => {
        try {
            const response = await api.patch(`/jornada/${idOrdem}/definir-nota-fiscal-realizada`);

            exibirAlertaSucesso("Nota fiscal realizada com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao realizar nota fiscal da ordem de serviço.");
            console.error("Erro na API ao realizar nota fiscal da ordem de serviço:", error);
            throw error;
        }
    };

    const realizarPagamento = async (idOrdem) => {
        try {
            const response = await api.patch(`/jornada/${idOrdem}/definir-pagamento-realizado`);

            exibirAlertaSucesso("Pagamento realizado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao realizar o pagamento da ordem de serviço.");
            console.error("Erro na API ao realizar o pagamento da ordem de serviço:", error);
            throw error;
        }
    };

    return {
        definirDataPrevista,
        atualizarStatus,
        realizarNotaFiscal,
        realizarPagamento
    };
}

export default Botoes;