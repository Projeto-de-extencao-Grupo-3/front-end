import { useState } from "react";
import api from "./api";

function Enderecos() {
    const [loading, setLoading] = useState(false);

    const buscarEnderecoViaCEP = async (cep) => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) return null;

        setLoading(true);
        try {
            const response = await api.get(`/enderecos/viacep/${cepLimpo}`);

            console.log("Endereço encontrado:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao encontrar o endereço:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const atualizarEndereco = async (dadosEndereco) => {
        console.log(dadosEndereco)

        const payload = {
            "id_endereco": dadosEndereco.id_endereco,
            "cep": dadosEndereco.cep,
            "logradouro": dadosEndereco.logradouro,
            "complemento": dadosEndereco.complemento,
            "numero": dadosEndereco.numero,
            "bairro": dadosEndereco.bairro,
            "cidade": dadosEndereco.cidade,
            "estado": dadosEndereco.estado,
            "correspondencia": dadosEndereco.correspondencia
        }

        const response = api.put("/enderecos", payload)
    }

    const cadastrarEnderecoVazio = async () => {
        try {
            const response = await api.post(`/enderecos/registrar-vazio`);
            return response.data;
        } catch (error) {
            console.error("Erro ao cadastrar endereço vazio:", error);
            return null;
        }
    }

    return { buscarEnderecoViaCEP, cadastrarEnderecoVazio, atualizarEndereco, loading };
}

export default Enderecos;