import { useState, useEffect } from "react";

const estadoInicial = {
    nome: "",
    fornecedor_nf: "",
    visivel_orcamento: true,
    tipo_servico: "",
    preco_venda: "",
    preco_compra: "",
};

function ExibirNovoItem({ isOpen, onClose, dadosDoProduto, onUpdate }) {
    const [form, setForm] = useState(estadoInicial);

    useEffect(() => {
        if (isOpen && dadosDoProduto) {
            const timer = setTimeout(() => {
                setForm({
                    ...dadosDoProduto,
                    visivel_orcamento: dadosDoProduto.visivel_orcamento ?? true
                });
            }, 0);

            return () => clearTimeout(timer); 
        }
    }, [isOpen, dadosDoProduto]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const valorFinal = type === 'radio' ? value === 'true' : value;
        setForm(prev => ({ ...prev, [name]: valorFinal }));
    };

    const handleFinalizar = async () => {
        try {
            const id = form.id_peca || form.id;
            await onUpdate(form, id);
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            alert("Erro ao atualizar o item.");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1040 }} />

            <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 p-3" style={{ borderRadius: '12px' }}>

                        <div className="modal-header border-0 pb-0">
                            <h2 className="fw-medium" style={{ fontSize: '1.8rem', color: '#000' }}>
                                Edição de Item de Estoque
                            </h2>
                        </div>

                        <div className="modal-body">
                            {/* Quadro interno cinza padronizado */}
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex align-items-center mb-3 text-muted">
                                    <i className='bx bxs-briefcase me-2' style={{ fontSize: '1.2rem' }}></i>
                                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Informações do Item</span>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark">Item</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={form.nome}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: Tinta-Azul-Fiat"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark">Tipo de Serviço</label>
                                        <input
                                            type="text"
                                            name="tipo_servico"
                                            value={form.tipo_servico}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: FUNILARIA"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark">Fornecedor</label>
                                        <input
                                            type="text"
                                            name="fornecedor_nf"
                                            value={form.fornecedor_nf}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: Tubarão Tintas"
                                        />
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label className="form-label mb-1 d-block text-dark">Visibilidade em Orçamento/Ordem de Serviço</label>
                                        <div className="d-flex gap-4 align-items-center mt-2">
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    name="visivel_orcamento"
                                                    id="publico"
                                                    value="true"
                                                    checked={form.visivel_orcamento === true}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label text-muted" htmlFor="publico">Público</label>
                                            </div>
                                            <div className="form-check d-flex align-items-center gap-2 p-0">
                                                <input
                                                    className="form-check-input m-0"
                                                    type="radio"
                                                    name="visivel_orcamento"
                                                    id="privado"
                                                    value="false"
                                                    checked={form.visivel_orcamento === false}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label text-muted" htmlFor="privado">Privado</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6 mt-4">
                                        <label className="form-label mb-1 text-dark">Preço de Venda (Un.)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0 fw-bold text-muted">R$</span>
                                            <input
                                                type="number"
                                                name="preco_venda"
                                                value={form.preco_venda}
                                                onChange={handleChange}
                                                className="form-control bg-light border-0 ps-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6 mt-4">
                                        <label className="form-label mb-1 text-dark">Preço de Compra (Un.)</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-0 fw-bold text-muted">R$</span>
                                            <input
                                                type="number"
                                                name="preco_compra"
                                                value={form.preco_compra}
                                                onChange={handleChange}
                                                className="form-control bg-light border-0 ps-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botões de Ação lado a lado */}
                            <div className="d-flex gap-3 mt-2">
                                <button
                                    className="btn btn-success w-100 fw-medium py-2"
                                    onClick={handleFinalizar}
                                    style={{ backgroundColor: '#5cb85c', border: 'none' }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100 fw-medium py-2"
                                    onClick={onClose}
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

export default ExibirNovoItem;