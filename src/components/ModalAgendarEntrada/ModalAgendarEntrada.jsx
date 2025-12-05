import { useState } from "react";
import './ModalAgendarEntrada.css';

function ModalAgendarEntrada({ isOpen, onClose }) {
    const [etapa, setEtapa] = useState("pesquisa");

    const handlePesquisar = () => {
        setEtapa("detalhes"); //muda quando clica no botão pesquisar. aq vai ser as chamadas de api
    };

    const handleCancelar = () => {
        setEtapa("pesquisa"); //dps de fechar o modal volta pra etapa de pesquisa
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="modal-backdrop fade show"
                    onClick={onClose}
                    style={{ zIndex: 1040 }}
                />
            )}

            <div className={`modal fade ${isOpen ? "show d-block" : ""}`} style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-entrada">

                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">
                                Agendamento de Entrada de Veículo
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            {/* etapa 1 - pesquisar */}
                            {etapa === "pesquisa" && (
                                <>
                                    <label className="form-label fw-semibold">Placa do Veículo*</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="Informe a placa (Ex: FUB-5296)"
                                    />

                                    <button
                                        className="btn btn-primary w-100 botao-pesquisar mb-3"
                                        onClick={handlePesquisar}
                                    >
                                        Pesquisar
                                    </button>
                                </>
                            )}

                            {/* etapa 2 - detalhe do veiculo */}
                            {etapa === "detalhes" && (
                                <>
                                    <div className="info-veiculo-card p-3 mb-3">
                                        <div className="d-flex align-items-start gap-3">

                                            <i className="bx bxs-user user-icon"></i>

                                            <div className="flex-grow-1">
                                                <div className="linha-superior">
                                                    <strong>Empresa:</strong> Sussantur
                                                </div>

                                                <div className="linha-inferior">
                                                    Marcopolo G8 - 1200 &nbsp; Placa: ABC-1234
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <label className="form-label fw-semibold">Data de Agendamento*</label>
                                    <input
                                        type="date"
                                        className="form-control mb-4"
                                    />

                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success w-50">
                                            ✓ Agendar
                                        </button>

                                        <button className="btn btn-outline-dark w-50" onClick={handleCancelar}>
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAgendarEntrada;
