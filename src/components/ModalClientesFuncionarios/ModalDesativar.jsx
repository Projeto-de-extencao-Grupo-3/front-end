import React from "react";

function ModalDesativar({ 
    isOpen, 
    onClose, 
    onConfirm, 
    titulo = "Confirmar Ação", 
    subtitulo = "Informações",
    aviso = "Atenção! Esta ação não pode ser desfeita!",
    corBotao = "#dc3545", // Padrão: Vermelho
    textoBotao = "Confirmar",
    dados = [], // Array de objetos { label: "Nome", value: "Gabriel" }
    iconClass = "bx-user"
}) {
    console.log("Dados recebidos no Modal:", dados);
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content-custom border-0 p-4" style={{ borderRadius: '12px', maxWidth: '600px' }}>
                
                {/* Título Dinâmico */}
                <div className="modal-header border-0 p-0 mb-3">
                    <h2 className="fw-medium" style={{ fontSize: '2rem', color: '#000' }}>
                        {titulo}
                    </h2>
                </div>

                {/* Banner de Aviso */}
                <div className="d-flex align-items-center p-3 mb-4 rounded-3" 
                     style={{ backgroundColor: corBotao, color: '#fff' }}>
                    <i className='bx bx-error-circle me-2' style={{ fontSize: '1.5rem' }}></i>
                    <span className="fw-medium">{aviso}</span>
                </div>

                {/* Quadro de Informações Dinâmico */}
                <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="d-flex align-items-center mb-4 text-muted">
                        <i className={`bx ${iconClass} me-2`} style={{ fontSize: '1.3rem' }}></i>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{subtitulo}</span>
                    </div>

                    <div className="row g-3 text-start">
                        {dados.map((item, index) => (
                            <div key={index} className={item.fullWidth ? "col-12" : "col-6"}>
                                <label className="form-label mb-1">{item.label}</label>
                                <input 
                                    type="text" 
                                    className="form-control bg-light border-0" 
                                    value={item.value || ""} 
                                    disabled 
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botões */}
                <div className="d-flex gap-3">
                    <button 
                        className="btn w-100 fw-medium" 
                        onClick={onConfirm}
                        style={{ backgroundColor: corBotao, color: '#fff', height: '48px', borderRadius: '8px' }}
                    >
                        {textoBotao}
                    </button>
                    <button 
                        className="btn w-100 fw-medium border" 
                        onClick={onClose}
                        style={{ backgroundColor: '#fff', color: '#333', height: '48px', borderRadius: '8px' }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalDesativar;