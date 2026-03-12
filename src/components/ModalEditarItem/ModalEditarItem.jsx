import { useState } from "react";
import "./ModalEditarItem.css";

function ModalEditarItem({ isOpen, onClose }) {

    const [form, setForm] = useState({
        nome: "",
        fornecedor: "",
        visibilidade: "publico",
        precoVenda: "",
        precoCompra: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleEditar = () => {
        console.log("Novo item:", form);
        // aqui você pode chamar sua API depois
        onClose();
    };

    const handleCancelar = () => {
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
                    <div className="modal-content modal-estoque">

                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">
                                Edição de Item de Estoque
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">

                            <p className="subtitulo-modal">

                            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                              fill="#000000" viewBox="0 0 24 24" >

                            <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9 4h6v2H9zM8 8h12v3.07l-.83.39a16.78 16.78 0 0 1-14.34 0L4 11.07V8zM4 20v-6.72c2.54 1.19 5.27 1.79 8 1.79s5.46-.6 8-1.79V20z"></path>
                              </svg>
                                Informações do Item
                            </p>

                            {/* Nome */}
                            <label className="form-label">Item</label>
                            <input
                                type="text"
                                className="form-control input-padrao mb-3"
                                name="item"
                                value={form.item}
                                onChange={handleChange}
                                placeholder="Ex: Tinta-Azul-Fiat"
                            />

                            {/* Fornecedor */}
                            <label className="form-label">Fornecedor</label>
                            <input
                                type="text"
                                className="form-control input-padrao mb-3"
                                name="fornecedor"
                                value={form.fornecedor}
                                onChange={handleChange}
                                placeholder="Ex: Tubarão Tintas"
                            />

                            {/* Visibilidade */}
                            <label className="form-label">
                                Visibilidade em Orçamento/Ordem de Serviço
                            </label>

                            <div className="d-flex gap-4 mb-3">
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="visibilidade"
                                        value="publico"
                                        checked={form.visibilidade === "publico"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Público</label>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="visibilidade"
                                        value="privado"
                                        checked={form.visibilidade === "privado"}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label">Privado</label>
                                </div>
                            </div>

                            {/* Preços */}
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label fw-semibold">
                                        Preço de Venda (Un.)
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">R$</span>
                                        <input
                                            type="number"
                                            className="form-control input-padrao"
                                            name="precoVenda"
                                            value={form.precoVenda}
                                            onChange={handleChange}
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="col">
                                    <label className="form-label fw-semibold">
                                        Preço de Compra (Un.)
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">R$</span>
                                        <input
                                            type="number"
                                            className="form-control input-padrao"
                                            name="precoCompra"
                                            value={form.precoCompra}
                                            onChange={handleChange}
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>
                            </div>



                            {/* Botões */}
                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-success w-50 botao-editar"
                                    onClick={handleEditar}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-outline-secondary w-50"
                                    onClick={handleCancelar}
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

export default ModalEditarItem;


