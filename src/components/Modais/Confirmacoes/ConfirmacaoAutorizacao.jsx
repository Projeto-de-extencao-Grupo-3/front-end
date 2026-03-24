import { useNavigate } from "react-router-dom";
import ResumoDoOrcamento from "../../Resumo/ResumoDoOrcamento";
import OrdemServicoCard from "../../ServicoCard/OrdemServicoCard";
import "./ConfirmacaoAutorizacao.css"; 
import TempoEstimado from "../TempoEstimado";

function ConfirmacaoAutorizacao({ onClose, _onConfirm, placa, idOrdemServico, ordemServicoDados }) {
    const navigate = useNavigate();
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Deseja realmente aprovar este orçamento?</h2>
                
                <OrdemServicoCard 
                    placa={placa} 
                    marca={ordemServicoDados?.marca}
                    prefixo={ordemServicoDados?.prefixo}
                    idOrdemServico={idOrdemServico}
                    modelo={ordemServicoDados?.modelo}
                    cliente={ordemServicoDados?.empresa}
                />
                
                <TempoEstimado dias={14}/>
                <ResumoDoOrcamento/>
                
                <div className="confirmacao-buttons">
                    <button className="btn-confirmar" onClick={() => {
                        navigate(`/painelControle/aguardandoVaga/${idOrdemServico}`, {
                            state: { veiculoDados: ordemServicoDados }
                        });
                        onClose();
                    }}>Confirmar</button>
                    
                    <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmacaoAutorizacao;