import { useEffect, useState } from "react";
import api from "./api";

function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarFuncionarios = async () => {
        try {
            const response = await api.get("/funcionarios");
            setFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar:", error);
        } finally {
            setLoading(false);
        }
    };

    const adicionarFuncionario = async (dadosDoFormulario) => {
        try {
            const payload = {
                nome: dadosDoFormulario.nome,
                cargo: dadosDoFormulario.cargo,
                especialidade: dadosDoFormulario.especialidade,
                telefone: dadosDoFormulario.telefone,
                email: dadosDoFormulario.email,
                senha: dadosDoFormulario.senha,
                fk_oficina: {
                    id_oficina: 1 
                }
            };

            const response = await api.post("/funcionarios", payload);
            setFuncionarios(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error("Erro na requisição POST:", error);
            throw error;
        }
    };

    const excluirFuncionario = async (id) => {
        try {
            await api.delete(`/funcionarios/${id}`);
            setFuncionarios(prev => prev.filter(c => c.idFuncionario !== id));
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    };
    const atualizarFuncionario = async (id, dadosAtualizados) => {
        const response = await api.put(`/funcionarios/${id}`, dadosAtualizados);
        setFuncionarios(funcionarios.map(c => c.id === id ? response.data : c));
    };

    useEffect(() => {
        listarFuncionarios();
    }, []);

    return { funcionarios, loading, adicionarFuncionario, excluirFuncionario, atualizarFuncionario };
}

export default Funcionarios