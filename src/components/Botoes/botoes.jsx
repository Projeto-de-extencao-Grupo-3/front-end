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
import { useNavigate } from "react-router-dom";


function botoes({ pagina }) {
    console.log("Página atual nos botões:", pagina);
    const navigate = useNavigate()

    return (
        <div className="botoes">

            {pagina === "analisar1" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconSifrao})` }}
                    ></div>
                    <button className="botao">Concluir pagamamento</button>
                </div>
                : null}

            {pagina === "produzir" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${checkIcon})` }}
                    ></div>
                    <button className="botao" onClick={() => navigate("/painelControle/finalizado")}>Finalizar serviço</button>
                </div>
                : null}

            {pagina === "analisar2" ?
                <div className="button container1">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao">Concluir nota fiscal</button>
                </div>
                : null}

            {pagina === "analisar1" || pagina === "analisar2" || pagina === "analisar3" ?
                <div className="button container2">
                    <div
                        className="icon"
                        style={{ backgroundImage: `url(${iconPag})` }}
                    ></div>
                    <button className="botao">Ver dados do veículo</button>
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
                    <button className="botao" onClick={() => navigate("/painelControle/aguardandoVaga")}>Autorizar orçamento</button>
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
                    <button className="botao">Finalizar orçamento</button>
                </div>
                : null}

            <div className="button container4">
                <button className="botao" onClick={() => navigate("/painelControle")}>Voltar para o Painel</button>
            </div>

        </div>
    );
}

export default botoes;
