import { useState } from "react";
import api from "./api";
import { exibirAlertaErro, exibirAlertaSucesso } from './alertas';

function Jornada() {
    
    const [_jornada, setJornada] = useState([]);

    const adicionarVeiculoRegistroEntradaSemCadastro = async (dados) => {
        try {
            const response = await api.post("/jornada/entrada-efetiva-sem-cadastro", dados);
            setJornada(prevJornada => [...prevJornada, response.data]);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    }


    const adicionarRegistroEntrada = async (dados) => {
        try {
            const response = await api.post("/jornada/entrada-efetiva", dados);
            setJornada(prevJornada => [...prevJornada, response.data]);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    }

    return { adicionarRegistroEntrada, adicionarVeiculoRegistroEntradaSemCadastro }
}

export default Jornada;