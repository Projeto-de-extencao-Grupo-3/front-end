import "./Servicos&Itens.css";
import { useState } from "react";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";
import ModalAdicionarServico from "../ModalAdicionarServico/ModalAdicionarServico";
import ModalAdicionarItem from "../ModalAdicionarItem/ModalAdicionarItem";
import ServicosEItensLogic from "../../service/ServicosEItens.js";

function ServicosEItens({ pagina, ticket, atualizarLista }) {
    const { adicionarServico, adicionarProduto } = ServicosEItensLogic();
    const [abaAtiva, setAbaAtiva] = useState("servicos");

    const [mostrarModalServico, setMostrarModalServico] = useState(false);
    const [modoServico, setModoServico] = useState("adicionar");
    const [servicoVisualizar, setServicoVisualizar] = useState(null);

    const [mostrarModalItem, setMostrarModalItem] = useState(false);
    const [modoItem, setModoItem] = useState("adicionar");
    const [itemVisualizar, setItemVisualizar] = useState(null);
    

    if (!ticket) {
        return <div className="resumo-container">Carregando...</div>;
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
                        placa = {ticket.veiculo}
                        pagina={pagina}
                        onVisualizar={(dados) => {
                            setServicoVisualizar(dados);
                            setMostrarModalServico(true);
                        }}
                        carregarOrdem={atualizarLista}
                    />
                ) : (
                    <Itens
                        dados={ticket.produtos}
                        placa = {ticket.veiculo}
                        pagina={pagina}
                        onVisualizar={(dados) => {
                            setItemVisualizar(dados);
                            setMostrarModalItem(true);
                        }}
                        carregarOrdem={atualizarLista}
                    />
                )}
            </div>

            <ModalAdicionarServico
                isOpen={mostrarModalServico}
                onClose={() => setMostrarModalServico(false)}
                placa={ticket.veiculo}
                modo={modoServico}
                servico={servicoVisualizar}
                onSave={async (dados) => {
                    await adicionarServico(dados);
                    await atualizarLista();
                }}
                salvarNaOrdem={ticket.id_ordem_servico}
            />

            <ModalAdicionarItem
                isOpen={mostrarModalItem}
                onClose={() => setMostrarModalItem(false)}
                placa={ticket.veiculo}
                modo={modoItem}
                item={itemVisualizar}
                onSave={async (dados) => {
                    await adicionarProduto(dados);
                    await atualizarLista(); 
                }}
                salvarNaOrdem={ticket.id_ordem_servico}
            />
        </div>
    );
}

export default ServicosEItens;