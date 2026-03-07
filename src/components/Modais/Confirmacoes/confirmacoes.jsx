import { createPortal } from "react-dom";
import "./confirmacoes.css";

function ModalConfirmacao({
    aberto,
    aoConfirmar,
    aoCancelar,
    icone,
    titulo,
    descricao,
    textoBotaoConfirmar = "Confirmar",
    textoBotaoCancelar = "Cancelar",
    tipoBotaoConfirmar = "primario", // "primario" | "perigo"
}) {
    if (!aberto) return null;

    return createPortal(
        <div className="mc-fundo" onClick={aoCancelar}>
            <div className="mc-caixa" onClick={(e) => e.stopPropagation()}>
                <div className="mc-cabecalho">
                    {icone && (
                        <img className="mc-icone" src={icone} alt="" />
                    )}
                    <h2 className="mc-titulo">{titulo}</h2>
                </div>
                <p className="mc-descricao">{descricao}</p>
                <div className="mc-botoes">
                    <button
                        className="mc-btn mc-btn-confirmar"
                        onClick={aoConfirmar}
                    >
                        {textoBotaoConfirmar}
                    </button>
                    <button className="mc-btn mc-btn-cancelar" onClick={aoCancelar}>
                        {textoBotaoCancelar}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ModalConfirmacao;