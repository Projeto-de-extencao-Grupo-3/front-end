import { useParams } from "react-router-dom";

import ResumoDoOrcamento from "../../Resumo/ResumoDoOrcamento";
import OrdemServicoCard from "../../ServicoCard/OrdemServicoCard";
import TempoEstimado from "../TempoEstimado";

import "./ConfirmacaoAutorizacao.css";

function ConfirmacaoAutorizacao({ aberto, onClose, onConfirm, placa, ordemServicoDados }) {
    const { idOrdemServico } = useParams();

    if (!aberto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Deseja realmente aprovar este orçamento?</h2>

                <OrdemServicoCard
                    placa={placa.placa}
                    marca={placa.marca}
                    prefixo={placa.prefixo}
                    modelo={placa.modelo}
                    cliente={placa.nome_cliente}
                    idOrdemServico={idOrdemServico}
                />

                <TempoEstimado dias={14} />
                <ResumoDoOrcamento
                    ticket={ordemServicoDados.resumo}
                />

                <div className="confirmacao-buttons">
                    <button className="btn-confirmar" onClick={() => {
                        onConfirm();
                    }}>Confirmar</button>

                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmacaoAutorizacao;