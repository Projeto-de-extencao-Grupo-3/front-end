import "./servicos.css";
import ModalConfirmacao from "../../Modais/Confirmacoes/confirmacoes.jsx";
import iconBook from "../../../assets/icons/bookService icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";
import deleteServicoIcon from "../../../assets/icons/deleteServico icon.png";
import { formatarTexto, formatarMoedaBR } from "../../../utils/formatarTexto.js";
import { useState } from "react";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";


function Servicos({ dados, pagina, onVisualizar, carregarOrdem}) {
    const [modalExcluirServico, setModalExcluirServico] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const { excluirServico } = ServicosEItensLogic();

    const handleExcluir = async () => {
        try {
            await excluirServico(servicoSelecionado.id_registro_servico);
            setServicoSelecionado(false);
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
                        <tr key={servico.id_ordem_servico} className="config-dados">
                            <td className="dado">{formatarTexto(servico.tipo_servico)}</td>
                            <td className="dado">{formatarTexto(servico.parte_veiculo)}</td>
                            <td className="dado">{formatarTexto(servico.lado_veiculo)}</td>
                            <td className="dado">{formatarTexto(servico.tipo_pintura) || "-"}</td>
                            <td className="dado">{formatarTexto(servico.cor) || "-"}</td>
                            <td className="dado">{formatarMoedaBR(servico.preco_cobrado)}</td>

                            {/* aq chama no modo de visualizar */}
                            <td className="dado">
                                <div className="box-options">
                                    {pagina === "orcamento" ?
                                        <>
                                            <div className="icon" style={{ backgroundImage: `url(${iconEdit})` }}></div>

                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconLixo})` }}
                                                onClick={() => {
                                                    setServicoSelecionado(servico);
                                                    setModalExcluirServico(true);
                                                }}>
                                            </div>

                                            <div className="icon" style={{ backgroundImage: `url(${iconBook})` }} onClick={() => onVisualizar(servico)}></div>
                                        </>
                                        :
                                        <div className="icon" style={{ backgroundImage: `url(${iconBook})` }} onClick={() => onVisualizar(servico)}></div>
                                    }
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
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