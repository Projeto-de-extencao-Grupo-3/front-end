import { useState } from "react";
import api from "./api"; 

function useEndereco() {
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

    return { buscarEnderecoViaCEP, loading };
}

export default useEndereco;