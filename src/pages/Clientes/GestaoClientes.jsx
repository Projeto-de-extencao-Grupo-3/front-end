import { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import Tabela from "../../components/Layout/Tabela.jsx";
import ModalAdicionar from "../../components/ModalClientesFuncionarios/ModalAdicionar.jsx";
import Clientes from "../../service/Clientes.js";
import "./GestaoClientes.css";
import api from "../../service/api.js";
import ModalAdicionarEndereco from "../../components/ModalEnderecos/ModalAdicionarEndereco.jsx";

function GestaoClientes() {
    const { clientes, _loading, excluirCliente, adicionarCliente } = Clientes();

    const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
    const [mostrarModalEndereco, setMostrarModalEndereco] = useState(false);
    const [dadosClienteTemp, setDadosClienteTemp] = useState(null);

    const handleAvancarParaEndereco = (dadosCliente) => {
        setDadosClienteTemp(dadosCliente);
        setMostrarModalAdicionar(false);
        setMostrarModalEndereco(true);
    };

    const handleFinalizarCadastroTotal = async (dadosEndereco) => {
        try {
            const responseEndereco = await api.post('/enderecos', dadosEndereco);

            const idCapturado = responseEndereco.data.idEndereco || responseEndereco.data.id_endereco;

            console.log("ID gerado pelo banco para o endereço:", idCapturado);

            const enderecoComId = { id_endereco: idCapturado };

            await adicionarCliente(dadosClienteTemp, enderecoComId);

            setMostrarModalEndereco(false);
        } catch (error) {
            console.error("Erro no processo:", error);
        }
    };

    return (
        <Layout ativo={"clientes"}>
            <div className="header-clientes">
                <div>
                    <h1>Gestão de Clientes</h1>
                    <p>Visão geral dos Clientes</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Filtrar itens por nome"
                    />
                    <button className="add_client btn btn-dark d-flex align-items-center" onClick={() => setMostrarModalAdicionar(true)}>
                        Adicionar novo Cliente +
                    </button>

                    {/* Modal 1: Informações Básicas */}
                    <ModalAdicionar
                        isOpen={mostrarModalAdicionar}
                        onClose={() => setMostrarModalAdicionar(false)}
                        onSave={handleAvancarParaEndereco}
                    />

                    {/* Modal 2: Endereço */}
                    <ModalAdicionarEndereco
                        isOpen={mostrarModalEndereco}
                        onClose={() => setMostrarModalEndereco(false)}
                        onSaveEndereco={handleFinalizarCadastroTotal}
                    />
                </div>
            </div>
            <Tabela clientes={clientes} excluirCliente={excluirCliente}></Tabela>
        </Layout>
    );
}

export default GestaoClientes;