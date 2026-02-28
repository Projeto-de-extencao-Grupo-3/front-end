import "./confirmacao.css";
import { useEffect } from "react";
import pagIcon from "../../../assets/icons/pag green icon.png";
// troque pelo caminho do seu ícone

function ModalConfirmacao({ aberto, aoConfirmar, aoCancelar }) {
    useEffect(() => {
        function fecharComEsc(e) {
            if (e.key === "Escape") {
                aoCancelar();
            }
        }

        if (aberto) {
            window.addEventListener("keydown", fecharComEsc);
        }

        return () => {
            window.removeEventListener("keydown", fecharComEsc);
        };
    }, [aberto, aoCancelar]);

    if (!aberto) return null;

    return (
        <div className="fundo-modal" onClick={aoCancelar}>
            <div
                className="caixa-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="cabecalho-modal">
                    <img src={pagIcon}  alt="Pagamento" />
                    <h2>Conclusão de Nota Fiscal</h2>
                </div>

                <p className="texto-modal">
                    Deseja realmente finalizar esta Nota Fiscal?
                </p>

                <div className="botoes-modal">
                    <button className="botao-confirmar" onClick={aoConfirmar}>
                        Confirmar
                    </button>

                    <button className="botao-cancelar" onClick={aoCancelar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;