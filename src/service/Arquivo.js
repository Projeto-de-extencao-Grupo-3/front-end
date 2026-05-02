import api from "./api";

const Arquivo = {
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