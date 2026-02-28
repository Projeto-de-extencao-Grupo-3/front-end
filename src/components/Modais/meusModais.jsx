import { useState } from "react";
import ModalConfirmacao from "./Confirmacoes/confirmacaoPagamento.jsx";
import ModalNotaFiscal from "./Confirmacoes/confirmacaoNotaFiscal.jsx";
import VeiculoEEmpresa from "./Veiculo&Empresa/veiculo&empresa.jsx";

function meusModais() {
    const [modalAberto, setModalAberto] = useState(false);
    // const [modalAberto1, setModalAberto1] = useState(false);

    return (
        <div>
            <button onClick={() => setModalAberto(true)}>
                Abrir Modal
            </button>

            <VeiculoEEmpresa
                aberto={modalAberto}
                onConfirmar={() => {
                    setModalAberto(false);
                }}
                onCancelar={() => setModalAberto(false)}
            />

            {/* <button onClick={() => setModalAberto1(true)}>
                Abrir Modal Nota Fiscal
            </button>

            <ModalNotaFiscal
                aberto={modalAberto1}
                onConfirmar={() => {
                    console.log("Nota Fiscal finalizada!");
                    setModalAberto1(false);
                }}
                onCancelar={() => setModalAberto1(false)}
            /> */}

        </div>
    );
}

export default meusModais;