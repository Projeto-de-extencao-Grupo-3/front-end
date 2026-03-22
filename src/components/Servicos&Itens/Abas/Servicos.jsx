import "./servicos.css";
import ModalConfirmacao from "../../Modais/Confirmacoes/confirmacoes.jsx";
import iconBook from "../../../assets/icons/bookService icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";
import deleteServicoIcon from "../../../assets/icons/deleteServico icon.png";
import { formatarTexto, formatarMoedaBR } from "../../../utils/formatarTexto.js";
import { useState } from "react";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";
import ModalEditarServico from "../../ModalAdicionarServico/ModalEditarServico.jsx";
import ModalAdicionarServico from "../../ModalAdicionarServico/ModalAdicionarServico.jsx";


function Servicos({ dados, pagina, onVisualizar, carregarOrdem, placa }) {
    const [modalVisualizarServico, setModalVisualizarServico] = useState(false);
    const [modalEditarServico, setModalEditarServico] = useState(false);
    const [modalExcluirServico, setModalExcluirServico] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [servicoVisualizar, setServicoVisualizar] = useState(null);
    const [modoModal, setModoModal] = useState("editar");

    const { excluirServico, editarServico, adicionarServico } = ServicosEItensLogic();

    const handleAtualizar = async (dadosEditados) => {
        try {
            await editarServico(dadosEditados.id_registro_servico, dadosEditados);

            setModalEditarServico(false); // Fecha o modal
            setServicoSelecionado(null); // Limpa seleção
            await carregarOrdem(); // Atualiza a lista na tela
        } catch (error) {
            console.error("Erro ao processar atualização no componente:", error);
        }
    };

    const handleExcluir = async () => {
        try {
            await excluirServico(servicoSelecionado.id_registro_servico);
            setServicoSelecionado(null);
            await carregarOrdem();
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
        }
    };

    return (
        <>
            <table className="tabela">
                <thead className="titles">
                    <tr className="config-titles">
                        <th className="title">Tipo Serviço</th>
                        <th className="title">Parte</th>
                        <th className="title">Lado</th>
                        <th className="title">Tipo de Pintura:</th>
                        <th className="title">Cor</th>
                        <th className="title">Preço</th>
                        <th className="title">Opções</th>
                    </tr>
                </thead>
                <tbody className="dados">
                    {dados.map((servico) => (
                        <tr key={servico.id_registro_servico} className="config-dados">
                            <td className="dado">{formatarTexto(servico.tipo_servico)}</td>
                            <td className="dado">{formatarTexto(servico.parte_veiculo)}</td>
                            <td className="dado">{formatarTexto(servico.lado_veiculo)}</td>
                            <td className="dado">{formatarTexto(servico.tipo_pintura) || "-"}</td>
                            <td className="dado">{formatarTexto(servico.cor) || "-"}</td>
                            <td className="dado">{formatarMoedaBR(servico.preco_cobrado)}</td>

                            <td className="dado">
                                <div className="box-options">
                                    {pagina === "orcamento" ? (
                                        <>
                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconEdit})` }}
                                                onClick={() => {
                                                    setServicoSelecionado(servico);
                                                    setModoModal("editar");
                                                    setModalEditarServico(true);
                                                }}
                                            ></div>

                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconLixo})` }}
                                                onClick={() => {
                                                    setServicoSelecionado(servico);
                                                    setModalExcluirServico(true);
                                                }}
                                            ></div>
                                        </>
                                    ) : null}

                                    <div
                                        className="icon"
                                        style={{ backgroundImage: `url(${iconBook})` }}
                                        onClick={() => {
                                            setServicoVisualizar(servico);
                                            setModoModal("visualizar");
                                            setModalVisualizarServico(true);
                                        }}
                                    ></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ModalAdicionarServico
                isOpen={modalVisualizarServico}
                onClose={() => {
                    setModalVisualizarServico(false);
                    setServicoVisualizar(null);
                }}
                placa={placa}
                modo="visualizar" // Forçamos o modo visualizar
                servico={servicoVisualizar}
                salvarNaOrdem={placa} // Passe o ID da ordem aqui se necessário
            />
            <ModalEditarServico
                isOpen={modalEditarServico}
                onClose={() => {
                    setModalEditarServico(false);
                    setServicoSelecionado(null);
                }}
                placa={placa}
                servico={servicoSelecionado}
                onUpdate={handleAtualizar}
            />

            <ModalConfirmacao
                aberto={modalExcluirServico}
                aoConfirmar={() => {
                    handleExcluir();
                    setModalExcluirServico(false);
                }}
                aoCancelar={() => setModalExcluirServico(false)}
                icone={deleteServicoIcon}
                titulo="Excluir serviço"
                descricao="Deseja realmente excluir este serviço?"
            />
        </>
    );
}

export default Servicos;