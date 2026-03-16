import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import ModalAdicionarFuncionario from "../../components/ModalClientesFuncionarios/ModalAdicionarFuncionario.jsx";
import "./GestaoFuncionarios.css";
import ModalDesativar from "../../components/ModalClientesFuncionarios/ModalDesativar.jsx";
import TabelaFuncionarios from "../../components/Layout/TabelaFuncionarios.jsx";
import Funcionarios from "../../service/Funcionarios.js";

function GestaoFuncionarios() {
    const { funcionarios, excluirFuncionario, adicionarFuncionario, atualizarFuncionario } = Funcionarios();
    const [funcionarioParaEditar, setFuncionarioParaEditar] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [funcionarioParaDesativar, setFuncionarioParaDesativar] = useState(null);
    const [isModalDesativarOpen, setIsModalDesativarOpen] = useState(false);
    const lidarComEdicao = (funcionario) => {
        console.log("Abrindo modal para editar:", funcionario);
        setFuncionarioParaEditar(funcionario);
        setModalAberto(true);
    };

    const abrirModalNovo = () => {
        console.log("Abrindo modal para novo");
        setFuncionarioParaEditar(null);
        setModalAberto(true);
    };

    const salvar = async (dados, id) => {
        try {
            if (id) {
                await atualizarFuncionario(id, dados);
            } else {
                await adicionarFuncionario(dados);
            }
            setModalAberto(false);
            setFuncionarioParaEditar(null);
        } catch (error) {
            console.error("Falha ao salvar no banco:", error);
        }
    };

    const abrirModalDesativar = (funcionario) => {
        setFuncionarioParaDesativar(funcionario);
        setIsModalDesativarOpen(true);
    };

    const confirmarDesativacao = async () => {
        try {
            const id = funcionarioParaDesativar.idFuncionario || funcionarioParaDesativar.id_funcionario;

            await excluirFuncionario(id);

            setIsModalDesativarOpen(false);
            setFuncionarioParaDesativar(null);
        } catch (error) {
            console.error("Erro ao desativar funcionário:", error);
        }
    };

    return (
        <Layout ativo={"funcionarios"}>
            <div className="header-funcionarios">
                <div>
                    <h1>Gestão de Funcionários</h1>
                    <p>Visão geral dos Funcionários</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                    <input type="text" className="form-control" placeholder="Filtrar por nome" />

                    <button className="add_funcionario btn btn-dark" onClick={abrirModalNovo}>
                        Adicionar novo Funcionário +
                    </button>

                    <ModalDesativar
                        isOpen={isModalDesativarOpen}
                        onClose={() => setIsModalDesativarOpen(false)}
                        onConfirm={confirmarDesativacao}
                        titulo="Desativar Funcionário"
                        subtitulo="Dados do Colaborador"
                        textoBotao="Desativar"
                        corBotao="#dc3545"
                        iconClass="bx-briefcase" 
                        dados={funcionarioParaDesativar ? [
                            { label: "Nome Completo", value: funcionarioParaDesativar.nome, fullWidth: true },
                            { label: "Cargo", value: funcionarioParaDesativar.cargo },
                            { label: "Especialidade", value: funcionarioParaDesativar.especialidade },
                            { label: "Email Profissional", value: funcionarioParaDesativar.email, fullWidth: true },
                            { label: "Telefone", value: funcionarioParaDesativar.telefone, fullWidth: true }
                        ] : []}
                    />

                    <ModalAdicionarFuncionario
                        isOpen={modalAberto}
                        onClose={() => setModalAberto(false)}
                        funcionarioParaEditar={funcionarioParaEditar}
                        onSave={salvar}
                    />
                </div>
            </div>

            <TabelaFuncionarios
                funcionarios={funcionarios}
                excluirFuncionario={abrirModalDesativar}
                editarFuncionario={lidarComEdicao}
            />
        </Layout>
    );
}

export default GestaoFuncionarios;