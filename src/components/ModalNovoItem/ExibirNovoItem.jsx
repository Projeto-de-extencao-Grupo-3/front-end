import { useState, useEffect } from "react";

const estadoInicial = {
    nome: "",
    fornecedor_nf: "",
    viavel_orcamento: true,
    preco_venda: "",
    preco_compra: "",
    quantidade_estoque: ""
};

function ExibirNovoItem({ isOpen, onClose, dadosDoProduto, onUpdate }) {
    const [form, setForm] = useState(estadoInicial);

    useEffect(() => {
        if (isOpen && dadosDoProduto) {
            setTimeout(() => {
                if (dadosDoProduto){
                    const _formatadoParaEdicao = {
                        ...dadosDoProduto,
                    };
                    setForm(dadosDoProduto)
                } else {
                    setForm(estadoInicial)
                }
            }, 0)
        }
    }, [isOpen, dadosDoProduto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalizar = async () => {
        try {
            const dadosParaEnviar = {
                nome: form.nome,
                fornecedor_nf: form.fornecedor_nf,
                visivel_orcamento: String(form.viavel_orcamento) === "true",
                preco_venda: parseFloat(form.preco_venda) || 0,
                preco_compra: parseFloat(form.preco_compra) || 0,
                quantidade_estoque: parseInt(form.quantidade_estoque) || 0,
            };

            const id = form.id_peca || form.id;

            await onUpdate(dadosParaEnviar, id);
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
                    <div className="modal-content modal-entrada shadow-lg">
                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold">Informações do Item</h2>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            <label className="form-label fw-semibold">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <label className="form-label fw-semibold">Fornecedor (NF)</label>
                            <input
                                type="text"
                                name="fornecedor_nf"
                                value={form.fornecedor_nf}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <label className="form-label fw-semibold">Preço de Venda (R$)</label>
                            <input
                                type="number"
                                name="preco_venda"
                                value={form.preco_venda}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <label className="form-label fw-semibold">Preço de Compra (R$)</label>
                            <input
                                type="number"
                                name="preco_compra"
                                value={form.preco_compra}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <label className="form-label fw-semibold">Quantidade em Estoque</label>
                            <input
                                type="number"
                                name="quantidade_estoque"
                                value={form.quantidade_estoque}
                                onChange={handleChange}
                                className="form-control mb-3"
                            />

                            <button className="btn btn-primary w-100 mb-2 py-2 fw-bold" onClick={handleFinalizar}>
                                SALVAR ALTERAÇÕES
                            </button>

                            <button className="btn btn-outline-secondary w-100" onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExibirNovoItem;