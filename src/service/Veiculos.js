import { useState } from "react";
import api from "./api";
import { exibirAlertaErro, exibirAlertaSucesso } from './alertas';

function Veiculos() {
    const [_veiculos, setVeiculos] = useState([]);
    const [_loading, setLoading] = useState(true);

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

    const cadastrarVeiculos = async () => {
        try {
            const response = await api.post("/veiculos", dadosDoFormulario);
            setVeiculos(prevVeiculos => [...prevVeiculos, response.data]);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    }

    return { listarVeiculos, cadastrarVeiculos }
}

export default Veiculos