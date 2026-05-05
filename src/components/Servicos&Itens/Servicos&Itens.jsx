import "./Servicos&Itens.css";
import { useState } from "react";
import Servicos from "./Abas/Servicos";
import Itens from "./Abas/Itens";
import ModalAdicionarServico from "../ModalAdicionarServico/ModalAdicionarServico";
import { formatarDataBR } from "../../utils/formatarTexto.js";

import ModalAdicionarItem from "../ModalAdicionarItem/ModalAdicionarItem";
import ServicosEItensLogic from "../../service/ServicosEItens.js";
import { data } from "react-router-dom";

function ServicosEItens({ pagina, ticket, atualizarLista }) {
    const { adicionarServico, adicionarProduto } = ServicosEItensLogic();
    const [abaAtiva, setAbaAtiva] = useState("servicos");

    const [mostrarModalServico, setMostrarModalServico] = useState(false);
    const [modoServico, setModoServico] = useState("adicionar");
    const [servicoVisualizar, setServicoVisualizar] = useState(null);

    const [mostrarModalItem, setMostrarModalItem] = useState(false);
    const [modoItem, setModoItem] = useState("adicionar");
    const [itemVisualizar, setItemVisualizar] = useState(null);

    // Calcular progresso do serviço (contagem inclusiva de dias, corrige off-by-one)
    const calcularProgresso = () => {
        if (!ticket.data_entrada_efetiva || !ticket.data_saida_prevista) {
            return { percentual: 0, diasDecorridos: 0, diasRestantes: 0, diasTotais: 0, status: "neutro" };
        }

        const msDia = 1000 * 60 * 60 * 24;

        // Parsear strings 'YYYY-MM-DD' como datas locais à meia-noite para evitar deslocamento UTC
        const parseDateOnlyAsLocal = (dateStr) => {
            if (!dateStr) return null;
            if (dateStr instanceof Date) return new Date(dateStr.getFullYear(), dateStr.getMonth(), dateStr.getDate());
            // Se vier em formato ISO com tempo, usa a data extraída
            if (dateStr.includes('T')) {
                const d = new Date(dateStr);
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
            }
            const parts = dateStr.split('-');
            if (parts.length >= 3) {
                const y = Number(parts[0]);
                const m = Number(parts[1]);
                const d = Number(parts[2]);
                return new Date(y, m - 1, d);
            }
            // Fallback para construtor de Date (menos preferível)
            const fallback = new Date(dateStr);
            return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
        };

        const dataEntrada = parseDateOnlyAsLocal(ticket.data_entrada_efetiva);
        const dataSaidaPrevista = parseDateOnlyAsLocal(ticket.data_saida_prevista);
        const dataHoje = new Date();
        
        // manter apenas a parte de data de hoje (meia-noite local)
        const hojeLocal = new Date(dataHoje.getFullYear(), dataHoje.getMonth(), dataHoje.getDate());
        const dataSaidaEfetiva = ticket.data_saida_efetiva ? parseDateOnlyAsLocal(ticket.data_saida_efetiva) : null;

        // Dias totais: diferença em dias + 1 (contagem inclusiva)
        let diasTotais = Math.floor((dataSaidaPrevista - dataEntrada) / msDia) + 1;
        if (diasTotais < 1) diasTotais = 1;

        // Se tem data_saida_efetiva, usar ela como referência; senão usar hoje
        const dataReferencia = dataSaidaEfetiva || hojeLocal;

        // Dias decorridos: diferença em dias + 1 (contagem inclusiva)
        let diasDecorridos = Math.floor((dataReferencia - dataEntrada) / msDia) + 1;
        if (diasDecorridos < 1) diasDecorridos = 1;

        // Se serviço ainda não finalizado, não mostrar diasRestantes negativos
        let diasRestantes = 0;
        if (!dataSaidaEfetiva) {
            diasRestantes = Math.max(0, diasTotais - diasDecorridos);
        }

        // Percentual baseado na proporção entre diasDecorridos/diasTotais (cap entre 0 e 100)
        let percentual = Math.round((diasDecorridos / diasTotais) * 100);
        percentual = Math.min(100, Math.max(0, percentual));

        let status = "no_prazo";

        // Se tem data de saída efetiva, serviço foi finalizado
        if (dataSaidaEfetiva) {
            if (dataSaidaEfetiva > dataSaidaPrevista) {
                status = "atrasado";
            } else {
                status = "finalizado";
            }
        } else {
            if (hojeLocal > dataSaidaPrevista) {
                status = "atrasado";
            }
        }

        return {
            percentual,
            diasDecorridos,
            diasRestantes,
            diasTotais,
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
                            setModoServico("visualizar");
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
                onClose={() => {
                    setMostrarModalServico(false);
                    setModoServico("adicionar");
                    setServicoVisualizar(null);
                }}
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