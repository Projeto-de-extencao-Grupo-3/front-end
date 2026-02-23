import "./botoes.css";
import { useState } from "react";
import iconCheck from "../../assets/icons/check icon.png"
import iconPag from "../../assets/icons/pag icon.png"
import iconSifrao from "../../assets/icons/sifrao icon.png"
import EditIcon from "../../assets/icons/EditIcon.png"
import checkIcon from "../../assets/icons/checkIcon.png"
import CalendarIcon from "../../assets/icons/CalendarIcon.png"
import PlayIcon from "../../assets/icons/PlayIcon.png"
import SaveIcon from "../../assets/icons/SaveIcon.png"


function botoes() {
    const [paginaAtual, setPaginaAtual] = useState("finalizar");

    return (
        <div className="botoes">

            {paginaAtual === "analisar1" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconSifrao})` }}
                    ></div>
                    <button className="botao">Concluir pagamamento</button>
                </div>
                : null}

            {paginaAtual === "produzir" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${checkIcon})` }}
                    ></div>
                    <button className="botao">Finalizar serviço</button>
                </div>
                : null}

            {paginaAtual === "analisar2" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao">Concluir nota fiscal</button>
                </div>
                : null}

            {paginaAtual === "analisar1" || paginaAtual === "analisar2" || paginaAtual === "analisar3" ?
                <div className="button container2">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao">Ver dados do veículo</button>
                </div>
                : null}

            {paginaAtual === "analisar1" || paginaAtual === "analisar2" || paginaAtual === "analisar3" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconCheck})` }}
                    ></div>
                    <button className="botao">Ver entrada do veículo</button>
                </div>
                : null}

            {paginaAtual === "aguardar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${PlayIcon})` }}
                    ></div>
                    <button className="botao">Iniciar serviço</button>
                </div>
                : null}

            {paginaAtual === "autorizar" || paginaAtual === "aprovar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${SaveIcon})` }}
                    ></div>
                    <button className="botao">Autorizar orçamento</button>
                </div>
                : null}

            {paginaAtual === "aguardar" || paginaAtual === "produzir" || paginaAtual === "aprovar" ?
                <div className="button container4">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${EditIcon})` }}
                    ></div>
                    <button className="botao">Editar orçamento</button>
                </div>
                : null}

            {paginaAtual === "produzir" ?
                <div className="button container4">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${CalendarIcon})` }}
                    ></div>
                    <button className="botao">Alternar data de entrega</button>
                </div>
                : null}

            {paginaAtual === "orcar" ?
                <div className="button container3">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${SaveIcon})` }}
                    ></div>
                    <button className="botao">Finalizar orçamento</button>
                </div>
                : null}

            <div className="button container4">
                <button className="botao">Voltar para o Painel</button>
            </div>

        </div>
    );
}

export default botoes;
