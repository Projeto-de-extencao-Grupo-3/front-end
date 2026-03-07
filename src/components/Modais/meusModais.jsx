import { useState } from "react";
import ModalConfirmacao from "../Modais/Confirmacoes/confirmacoes";
import iconConfirmPgmt from "../../assets/icons/confirmPgmt icon.png";
import iconConcluido from "../../assets/icons/concluido icon.png";
import iconPagGreen from "../../assets/icons/pag green icon.png";
import iconRevisar from "../../assets/icons/revisar icon.png";
import ConfirmacaoAutorizacao from "./Confirmacoes/ConfirmacaoAutorizacao";

function MeusModais() {
    const [modalPagamento, setModalPagamento] = useState(false);
    const [modalServico, setModalServico] = useState(false);
    const [modalNota, setModalNota] = useState(false);
    const [modalRevisar, setModalRevisar] = useState(false);

    return (
        <>
            {/* Modal: Confirmação de Pagamento */}
            {/* <ModalConfirmacao
                aberto={modalPagamento}
                aoConfirmar={() => setModalPagamento(false)}
                aoCancelar={() => setModalPagamento(false)}
                icone={iconConfirmPgmt}
                titulo="Confirmação de Pagamento"
                descricao="O pagamento deste serviço já foi concluído?"
                textoBotaoConfirmar="Sim, foi pago"
                textoBotaoCancelar="Não, ainda não"
            /> */}

            {/* Modal: Conclusão de Serviço */}
            {/* <ModalConfirmacao
                aberto={modalServico}
                aoConfirmar={() => setModalServico(false)}
                aoCancelar={() => setModalServico(false)}
                icone={iconConcluido}
                titulo="Conclusão de Serviço"
                descricao="Deseja realmente finalizar este serviço?"
            /> */}

            {/* Modal: Conclusão de Nota Fiscal */}
            <ModalConfirmacao
                aberto={modalNota}
                aoConfirmar={() => setModalNota(false)}
                aoCancelar={() => setModalNota(false)}
                icone={iconPagGreen}
                titulo="Conclusão de Nota Fiscal"
                descricao="Deseja realmente finalizar esta Nota Fiscal?"
            />

            {/* Modal: Revisar Orçamento */}
            {/* <ModalConfirmacao
                aberto={modalRevisar}
                aoConfirmar={() => setModalRevisar(false)}
                aoCancelar={() => setModalRevisar(false)}
                icone={iconRevisar}
                titulo="Revisar Orçamento?"
                descricao="Caso você volte, o orçamento terá que ser aprovado novamente pelo cliente."
            /> */}

        </>
    );
}

export default MeusModais;