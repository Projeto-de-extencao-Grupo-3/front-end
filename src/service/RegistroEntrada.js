import { useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro } from './alertas';

function RegistroEntrada() {
    const [_registroEntrada, setRegistroEntrada] = useState([]);
    const [_loading, _setLoading] = useState(true);

    const adicionarRegistroEntrada = async (dadosDoFormulario) => {
        try {
            const response = await api.post("/entrada", dadosDoFormulario);
            setRegistroEntrada(prevClientes => [...prevClientes, response.data]);
            exibirAlertaSucesso("Produto adicionado com sucesso!");
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar produto.");
            throw error;
        }
    };

    return { adicionarRegistroEntrada }
}

export default RegistroEntrada