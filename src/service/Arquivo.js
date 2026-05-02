import axios from "axios";

const API_URL = "http://localhost:8080/arquivos";

const Arquivo = {
    buscarImagensVistoria: async (idOrdemServico) => {
        const response = await axios.get(`${API_URL}/vistoria/${idOrdemServico}`);
        return response.data;
    },

    uploadVistoria: async (idOrdemServico, arquivo) => {
        const formData = new FormData();
        formData.append("file", arquivo);
        const categoriaEnum = "ORDEM_SERVICO"; 

        return await axios.post(
            `${API_URL}/vistoria/${idOrdemServico}/${categoriaEnum}`, 
            formData, 
            { headers: { "Content-Type": "multipart/form-data" } }
        );
    }
};

export default Arquivo;