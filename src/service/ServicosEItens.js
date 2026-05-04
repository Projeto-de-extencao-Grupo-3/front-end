import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from './alertas';


function ServicosItens() {
    const buscarOrdem = async (id) => {
        try {
            const response = await api.get(`/jornada/listagem/${id}`);
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

    const adicionarServico = async (idOrdemServico, dadosNecessarios) => {
        try {
            const response = await api.post(`/jornada/${idOrdemServico}/servicos`, dadosNecessarios);
            console.log("Dados recebidos para adicionar serviço:", dadosNecessarios);
            exibirAlertaSucesso("Serviço adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar serviço.");
            throw error;
        }
    };

    const adicionarProduto = async (idOrdemServico, dadosNecessarios) => {
        try {
            const response = await api.post(`/jornada/${idOrdemServico}/produtos`, dadosNecessarios);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    };

    const editarServico = async (idServico, dadosEditados) => {
        try {
            const response = await api.put(`/jornada/${idServico}/servicos`, dadosEditados);

            exibirAlertaSucesso("Serviço atualizado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar serviço.");
            console.error("Erro na API ao editar serviço:", error);
            throw error;
        }
    };

    const editarProduto = async (idProduto, dadosEditados) => {
        try {
            const response = await api.put(`/jornada/${idProduto}/produtos`, dadosEditados);

            exibirAlertaSucesso("Produto atualizado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar produto.");
            console.error("Erro na API ao editar produto:", error);
            throw error;
        }
    };

    const excluirServico = async (idServico) => {
        try {
            const _response = await api.delete(`/jornada/${idServico}/servicos`);
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
            const _response = await api.delete(`/jornada/${idProduto}/produtos`);
            exibirAlertaSucesso("Produto excluído com sucesso!");
            return true;
        } catch (error) {
            exibirAlertaErro("Erro ao excluir produto.");
            console.error("Erro ao excluir produto:", error);
            throw error;
        }
    };

    const listarPartesVeiculo = async () => {
        try {
            const response = await api.options("/itens-servicos/partes_veiculo");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar partes do veículo.");
            throw error;
        }
    };

    const listarTiposPintura = async () => {
        try {
            const response = await api.options("/itens-servicos/tipos_pintura");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar tipos de pintura.");
            throw error;
        }
    };

    const listarTiposServico = async () => {
        try {
            const response = await api.options("/itens-servicos/tipos_servico");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar tipos de serviço.");
            throw error;
        }
    };

    const listarLadosVeiculo = async () => {
        try {
            const response = await api.options("/itens-servicos/lados_veiculo");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao buscar lados do veículo.");
            throw error;
        }
    };

    const baixarProduto = async (idItemProduto, quantidade, tela) => {
        try {
            const url = quantidade
                ? `/itens-produtos/baixa-estoque/${idItemProduto}?quantidade=${quantidade}&tela=${tela}`
                : `/itens-produtos/baixa-estoque/${idItemProduto}`;
            const response = await api.patch(url);

            exibirAlertaSucesso("Produto baixado com sucesso!");
            return response.data; 
        } catch (error) {
            exibirAlertaErro("Erro ao baixar produto.");
            throw error;
        }
    };

    return {
        buscarOrdem,
        buscarProdutos,
        adicionarServico,
        adicionarProduto,
        editarServico,
        editarProduto,
        excluirServico,
        excluirProduto,
        baixarProduto,
        listarPartesVeiculo,
        listarTiposPintura,
        listarTiposServico,
        listarLadosVeiculo
    };
}

export default ServicosItens;


