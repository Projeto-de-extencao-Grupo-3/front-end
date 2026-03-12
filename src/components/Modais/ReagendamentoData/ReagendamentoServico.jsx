import { createPortal } from "react-dom";
import { useState } from "react";
import "./ReagendamentoServico.css";
import CalendarIcon from "../../../assets/icons/CalendarIcon.png";

function ReagendamentoServico({ aberto, aoConfirmar, aoCancelar }) {
    const [data, setData] = useState("");

    if (!aberto) return null;

    return createPortal(
        <div className="rs-fundo" onClick={aoCancelar}>
            <div className="rs-caixa" onClick={(e) => e.stopPropagation()}>

                <div className="rs-cabecalho">
                    <img className="rs-icone" src={CalendarIcon} alt="" />
                    <h2 className="rs-titulo">Reagendamento de Serviço</h2>
                </div>

                <div className="rs-campo">
                    <label className="rs-label">Nova data de Entrega*</label>
                    <div className="rs-input-wrapper">
                        <input
                            className="rs-input"
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            placeholder="Ex: 05/02/2026"
                        />
                        <img className="rs-input-icone" src={CalendarIcon} alt="" />
                    </div>
                </div>

                <div className="rs-botoes">
                    <button className="rs-btn rs-btn-confirmar" onClick={() => aoConfirmar(data)}>
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
