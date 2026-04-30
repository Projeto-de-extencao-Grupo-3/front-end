import { createPortal } from "react-dom";
import { useState } from "react";
import "./ReagendamentoServico.css";
import CalendarIcon from "../../../assets/icons/CalendarIcon.png";
import { exibirAlertaErro } from "../../../service/alertas";

function ReagendamentoServico({ aberto, aoConfirmar, aoCancelar, mensagem }) {
    const [data, setData] = useState("");

    const hoje = new Date().toISOString().split("T")[0];

    if (!aberto) return null;

    const handleConfirmar = () => {
        if (!data) {
            // Se quiser que feche mesmo se não informar nada:
            aoCancelar(); 
            exibirAlertaErro("Por favor, selecione uma data de entrega.");
            return;
        }

        if (data < hoje) {
            // 1. Fecha o modal primeiro
            aoCancelar(); 
            // 2. Dispara o SweetAlert de erro
            exibirAlertaErro("A data de entrega não pode ser anterior ao dia de hoje.");
            return;
        }

        // Se passar nas validações, segue com a função original
        aoConfirmar(data);
    };

    return createPortal(
        <div className="rs-fundo" onClick={aoCancelar}>
            <div className="rs-caixa" onClick={(e) => e.stopPropagation()}>

                <div className="rs-cabecalho">
                    <img className="rs-icone" src={CalendarIcon} alt="" />
                    <h2 className="rs-titulo">{mensagem}</h2>
                </div>

                <div className="rs-campo">
                    <label className="rs-label">Data de Entrega*</label>
                    <div className="rs-input-wrapper">
                        <input
                            className="rs-input"
                            type="date"
                            value={data}
                            min={hoje} 
                            onChange={(e) => setData(e.target.value)}
                        />
                        <img className="rs-input-icone" src={CalendarIcon} alt="" />
                    </div>
                </div>

                <div className="rs-botoes">
                    <button className="rs-btn rs-btn-confirmar" onClick={handleConfirmar}>
                        Confirmar
                    </button>
                    <button className="rs-btn rs-btn-cancelar" onClick={aoCancelar}>
                        Cancelar
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
}

export default ReagendamentoServico;