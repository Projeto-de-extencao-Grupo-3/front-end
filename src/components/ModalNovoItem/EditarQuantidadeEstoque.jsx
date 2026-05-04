import { useState, useEffect } from "react";

const estadoInicial = {
    quantidade_estoque: 0,
    quantidade_adicionar: 0, // Novo estado para a quantidade a ser adicionada
};

function EditarQuantidadeEstoque({ show, handleClose, handleConfirm, itemParaAjustarEstoque }) {
    const [form, setForm] = useState(estadoInicial);

    useEffect(() => {
        if (show && itemParaAjustarEstoque) {
            const timer = setTimeout(() => {
                setForm({
                    ...itemParaAjustarEstoque,
                    quantidade_estoque: itemParaAjustarEstoque.quantidade_estoque || 0,
                    quantidade_adicionar: 0 // Reseta o campo ao abrir o modal
                });
            }, 0);

            return () => clearTimeout(timer);
        }
    }, [show, itemParaAjustarEstoque]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalizar = async () => {
        try {
            await handleConfirm(form.quantidade_adicionar); 
            handleClose();
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleClose} style={{ zIndex: 1040 }} />

            <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 p-3" style={{ borderRadius: '12px' }}>

                        <div className="modal-header border-0 justify-content-center pb-1">
                            <h2 className="fw-medium text-center" style={{ fontSize: '1.8rem', color: '#000' }}>
                                Quantidade de Item em Estoque
                            </h2>
                        </div>

                        <div className="modal-body">
                            <div className="alert border-0 d-flex align-items-start gap-2 py-3 mb-4"
                                style={{ backgroundColor: '#1b4a7d', color: '#fff', borderRadius: '8px' }}>
                                <i className="bi bi-info-circle-fill mt-1" style={{ fontSize: '1.2rem' }}></i>
                                <p className="mb-0 small fw-medium">
                                    Atenção! Esta ação vai alterar diretamente a quantidade em Estoque e pode ser desfeita!
                                </p>
                            </div>

                            {/* Campo 1: Quantidade atual (Somente Leitura) */}
                            <div className="p-3 border rounded-3 mb-3" style={{ backgroundColor: '#f8f9fa' }}>
                                <label className="form-label mb-2 text-dark fw-medium">
                                    Quantidade atual em estoque
                                </label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="quantidade_estoque"
                                        className="form-control bg-light border-0 fw-bold text-secondary"
                                        value={form.quantidade_estoque}
                                        readOnly // Alterado para leitura apenas
                                        style={{ height: '45px' }}
                                    />
                                    <span className="input-group-text bg-light border-0 fw-bold text-secondary">
                                        Unidades
                                    </span>
                                </div>
                            </div>

                            {/* Campo 2: Quantidade que deseja adicionar (Input ativo) */}
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <label className="form-label mb-2 text-dark fw-medium">
                                    Quantidade que deseja adicionar
                                </label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        name="quantidade_adicionar"
                                        className="form-control bg-white border fw-bold text-dark"
                                        value={form.quantidade_adicionar}
                                        onChange={handleChange}
                                        style={{ height: '45px' }}
                                    />
                                    <span className="input-group-text bg-white border fw-bold text-secondary">
                                        Unidades
                                    </span>
                                </div>
                            </div>

                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-success w-100 fw-medium py-2"
                                    onClick={handleFinalizar}
                                    style={{ backgroundColor: '#5cb85c', border: 'none' }}
                                >
                                    Confirmar
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100 fw-medium py-2"
                                    onClick={handleClose}
                                    style={{ color: '#333', borderColor: '#ccc' }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarQuantidadeEstoque;