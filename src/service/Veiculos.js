import { useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';

function Veiculos(){
    const [veiculos, setVeiculos] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarVeiculos = async () => {
        try {
            const response = await api.get("/veiculos");
            setVeiculos(response.data);
        } catch (error) {
            exibirAlertaErro("Erro ao buscar produtos.");
            throw error
        } finally {
            setLoading(false);
        }
    };

    return { listarVeiculos }
}

export default Veiculos