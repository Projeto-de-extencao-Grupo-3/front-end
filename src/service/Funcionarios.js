import { useEffect, useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';


function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarFuncionarios = async () => {
        try {
            const response = await api.get("/funcionarios");
            setFuncionarios(response.data);
        } catch (error) {
            exibirAlertaErro("Erro ao buscar Funcionários.")
            throw error
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
            exibirAlertaSucesso("Funcionário adicionado com sucesso!")
            return response.data;
        } catch (error) {
            exibirAlertaErro("Erro ao adicionar Funcionários.")
            throw error;
        }
    };

    const excluirFuncionario = async (id) => {
        const confirmacao = await exibirAlertaConfirmacao("Deseja realmente excluir este funcionário?");

        if (confirmacao.isConfirmed) {

            try {
                await api.delete(`/funcionarios/${id}`);

                setFuncionarios(prev => prev.filter(f => {
                    const atualId = f.idFuncionario || f.id_funcionario || f.id;
                    return Number(atualId) !== Number(id);
                }));

                exibirAlertaSucesso("Funcionário excluído com sucesso!")
            } catch (error) {
                exibirAlertaErro("Erro ao excluir Funcionários.")
                throw error;
            }
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
            exibirAlertaSucesso("Funcionário atualizado com sucesso!")
            return response.data
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar Funcionários.")

            throw error
        }
    };

    useEffect(() => {
        listarFuncionarios();
    }, []);

    return { funcionarios, loading, adicionarFuncionario, excluirFuncionario, atualizarFuncionario };
}

export default Funcionarios