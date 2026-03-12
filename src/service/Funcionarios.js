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

            setFuncionarios(prev => prev.filter(f => {
                const atualId = f.idFuncionario || f.id_funcionario || f.id;
                return Number(atualId) !== Number(id);
            }));

            console.log("Removido com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    };
    const atualizarFuncionario = async (id, dadosAtualizados) => {
        try {
            const payload = {
                nome: dadosAtualizados.nome,
                cargo: dadosAtualizados.cargo,
                especialidade: dadosAtualizados.especialidade,
                telefone: dadosAtualizados.telefone,
                email: dadosAtualizados.email,
                senha: dadosAtualizados.senha,
                fk_oficina: {
                    id_oficina: 1
                }
            };

            const response = await api.put(`/funcionarios/${id}`, payload);
            setFuncionarios(prev => prev.map(f =>
                (f.id_funcionario === id || f.idFuncionario === id) ? response.data : f
            ));
            return response.data
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            throw error
        }
    };

    useEffect(() => {
        listarFuncionarios();
    }, []);

    return { funcionarios, loading, adicionarFuncionario, excluirFuncionario, atualizarFuncionario };
}

export default Funcionarios