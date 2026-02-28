import "./Servicos&Itens.css";
import { useState, useEffect } from "react";
import { buscarServicos, buscarItens } from "../../service/api";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";

function ServicosEItens({ pagina }) {
    console.log("Página atual no ServicosEItens:", pagina);
    const [abaAtiva, setAbaAtiva] = useState("servicos");

    console.log("Página atual:", pagina);

    const ticket = {
        id: 1,
        cliente: "João",
        servicos: [
            {
                id: 1,
                tipo: "Pintura",
                parte: "Para-Choque",
                lado: "Dianteiro",
                preco: 400.00
            },
            {
                id: 2,
                tipo: "Funilaria",
                parte: "Para-Choque",
                lado: "Dianteiro",
                preco: 200.00
            }
        ],
        itens: [
            {
                id: 1,
                codigo: "00024",
                item: "Tinta Azul-Fiap",
                visibilidade: "Privado",
                quantidade: 8,
                preco: 30.00,
                status: "Concluido"
            },
            {
                id: 2,
                codigo: "00025",
                item: "Primer",
                visibilidade: "Privado",
                quantidade: 10,
                preco: 30.00,
                status: "Pendente"
            }
        ]
    };

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
            {/* Progesso */}
            {pagina === "finalizar" || pagina === "produzir" ?
                <div className="progresso-servico">
                    <div className="progresso-titulo">
                        <strong>Progresso do Serviço:</strong> Concluído!
                    </div>

                    <div className="linha-container">
                        <div className="bolinha esquerda" />
                        <div className="linha" />
                        <div className="bolinha direita" />
                    </div>

                    <div className="datas">
                        <span>18/01/2000</span>
                        <span>31/02/2012</span>
                        {/* <span>{dataInicio}</span>
                        <span>{dataFim}</span> */}
                    </div>
                </div>
                : null
            }


            {/* Parte superior do resumo */}
            <div className="bar-menu">
                <div className={`bar-options ${pagina === "analisar" ? "full" : ""}`}>
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

                {pagina != "analisar" ?
                    <div className="options-action">
                        {
                            pagina === "orcamento" ?
                                <button className="add">
                                    {abaAtiva === "servicos"
                                        ? "Adicionar Serviço"
                                        : "Adicionar Item"}
                                </button>
                                :
                                <button className="imprimir">
                                    Imprimir
                                </button>
                        }
                    </div>
                    : null
                    // Aqui em cima
                }
            </div>

            {/* Parte dos tickets */}

            <div className="conteudo">
                {abaAtiva === "servicos" ? (
                    <Servicos dados={ticket.servicos} />
                ) : (
                    <Itens dados={ticket.itens} />
                )}
            </div>
        </div>
    );
}

export default ServicosEItens;