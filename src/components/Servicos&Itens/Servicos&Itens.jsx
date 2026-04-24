import "./Servicos&Itens.css";
import { useState } from "react";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";
import ModalAdicionarServico from "../ModalAdicionarServico/ModalAdicionarServico";
import { formatarDataBR } from "../../utils/formatarTexto.js";

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

    // Calcular progresso do serviço
    const calcularProgresso = () => {
        if (!ticket.data_entrada_efetiva || !ticket.data_saida_prevista) {
            return { percentual: 0, diasDecorridos: 0, diasRestantes: 0, diasTotais: 0, status: "neutro" };
        }

        const dataEntrada = new Date(ticket.data_entrada_efetiva);
        const dataSaidaPrevista = new Date(ticket.data_saida_prevista);
        const dataHoje = new Date();
        const dataSaidaEfetiva = ticket.data_saida_efetiva ? new Date(ticket.data_saida_efetiva) : null;

        // Zerar hora para comparação de datas
        dataEntrada.setHours(0, 0, 0, 0);
        dataSaidaPrevista.setHours(0, 0, 0, 0);
        dataHoje.setHours(0, 0, 0, 0);
        if (dataSaidaEfetiva) {
            dataSaidaEfetiva.setHours(0, 0, 0, 0);
        }

        const diasTotais = Math.floor((dataSaidaPrevista - dataEntrada) / (1000 * 60 * 60 * 24));

        // Se tem data_saida_efetiva, usar ela como referência; senão usar hoje
        const dataReferencia = dataSaidaEfetiva || dataHoje;
        const diasDecorridos = Math.floor((dataReferencia - dataEntrada) / (1000 * 60 * 60 * 24));
        const diasRestantes = dataSaidaEfetiva ? 0 : Math.max(0, Math.floor((dataSaidaPrevista - dataHoje) / (1000 * 60 * 60 * 24)));

        let percentual;
        // Se diasTotais é 0 ou negativo (entrada e saída no mesmo dia), preencher toda a barra
        if (diasTotais <= 0) {
            percentual = 100;
        } else {
            percentual = (diasDecorridos / diasTotais) * 100;
            percentual = Math.min(100, Math.max(0, percentual));
        }

        let status = "no_prazo";

        // Se tem data de saída efetiva, serviço foi finalizado
        if (dataSaidaEfetiva) {
            // Se saiu depois do previsto = atrasado
            if (dataSaidaEfetiva > dataSaidaPrevista) {
                status = "atrasado";
            } else {
                status = "finalizado";
            }
        } else {
            // Serviço em produção
            if (dataHoje > dataSaidaPrevista) {
                status = "atrasado";
            }
        }

        return {
            percentual: Math.min(100, Math.max(0, percentual)),
            diasDecorridos: diasDecorridos + 1, // Contar o dia de entrada como 1
            diasRestantes,
            diasTotais: Math.max(1, diasTotais) + 1, // Contar o dia de entrada como 1
            status
        };
    };

    const progresso = calcularProgresso();

    if (!ticket) {
        return <div className="resumo-container">Carregando...</div>;
    }

    return (
        <div className="resumo-container">
            {pagina === "finalizar" || pagina === "produzir" ?
                <div className="progresso-servico">
                    <div className="progresso-titulo">
                        Progresso do Serviço
                    </div>

                    <div className="progresso-info-texto">
                        <span>{progresso.diasDecorridos} de {progresso.diasTotais} dias decorridos</span>
                        {progresso.status === "atrasado" && (
                            <span className="status-atrasado">⚠ ATRASADO</span>
                        )}
                        {progresso.status === "finalizado" && (
                            <span className="status-finalizado">✓ Concluído no prazo</span>
                        )}
                    </div>

                    <div className="progresso-barra">
                        <div
                            className={`progresso-preenchimento progresso-${progresso.status}`}
                            style={{ width: `${progresso.percentual}%` }}
                        />
                    </div>

                    <div className="progresso-rodape">
                        <span className="progresso-entrada">Entrada: <b>{formatarDataBR(ticket.data_entrada_efetiva)}</b></span>
                        <div style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}>
                            <span className="progresso-saida-prevista">Saída Prevista: <b>{formatarDataBR(ticket.data_saida_prevista)}</b></span>
                            {ticket.data_saida_efetiva && (
                                <span className="progresso-saida">Saída Efetiva: <b>{formatarDataBR(ticket.data_saida_efetiva)}</b></span>
                            )}
                        </div>

                    </div>
                </div>
                : null
            }

            <div className="bar-menu">
                <div className={`bar-options ${pagina == "analisar2" || pagina == "analisar1" || pagina == "analisar3" ? "full" : ""}`}>
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

                {pagina != "analisar2" && pagina != "analisar1" && pagina != "analisar3" ? (
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
                        placa={ticket.veiculo}
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
                        placa={ticket.veiculo}
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
                    await adicionarServico(ticket.id_ordem_servico, dados);
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
                    await adicionarProduto(ticket.id_ordem_servico, dados);
                    await atualizarLista();
                }}
                salvarNaOrdem={ticket.id_ordem_servico}
            />
        </div>
    );
}

export default ServicosEItens;