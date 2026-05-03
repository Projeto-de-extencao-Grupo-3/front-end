import api from "./api";

import {
    exibirAlertaSucesso,
    exibirAlertaErro,
    exibirAlertaConfirmacao
} from "./alertas";

const Arquivo = {
    deletarImagemVistoria: async (idArquivo) => {
        // Confirmar
        const confirmado = await exibirAlertaConfirmacao("Tem certeza que deseja excluir esta imagem?", "Sim, desejo excluir");
        if (!confirmado) return false;

        const response = await api.delete(`arquivos/${idArquivo}`);

        if (response.status === 200) {
            exibirAlertaSucesso("Imagem excluída com sucesso!");
            return true;
        } else {
            exibirAlertaErro("Ocorreu um erro ao excluir a imagem. Tente novamente.");
            return false;
        }
    },

    buscarImagensVistoria: async (idOrdemServico, categoriaEnum) => {
        const response = await api.get(`arquivos/vistoria/${idOrdemServico}/${categoriaEnum}`);
        return response.data;
    },

    uploadVistoria: async (idOrdemServico, arquivo, categoriaEnum) => {
        const formData = new FormData();
        formData.append("file", arquivo);

        return await api.post(`arquivos/vistoria/${idOrdemServico}/${categoriaEnum}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
    }
};

export default Arquivo;