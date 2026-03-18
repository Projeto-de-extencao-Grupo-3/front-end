import "./Servicos&Itens.css";
import { useState, useEffect } from "react";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";
import ModalAdicionarServico from "../ModalAdicionarServico/ModalAdicionarServico";
import ModalAdicionarItem from "../ModalAdicionarItem/ModalAdicionarItem";
import ServicosEItensLogic from "../../service/ServicosEItens.js";

function ServicosEItens({ pagina }) {
    const { adicionarServico, adicionarProduto, buscarOrdem } = ServicosEItensLogic();
    const [_dados, _setDados] = useState([]);
    const [abaAtiva, setAbaAtiva] = useState("servicos");

    const [mostrarModalServico, setMostrarModalServico] = useState(false);
    const [modoServico, setModoServico] = useState("adicionar");
    const [servicoVisualizar, setServicoVisualizar] = useState(null);

    const [mostrarModalItem, setMostrarModalItem] = useState(false);
    const [modoItem, setModoItem] = useState("adicionar");
    const [itemVisualizar, setItemVisualizar] = useState(null);

    const [ticket, setTicket] = useState(null);

    const idOrdem = 1;

    useEffect(() => {
        const carregarOrdem = async () => {
            try {
                const dados = await buscarOrdem(idOrdem);
                const ticketNormalizado = {
                    ...dados,
                    servicos: dados.servicos || [],
                    itens: dados.itens || []
                };
                setTicket(ticketNormalizado);
                console.log("Dados carregados:", ticketNormalizado);
            } catch (error) {
                console.error("Erro ao carregar ordem:", error);
            }
        };
        carregarOrdem();
    }, []);

    if (!ticket) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="resumo-container">
            {pagina === "finalizar" ?
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
                        <span>01/03/2026</span>
                        <span>10/03/2026</span>
                    </div>
                </div>
                : null
            }

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

                {pagina != "analisar" ? (
                    <div className="options-action">
                        {pagina === "orcamento" ? (
                            abaAtiva === "servicos" ? (
                                <button className="add" onClick={() => {
                                    setModoServico("adicionar");
                                    setServicoVisualizar(null);
                                    setMostrarModalServico(true);
                                }}>
                                    Adicionar Serviço
                                </button>
                            ) : (
                                <button className="add" onClick={() => {
                                    setModoItem("adicionar");
                                    setItemVisualizar(null);
                                    setMostrarModalItem(true);
                                }}>
                                    Adicionar Item
                                </button>
                            )
                        ) : (
                            <button className="imprimir">
                                Imprimir
                            </button>
                        )}
                    </div>
                ) : null}
            </div>

            <div className="conteudo">
                {abaAtiva === "servicos" ? (
                    <Servicos
                        dados={ticket.servicos}
                        pagina={pagina}
                        onVisualizar={(dados) => {
                            setServicoVisualizar(dados);
                            setMostrarModalServico(true);
                        }}
                    />
                ) : (
                    <Itens
                        dados={ticket.produtos}
                        pagina={pagina}
                        onVisualizar={(dados) => {
                            setItemVisualizar(dados);
                            setMostrarModalItem(true);
                        }}
                    />
                )}
            </div>

            <ModalAdicionarServico
                isOpen={mostrarModalServico}
                onClose={() => setMostrarModalServico(false)}
                placa={ticket.placa}
                modo={modoServico}
                servico={servicoVisualizar}
                onSave={adicionarServico}
                salvarNaOrdem={idOrdem}
            />

            <ModalAdicionarItem
                isOpen={mostrarModalItem}
                onClose={() => setMostrarModalItem(false)}
                placa={ticket.placa}
                modo={modoItem}
                item={itemVisualizar}
                onSave={adicionarProduto}
                salvarNaOrdem={idOrdem}
                />
        </div>
    );
}

export default ServicosEItens;