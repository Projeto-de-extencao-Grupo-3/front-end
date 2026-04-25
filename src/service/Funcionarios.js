import { useState } from "react";
import api from "./api";
import { exibirAlertaSucesso, exibirAlertaErro, exibirAlertaConfirmacao } from './alertas';


function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const listarFuncionariosPaginados = async (tamanhoPagina, pagina) => {
        try {
            const response = await api.get(`/funcionarios/funcionarios-paginados?size=${pagina}&page=${tamanhoPagina}`);
            console.log("Resposta da API Funcionários Paginados:", response.data);
            setFuncionarios(response.data);
        } catch (error) {
            exibirAlertaErro("Erro ao buscar funcionários.");
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
                fk_oficina: 1
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
                exibirAlertaSucesso("Funcionário excluído com sucesso!")
                return true
            } catch (error) {
                exibirAlertaErro("Erro ao excluir Funcionários.")
                throw error;
            }
        }
    };
    const atualizarFuncionario = async (id, dadosAtualizados) => {
        try {
            const payload = {
                id: id,
                nome: dadosAtualizados.nome,
                cargo: dadosAtualizados.cargo,
                especialidade: dadosAtualizados.especialidade,
                telefone: dadosAtualizados.telefone,
                email: dadosAtualizados.email,
                senha: dadosAtualizados.senha,
                fk_oficina: 1
            };

            const response = await api.put(`/funcionarios`, payload);
            exibirAlertaSucesso("Funcionário atualizado com sucesso!")
            return response.data
        } catch (error) {
            exibirAlertaErro("Erro ao atualizar Funcionários.")

            throw error
        }
    };

    const listarFuncionariosPorBuscaDeNome = async (nome) => {
        try {
            const response = await api.get(`/funcionarios/busca/nome?nome=${encodeURIComponent(nome)}`);
            console.log("Resposta da API Funcionários por Nome:", response.data);
            setFuncionarios(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar funcionários por nome:", error);
            throw error;
        }
    }

    return { funcionarios, loading,listarFuncionariosPaginados, listarFuncionariosPorBuscaDeNome, adicionarFuncionario, excluirFuncionario, atualizarFuncionario };
}

export default Funcionarios