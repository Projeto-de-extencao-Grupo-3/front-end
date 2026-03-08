import { useNavigate } from "react-router-dom";
import ResumoDoOrcamento from "../../Resumo/ResumoDoOrcamento";
import OrdemServicoCard from "../../ServicoCard/OrdemServicoCard";
import "./ConfirmacaoAutorizacao.css"; 
import TempoEstimado from "../TempoEstimado";

// 1. Adicione a prop 'placa' aqui
function ConfirmacaoAutorizacao({ onClose, onConfirm, placa }) {
    const navigate = useNavigate();
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Deseja realmente aprovar este orçamento?</h2>
                
                <OrdemServicoCard placa={placa} />
                
                <TempoEstimado dias={14}/>
                <ResumoDoOrcamento/>
                
                <div className="confirmacao-buttons">
                    <button className="btn-confirmar" onClick={() => {
                        navigate(`/painelControle/aguardandoVaga/${placa}`);
                        onClose();
                    }}>Confirmar</button>
                    
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmacaoAutorizacao;