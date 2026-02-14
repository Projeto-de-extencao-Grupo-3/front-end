import api from "./api";

function buscarOrdensPorStatus() {
    api.get("/ordens")
        .then((response) => {
            setServicos(response.data);
        })
        .catch((error) => {
            console.error("Erro ao buscar serviços:", error);
        })
} 

export default buscarOrdensPorStatus;