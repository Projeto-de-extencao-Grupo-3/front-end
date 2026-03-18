import api from "./api"; 

function ReconhecimentoPlaca() {
    const reconhecerPlaca = async (arquivo) => {
        // 1. Validar se o arquivo existe
        if (!(arquivo instanceof File)) {
            console.error("O objeto passado não é um arquivo válido.");
            return null;
        }

        const formData = new FormData();
        formData.append('file', arquivo); // A chave DEVE ser 'file'

        try {
            const response = await api.post("/plates", formData); 
            return response.data; 
        } catch (error) {
            console.error("Erro na chamada ao Gateway Spring:", error.response?.data || error.message);
            throw error;
        }
    }

    return { reconhecerPlaca }
}

export default ReconhecimentoPlaca;