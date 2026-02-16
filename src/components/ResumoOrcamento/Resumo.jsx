import "./Resumo.css";
import { useState, useEffect } from "react";
import { buscarServicos, buscarItens } from "../../service/api";
import Servicos from "./Servicos";
import Itens from "./Itens";

function Resumo() {
    const [abaAtiva, setAbaAtiva] = useState("servicos");
    const [dados, setDados] = useState([]);

    useEffect(() => {
    const carregarDados = async () => {
        try {
            if (abaAtiva === "servicos") {
                const res = await buscarServicos();

                const lista = Array.isArray(res.data)
                    ? res.data
                    : res.data.content ?? res.data.servicos ?? [];

                setDados(lista);

            } else {
                const res = await buscarItens();

                const lista = Array.isArray(res.data)
                    ? res.data
                    : res.data.content ?? res.data.itens ?? [];

                setDados(lista);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            setDados([]);
        }
    };

    carregarDados();
}, [abaAtiva]);
    return (
        <div className="resumo-container">
            {/* Parte superior do resumo */}
            <div className="bar-menu">
                <div className="bar-options">
                    <button
                        className={`buttons ${abaAtiva === "servicos" ? "selecionado" : ""}`}
                        onClick={() => setAbaAtiva("servicos")}
                    >
                        Serviços
                    </button>

                    <button
                        className={`buttons ${abaAtiva === "itens" ? "selecionado" : ""}`}
                        onClick={() => setAbaAtiva("itens")}
                    >
                        Itens
                    </button>
                </div>

                <div className="options-action">
                    <button className="add">
                        {abaAtiva === "servicos"
                            ? "Adicionar Serviço"
                            : "Adicionar Item"}
                    </button>
                </div>
            </div>

            {/* Parte dos tickets */}

            <div>
                {abaAtiva === "servicos" ? (
                <Servicos dados={dados} />
            ) : (
                <Itens dados={dados} />
            )}
            </div>
        </div>
    );
}

export default Resumo;