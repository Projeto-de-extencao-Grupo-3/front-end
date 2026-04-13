import "./botoes.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTES
import ConfirmacaoAutorizacao from "../Modais/Confirmacoes/ConfirmacaoAutorizacao";
import VeiculoEEmpresa from "../Modais/Veiculo&Empresa/veiculo&empresa.jsx";
import ModalConfirmacao from "../Modais/Confirmacoes/confirmacoes.jsx";
import EntradaVeiculo from "../Modais/EntradaDeVeiculo/EntradaVeiculo.jsx";
import ReagendamentoServico from "../Modais/ReagendamentoData/ReagendamentoServico.jsx";
import BotoesLogic from "../../service/Botoes.js";

// ICONES
import iconCheck from "../../assets/icons/check icon.png";
import iconPag from "../../assets/icons/pag icon.png";
import iconSifrao from "../../assets/icons/sifrao icon.png";
import EditIcon from "../../assets/icons/EditIcon.png";
import checkIcon from "../../assets/icons/checkIcon.png";
import CalendarIcon from "../../assets/icons/CalendarIcon.png";
import PlayIcon from "../../assets/icons/PlayIcon.png";
import SaveIcon from "../../assets/icons/SaveIcon.png";
import iconConfirmPgmt from "../../assets/icons/confirmPgmt icon.png";
import iconConcluido from "../../assets/icons/concluido icon.png";
import iconPagGreen from "../../assets/icons/pag green icon.png";
import iconRevisar from "../../assets/icons/revisar icon.png";

function Botoes({ pagina, placa, ordemServicoDados, idOrdemServico }) {
    const navigate = useNavigate();
    const { atualizarStatus, definirDataPrevista } = BotoesLogic();

    const [modalAtivo, setModalAtivo] = useState(null);

    const fecharModal = () => setModalAtivo(null);

    const navegarPara = (rota) => {
        navigate(`${rota}/${idOrdemServico}`, {
            state: { veiculoDados: ordemServicoDados }
        });
    };

    // 🔥 FUNÇÃO SEGURA
    const atualizar = async (dados) => {
        try {
            await atualizarStatus(idOrdemServico, dados);
            return true;
        } catch (e) {
            console.error("Erro ao atualizar status:", e);
            return false;
        }
    };

    const definirData = async (data) => {
        try {
            await definirDataPrevista(idOrdemServico, data);
            return true;
        } catch (e) {
            console.error("Erro ao definir data:", e);
            return false;
        }
    };

    return (
        <div className="botoes">

            {pagina === "analisar1" && (
                <div className="button container1">
                    <div className="icon" style={{ backgroundImage: `url(${iconSifrao})` }} />
                    <button className="botao" onClick={() => setModalAtivo("pagamento")}>
                        Concluir pagamento
                    </button>
                </div>
            )}

            {pagina === "produzir" && (
                <div className="button container1">
                    <div className="icon" style={{ backgroundImage: `url(${checkIcon})` }} />
                    <button className="botao" onClick={() => setModalAtivo("servico")}>
                        Finalizar serviço
                    </button>
                </div>
            )}

            {pagina === "orcamento" && (
                <div className="button container3">
                    <div className="icon" style={{ backgroundImage: `url(${SaveIcon})` }}></div>
                    <button className="botao" onClick={() => setModalAtivo("finalizarOrcamento")}>
                        Finalizar orçamento
                    </button>
                </div>
            )}

            {pagina === "analisar2" && (
                <div className="button container1">
                    <div className="icon" style={{ backgroundImage: `url(${iconPag})` }} />
                    <button className="botao" onClick={() => setModalAtivo("nota")}>
                        Concluir nota fiscal
                    </button>
                </div>
            )}

            {(pagina === "analisar1" || pagina === "analisar2" || pagina === "analisar3") && (
                <>
                    <div className="button container2">
                        <div className="icon" style={{ backgroundImage: `url(${iconPag})` }} />
                        <button className="botao" onClick={() => setModalAtivo("veiculo")}>
                            Ver dados do veículo
                        </button>
                    </div>

                    <div className="button container3">
                        <div className="icon" style={{ backgroundImage: `url(${iconCheck})` }} />
                        <button className="botao" onClick={() => setModalAtivo("entrada")}>
                            Ver entrada do veículo
                        </button>
                    </div>
                </>
            )}

            {pagina === "aguardar" && (
                <div className="button container3">
                    <div className="icon" style={{ backgroundImage: `url(${PlayIcon})` }} />
                    <button className="botao" onClick={() => setModalAtivo("data")}>
                        Iniciar produção
                    </button>
                </div>
            )}

            {(pagina === "autorizar" || pagina === "aprovar") && (
                <div className="button container3">
                    <div className="icon" style={{ backgroundImage: `url(${SaveIcon})` }} />
                    <button className="botao" onClick={() => setModalAtivo("autorizar")}>
                        Autorizar orçamento
                    </button>
                </div>
            )}

            {(pagina === "aguardar" || pagina === "aprovar") && (
                <div className="button container4">
                    <div className="icon" style={{ backgroundImage: `url(${EditIcon})` }} />
                    <button className="botao" onClick={() => setModalAtivo("revisar")}>
                        Editar orçamento
                    </button>
                </div>
            )}

            {pagina === "produzir" && (
                <div className="button container4">
                    <div className="icon" style={{ backgroundImage: `url(${CalendarIcon})` }} />
                    <button className="botao" onClick={() => setModalAtivo("reagendar")}>
                        Alternar data de entrega
                    </button>
                </div>
            )}

            <div className="button container4">
                <button className="botao" onClick={() => navigate("/painelControle")}>
                    Voltar para o Painel
                </button>
            </div>

            {/* MODAIS */}
            {showModal && <ConfirmacaoAutorizacao onClose={() => setShowModal(false)} placa={placa} ordemServicoDados={ordemServicoDados} idOrdemServico={idOrdemServico}/>}

            <VeiculoEEmpresa 
             isOpen={modalVeiculo}
             onClose ={() => setModalVeiculo(false)}
             dadosRecebidos={ordemServicoDados}
             />

            <EntradaVeiculo aberto={modalEntrada} aoFechar={() => setModalEntrada(false)} />

            <ModalConfirmacao
                aberto={modalPagamento}
                aoConfirmar={() => { setModalPagamento(false); navegarPara("/painelControle/analisar2"); }}
                aoCancelar={() => setModalPagamento(false)}
                icone={iconConfirmPgmt}
                titulo="Confirmação de Pagamento"
                descricao="O pagamento deste serviço já foi concluído?"
                textoBotaoConfirmar="Sim, foi pago"
                textoBotaoCancelar="Não, ainda não"
            />

            <ReagendamentoServico
                aberto={modalReagendamento}
                aoConfirmar={(_novaData) => {
                    setModalReagendamento(false);
                }}
                aoCancelar={() => setModalReagendamento(false)}
            />

            <ModalConfirmacao
                aberto={modalServico}
                aoConfirmar={() => { setModalServico(false); navegarPara("/painelControle/finalizado"); }}
                aoCancelar={() => setModalServico(false)}
                icone={iconConcluido}
                titulo="Conclusão de Serviço"
                descricao="Deseja realmente finalizar este serviço?"
            />

                
            
            <ModalConfirmacao
                aberto={modalNota}
                aoConfirmar={() => { setModalNota(false); navegarPara("/painelControle/analisar3"); }}
                aoCancelar={() => setModalNota(false)}
                icone={iconPagGreen}
                titulo="Conclusão de Nota Fiscal"
                descricao="Deseja realmente finalizar esta Nota Fiscal?"
            />

            <ModalConfirmacao
                aberto={modalRevisar}
                aoConfirmar={() =>  { setModalServico(false); navegarPara("/painelControle/orcamento"); }}
                aoCancelar={() => setModalRevisar(false)}
                icone={iconRevisar}
                titulo="Revisar Orçamento?"
                descricao="Caso você volte, o orçamento terá que ser aprovado novamente pelo cliente."
            />
        </div>
    );
}

export default Botoes;