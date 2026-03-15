import { useState } from "react";
import api from "./api";


function OrdemServico() {
    const [ordens, setOrdens] = useState([]);
    const [_loading, setLoading] = useState(true);

    const listarOrdemServicos = async () => {
        try {
            const response = await api.get("/ordens/listar");
            setOrdens(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        } finally {
            setLoading(false);
        }
    };

    return { ordens, listarOrdemServicos }
}