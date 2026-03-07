import "./botoes.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// COMPONENTES USADOS
import ConfirmacaoAutorizacao from "../Modais/Confirmacoes/ConfirmacaoAutorizacao";
import VeiculoEEmpresa from "../Modais/Veiculo&Empresa/veiculo&empresa.jsx";
import ModalConfirmacao from "../Modais/Confirmacoes/confirmacoes.jsx";


// ICONES USADOS
import iconCheck from "../../assets/icons/check icon.png"
import iconPag from "../../assets/icons/pag icon.png"
import iconSifrao from "../../assets/icons/sifrao icon.png"
import EditIcon from "../../assets/icons/EditIcon.png"
import checkIcon from "../../assets/icons/checkIcon.png"
import CalendarIcon from "../../assets/icons/CalendarIcon.png"
import PlayIcon from "../../assets/icons/PlayIcon.png"
import SaveIcon from "../../assets/icons/SaveIcon.png"
import iconConfirmPgmt from "../../assets/icons/confirmPgmt icon.png";
import iconConcluido from "../../assets/icons/concluido icon.png";
import iconPagGreen from "../../assets/icons/pag green icon.png";
import iconRevisar from "../../assets/icons/revisar icon.png";

function Botoes({ pagina }) {
    console.log("Página atual nos botões:", pagina);
    const navigate = useNavigate();
    pagina = "analisar2"

    // Estado para controlar abertura do modal
    const [showModal, setShowModal] = useState(false);
    const [modalVeiculo, setModalVeiculo] = useState(false);
    const [modalPagamento, setModalPagamento] = useState(false);
    const [modalServico, setModalServico] = useState(false);
    const [modalNota, setModalNota] = useState(false);
    const [modalRevisar, setModalRevisar] = useState(false);

    return (
        <div className="botoes">

            {pagina === "analisar1" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconSifrao})` }}
                    ></div>
                    <button className="botao" onClick={() => setModalPagamento(true)}>Concluir pagamento</button>
                </div>
                : null}

            {pagina === "produzir" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${checkIcon})` }}
                    ></div>
                    <button className="botao" onClick={() => setModalServico(true)}>Finalizar serviço</button>
                </div>
                : null}

            {pagina === "analisar2" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao" onClick={() => setModalNota(true)}>Concluir nota fiscal</button>
                </div>
                : null}

            {pagina === "analisar1" || pagina === "analisar2" || pagina === "analisar3" ?
                <div className="button container2">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao" onClick={() => setModalVeiculo(true)}>Ver dados do veículo</button>
                </div>
                : null}

            {pagina === "analisar1" || pagina === "analisar2" || pagina === "analisar3" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconCheck})` }}
                    ></div>
                    <button className="botao">Ver entrada do veículo</button>
                </div>
                : null}

            {pagina === "aguardar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${PlayIcon})` }}
                    ></div>
                    <button className="botao" onClick={() => navigate("/painelControle/producao")}>Iniciar serviço</button>
                </div>
                : null}

            {pagina === "autorizar" || pagina === "aprovar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${SaveIcon})` }}
                    ></div>
                    <button className="botao" onClick={() => setShowModal(true)}>Autorizar orçamento</button>
                </div>
                : null}

            {pagina === "aguardar" || pagina === "produzir" || pagina === "aprovar" ?
                <div className="button container4">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${EditIcon})` }}
                    ></div>
                    <button className="botao">Editar orçamento</button>
                </div>
                : null}

            {pagina === "produzir" ?
                <div className="button container4">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${CalendarIcon})` }}
                    ></div>
                    <button className="botao">Alternar data de entrega</button>
                </div>
                : null}

            {pagina === "orcar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${SaveIcon})` }}
                    ></div>
                    <button className="botao" onClick={() => navigate("/painelControle/autorizacao")}>Finalizar orçamento</button>
                </div>
                : null}

            <div className="button container4">
                <button className="botao" onClick={() => navigate("/painelControle")}>Voltar para o Painel</button>
            </div>

            {showModal && (
                <ConfirmacaoAutorizacao onClose={() => setShowModal(false)} />
            )}

            <VeiculoEEmpresa
                aberto={modalVeiculo}
                aoFechar={() => setModalVeiculo(false)}
            />

            <ModalConfirmacao
                aberto={modalPagamento}
                aoConfirmar={() => setModalPagamento(false)}
                aoCancelar={() => setModalPagamento(false)}
                icone={iconConfirmPgmt}
                titulo="Confirmação de Pagamento"
                descricao="O pagamento deste serviço já foi concluído?"
                textoBotaoConfirmar="Sim, foi pago"
                textoBotaoCancelar="Não, ainda não"
            />

            <ModalConfirmacao
                aberto={modalServico}
                aoConfirmar={() => { setModalServico(false); navigate("/painelControle/finalizado"); }}
                aoCancelar={() => setModalServico(false)}
                icone={iconConcluido}
                titulo="Conclusão de Serviço"
                descricao="Deseja realmente finalizar este serviço?"
            />

            <ModalConfirmacao
                aberto={modalNota}
                aoConfirmar={() => setModalNota(false)}
                aoCancelar={() => setModalNota(false)}
                icone={iconPagGreen}
                titulo="Conclusão de Nota Fiscal"
                descricao="Deseja realmente finalizar esta Nota Fiscal?"
            />

            <ModalConfirmacao
                aberto={modalRevisar}
                aoConfirmar={() => setModalRevisar(false)}
                aoCancelar={() => setModalRevisar(false)}
                icone={iconRevisar}
                titulo="Revisar Orçamento?"
                descricao="Caso você volte, o orçamento terá que ser aprovado novamente pelo cliente."
                tipoBotaoConfirmar="perigo"
            />
        </div>
    );
}

export default Botoes;
