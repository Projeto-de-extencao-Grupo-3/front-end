import { useState } from "react";
import './ModalAdicionar.css';

function ModalAdicionar({ isOpen, onClose }) {
    const [etapa, setEtapa] = useState("pesquisa");

    const handleAdicionar = () => {
        setEtapa("detalhes"); //muda quando clica no botão adicionar. aq vai ser as chamadas de api
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
                                Informações do Cliente
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            {/* etapa 1 - pesquisar */}
                            {etapa === "pesquisa" && (
                                <>
                                    <label className="form-label fw-semibold">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="Maria Oliveira"
                                    />
                                      <label className="form-label fw-semibold">CPF/CNPJ</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="000.000.000-00"
                                    />
                                      <label className="form-label fw-semibold">Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="Pessoa Física"
                                    />
                                      <label className="form-label fw-semibold">Telefone</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="(00) 00000-0000"
                                    />
                                          <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="maria.oliveira@email.com"
                                    />
                                          <label className="form-label fw-semibold">Status</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="Ativo"
                                    />

                                    <button
                                        className="btn btn-primary w-100 botao-pesquisar mb-3"
                                        onClick={handleAdicionar}
                                    >
                                        Adicionar
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

export default ModalAdicionar;
