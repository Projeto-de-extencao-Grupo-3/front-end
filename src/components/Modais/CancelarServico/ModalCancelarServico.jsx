import { useState } from "react";
import { createPortal } from "react-dom";
import api from "../../../service/api";
import OrdemServicoCard from "../../ServicoCard/OrdemServicoCard";
import "./ModalCancelarServico.css";
import { exibirAlertaErro, exibirAlertaSucesso } from "../../../service/alertas";

function ModalCancelarServico({ os, onSuccess }) {
    const [aberto, setAberto] = useState(false);

    const handleCancelarOS = async () => {
        try {
            await api.delete(`/jornada/${os.id_ordem_servico}/cancelar-ordem`);
            setAberto(false);
            if (onSuccess) onSuccess();
            exibirAlertaSucesso("Ordem de serviço cancelada com sucesso!");
        } catch (error) {
            console.error("Erro ao cancelar OS:", error);
            exibirAlertaErro("Erro ao cancelar a ordem de serviço.");
        }
    };

    function calcularDiasLocal(dataMaior, dataMenor) {
        const formatarParaLocal = (data) => {
            if (!data) return new Date();
            if (typeof data === 'string' && data.includes('-')) return new Date(data + 'T00:00:00');
            return new Date(data);
        };
        const d1 = formatarParaLocal(dataMaior);
        const d2 = formatarParaLocal(dataMenor);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
    }

    const statusEntrada = os.status === "AGUARDANDO_ENTRADA";
    const statusProd = os.status === "EM_PRODUCAO";

    return (
        <>
            <button
                className="btn btn-outline-secondary px-3"
                onClick={() => setAberto(true)}
            >
                Cancelar
            </button>

            {aberto && createPortal(
                <div className="rs-fundo" onClick={() => setAberto(false)}>
                    <div className="rs-caixa modal-cancelar" onClick={(e) => e.stopPropagation()}>

                        <h2 className="titulo-confirmacao">
                            Deseja realmente cancelar {statusEntrada ? "este agendamento" : "esta Ordem de Serviço"}?
                        </h2>

                        <OrdemServicoCard
                            idOrdemServico={os.id_ordem_servico?.toString().padStart(4, '0')}
                            placa={os.veiculo?.placa}
                            marca={os.veiculo?.marca}
                            modelo={os.veiculo?.modelo}
                            prefixo={os.veiculo?.prefixo}
                            cliente={os.cliente?.nome}
                        />

                        <div className="info-data-agendada">
                            {statusEntrada ? (
                                <>
                                    <i className='bx bx-hourglass'></i>
                                    <span>
                                        <b>Data Agendada:</b> {os.data_entrada_prevista ? new Date(os.data_entrada_prevista + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}
                                    </span>
                                </>
                            ) : (
                                <div className="d-flex flex-column gap-1 w-100 text-start">
                                    <div className="d-flex align-items-center gap-2">
                                        <i className='bx bx-dollar-circle'></i>
                                        <span><b>Valor Total:</b> R$ {os.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <i className='bx bx-time'></i>
                                        {statusProd ? (
                                            <><i className='bx bx-hourglass'></i><span><b>Dias em produção:</b> {calcularDiasLocal(null, os.data_ultima_atualizacao)} Dias</span></>
                                        ) : (

                                            <><i className='bx bx-hourglass'></i><span><b>Dias em espera:</b> {os.dias_espera} Dias</span></>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rs-botoes">
                            <button className="btn-confirmar-verde" onClick={handleCancelarOS}>
                                <i className='bx bx-check-square'></i> Confirmar
                            </button>
                            <button className="btn-voltar-branco" onClick={() => setAberto(false)}>
                                Voltar
                            </button>
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
}

export default ModalCancelarServico;