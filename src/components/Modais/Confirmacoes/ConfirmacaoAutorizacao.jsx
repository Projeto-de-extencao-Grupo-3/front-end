import { useNavigate } from "react-router-dom";
import ResumoDoOrcamento from "../../Resumo/ResumoDoOrcamento";
import OrdemServicoCard from "../../ServicoCard/OrdemServicoCard";
import "./ConfirmacaoAutorizacao.css"; 

function ConfirmacaoAutorizacao({ onClose, onConfirm }) {
    const navigate = useNavigate();
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Deseja realmente aprovar este orçamento</h2>
                <OrdemServicoCard placa={"ABC-1234"} />
                <div>
                    <p>Tempo estimado: 14 dias</p>
                </div>
                <ResumoDoOrcamento/>
                <div className="confirmacao-buttons">
                    <button className="btn-confirmar" onClick={() => {
                        navigate("/painelControle/aguardandoVaga");
                        onClose()
                    }}>Confirmar</button>
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmacaoAutorizacao;
