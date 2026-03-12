import { useState, useEffect } from "react";
import "./ModalDesativarItem.css";

function ModalDesativarItem({ isOpen, onClose, itemData }) {
    const [form, setForm] = useState(() => ({
        item: itemData?.item || "",
        fornecedor: itemData?.fornecedor || "",
        precoVenda: itemData?.precoVenda || "",
        precoCompra: itemData?.precoCompra || "",
        isPrivado: itemData?.isPrivado ?? true,
    }));

    useEffect(() => {
        if (!itemData) return;
        
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({
            item: itemData.item ?? "",
            fornecedor: itemData.fornecedor ?? "",
            precoVenda: itemData.precoVenda ?? "",
            precoCompra: itemData.precoCompra ?? "",
            isPrivado: itemData.isPrivado ?? true,
        });
    }, [itemData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleDesativar = () => {
        console.log("Item desativado:", form);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-backdrop fade show" onClick={onClose} style={{ zIndex: 1040 }} />
            )}

            <div className={`modal fade ${isOpen ? "show d-block" : ""}`} style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-desativar-container">

                        <div className="modal-header border-0 pb-0">
                            <h2 className="modal-title fw-bold titulo-modal-desativar">
                                Desativar Item de Estoque
                            </h2>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body">
                            {/*  alerta */}
                            <div className="alerta-danger-custom d-flex align-items-center justify-content-center gap-2 mb-3">
                                <span>Atenção!  Esta ação não pode ser desfeita!</span>
                            </div>

                            <div className="info-item-card p-3 mb-3">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 24 24">
                                        <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9 4h6v2H9zM8 8h12v3.07l-.83.39a16.78 16.78 0 0 1-14.34 0L4 11.07V8zM4 20v-6.72c2.54 1.19 5.27 1.79 8 1.79s5.46-.6 8-1.79V20z"></path>
                                    </svg>
                                    <span className="fw-bold text-dark">Informações do Item</span>
                                </div>

                                <div className="row g-2">
                                    <div className="col-6 text-center">
                                        <label className="label-form">Item</label>
                                        <input
                                            type="text"
                                            name="item"
                                            className="form-control input-cinza-claro"
                                            value={form.item}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-6 text-center">
                                        <label className="label-form">Fornecedor</label>
                                        <input
                                            type="text"
                                            name="fornecedor"
                                            className="form-control input-cinza-claro"
                                            value={form.fornecedor}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-4 d-flex flex-column align-items-center justify-content-end">
                                        <label className="label-form">Visibilidade</label>
                                        <label className="d-flex align-items-center gap-2 pb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isPrivado"
                                                className="checkbox-custom"
                                                checked={form.isPrivado}
                                                onChange={handleChange}
                                            />
                                            <span className="text-secondary small">Privado</span>
                                        </label>
                                    </div>

                                    <div className="col-4 text-center">
                                        <label className="label-form">Preço de Venda (Un.)</label>
                                        <input
                                            type="text"
                                            name="precoVenda"
                                            className="form-control input-cinza-claro"
                                            value={form.precoVenda}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-4 text-center">
                                        <label className="label-form">Preço de Compra (Un.)</label>
                                        <input
                                            type="text"
                                            name="precoCompra"
                                            className="form-control input-cinza-claro"
                                            value={form.precoCompra}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                                <button className="btn btn-danger-custom w-50" onClick={handleDesativar}>
                                    Desativar
                                </button>
                                <button className="btn btn-outline-cancelar-custom w-50" onClick={onClose}>
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

export default ModalDesativarItem;