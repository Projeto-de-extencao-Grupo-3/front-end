import "./Servicos&Itens.css";
import { useState, useEffect } from "react";
import { buscarServicos, buscarItens } from "../../service/api";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";

function ServicosEItens({ pagina }) {
    const paginaAtual = pagina || "analisar";
    const [abaAtiva, setAbaAtiva] = useState("servicos");

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
            {paginaAtual === "finalizado" || paginaAtual === "producao" ?
                <div>Teste</div>
                : null
            }


            {/* Parte superior do resumo */}
            <div className="bar-menu">
                <div className={`bar-options ${paginaAtual === "analise" ? "full" : ""}`}>
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

                {paginaAtual != "analise" ?
                    <div className="options-action">
                        {
                            paginaAtual === "orcamento" ?
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