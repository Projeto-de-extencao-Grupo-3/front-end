function ModalDesativarEstoque({ isOpen, onClose, onConfirm, itemParaDesativar }) {

    if (!isOpen || !itemParaDesativar) return null;

    // Função de confirmação pegando o ID correto
    const handleConfirm = () => {
        const id = itemParaDesativar.id_peca || itemParaDesativar.id;
        onConfirm(id);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-custom border-0 p-4" style={{ borderRadius: '12px', maxWidth: '600px' }}>

                <div className="modal-header border-0 p-0 mb-3">
                    <h2 className="fw-medium text-dark" style={{ fontSize: '2rem' }}>
                        Desativar Item de Estoque
                    </h2>
                </div>

                <div className="d-flex align-items-center p-3 mb-4 rounded-3"
                    style={{ backgroundColor: '#dc3545', color: '#fff' }}>
                    <i className='bx bx-error-circle me-2' style={{ fontSize: '1.5rem' }}></i>
                    <span className="fw-medium">Atenção! Esta ação não pode ser desfeita!</span>
                </div>

                <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="d-flex align-items-center mb-4 text-muted">
                        <i className='bx bxs-briefcase me-2' style={{ fontSize: '1.3rem' }}></i>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Informações do Item</span>
                    </div>

                    <div className="row g-3 text-start">
                        <div className="col-6">
                            <label className="form-label mb-1 text-dark">Item</label>
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                value={itemParaDesativar.nome || ""}
                                disabled
                                style={{ color: '#333' }}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label mb-1 text-dark">Fornecedor</label>
                            <input
                                type="text"
                                className="form-control bg-light border-0"
                                value={itemParaDesativar.fornecedor_nf || itemParaDesativar.fornecedor || ""}
                                disabled
                                style={{ color: '#333' }}
                            />
                        </div>

                        <div className="col-4 mt-4">
                            <label className="form-label mb-1 text-dark d-block">Visibilidade</label>
                            <div className="d-flex align-items-center gap-2 mt-2">
                                <div className="form-check d-flex align-items-center gap-2 p-0 m-0">
                                    <input
                                        className="form-check-input m-0"
                                        type="radio"
                                        checked 
                                        disabled 
                                        style={{ width: '1.1rem', height: '1.1rem' }}
                                    />
                                    <label className="form-check-label text-muted m-0">
                                        {itemParaDesativar.visivel_orcamento ? "Público" : "Privado"}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-4 mt-4">
                            <label className="form-label mb-1 text-dark">Preço de Venda (Un.)</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0 fw-bold text-muted" style={{ paddingLeft: '12px' }}>
                                    R$
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 ps-0"
                                    value={itemParaDesativar.preco_venda ? itemParaDesativar.preco_venda.toFixed(2) : "0,00"}
                                    disabled
                                    style={{ color: '#333' }}
                                />
                            </div>
                        </div>

                        <div className="col-4 mt-4">
                            <label className="form-label mb-1 text-dark">Preço de Compra (Un.)</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-0 fw-bold text-muted" style={{ paddingLeft: '12px' }}>
                                    R$
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 ps-0"
                                    value={itemParaDesativar.preco_compra ? itemParaDesativar.preco_compra.toFixed(2) : "0,00"}
                                    disabled
                                    style={{ color: '#333' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-3">
                    <button
                        className="btn w-100 fw-medium"
                        onClick={handleConfirm}
                        style={{ backgroundColor: '#dc3545', color: '#fff', height: '48px', borderRadius: '8px' }}
                    >
                        Desativar
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

export default ModalDesativarEstoque;