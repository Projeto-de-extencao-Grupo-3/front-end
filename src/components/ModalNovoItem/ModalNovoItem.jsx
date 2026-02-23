import { useState } from "react";
import "./ModalNovoItem.css";

function ModalNovoItem({ isOpen, onClose }) {

    const [form, setForm] = useState({
        nome: "",
        fornecedor: "",
        visibilidade: "publico",
        precoVenda: "",
        precoCompra: "",
        quantidadeMinima: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleConfirmar = () => {
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
                                Adicionar novo Item ao Estoque
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">

                            <p className="subtitulo-modal">
                                <i className="bx bx-package me-2"></i>
                                Preencha os campos abaixo
                            </p>

                            {/* Nome */}
                            <label className="form-label fw-semibold">Nome</label>
                            <input
                                type="text"
                                className="form-control input-padrao mb-3"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Ex: Tinta-Azul-Fiat"
                            />

                            {/* Fornecedor */}
                            <label className="form-label fw-semibold">Fornecedor</label>
                            <input
                                type="text"
                                className="form-control input-padrao mb-3"
                                name="fornecedor"
                                value={form.fornecedor}
                                onChange={handleChange}
                                placeholder="Ex: Tubarão Tintas"
                            />

                            {/* Visibilidade */}
                            <label className="form-label fw-semibold">
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

                            {/* Quantidade mínima */}
                            <label className="form-label fw-semibold">
                                Quantidade mínima para gerar alerta
                            </label>
                            <div className="input-group mb-4">
                                <span className="input-group-text">Un.</span>
                                <input
                                    type="number"
                                    className="form-control input-padrao"
                                    name="quantidadeMinima"
                                    value={form.quantidadeMinima}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>

                            {/* Botões */}
                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-success w-50 botao-confirmar"
                                    onClick={handleConfirmar}
                                >
                                    Confirmar
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

export default ModalNovoItem;


