import { useState, useEffect } from "react";
import "./ModalNovoItem.css";

const estadoInicial = {
    nome: "",
    fornecedorNf: "",      
    viavelOrcamento: true, 
    precoVenda: "",
    precoCompra: "",
    quantidadeEstoque: "",  
    tipoServico: ""
}

function ModalNovoItem({ isOpen, onClose, onSave, produtosParaEditar }) {

    const [form, setForm] = useState(estadoInicial);

    useEffect(() => {
        let montado = true;

        if (isOpen && montado) {
            setTimeout(() => {
                if (produtosParaEditar) {
                    const _formatadoParaEdicao = {
                        ...produtosParaEditar,
                        visibilidade: (produtosParaEditar.visibilidade === 1 || produtosParaEditar.visibilidade === true)
                            ? "publico"
                            : "privado"
                    };
                    setForm(produtosParaEditar);
                } else {
                    setForm(estadoInicial);
                }
            }, 0);
        }

        return () => { montado = false; };
    }, [isOpen, produtosParaEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCancelar = () => {
        setForm(estadoInicial)
        onClose();
    };

    const handleFinalizar = async () => {
        try {

            const dadosParaEnviar = {
                nome: form.nome,
                fornecedor_nf: form.fornecedorNf, 
                preco_compra: parseFloat(form.precoCompra),
                preco_venda: parseFloat(form.precoVenda),   
                quantidade_estoque: parseInt(form.quantidadeMinima), 
                visivel_orcamento: form.visibilidade === "publico", 
                tipo_servico: form.tipoServico
            };

            const id = form.idProduto || form.id_produto || form.id_peca || form.idPeca;
            await onSave(dadosParaEnviar, id);
            handleCancelar();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar funcionário.");
        }
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
                                name="fornecedorNf"
                                value={form.fornecedorNf}
                                onChange={handleChange}
                                placeholder="Ex: Tubarão Tintas"
                            />

                            <label className="form-label fw-semibold">Tipo de Serviço</label>
                            <input
                                type="text"
                                className="form-control input-padrao mb-3"
                                name="tipoServico"
                                value={form.tipoServico}
                                onChange={handleChange}
                                placeholder="Ex: FUNILARIA"
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
                                Quantidade no estoque
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
                                    onClick={handleFinalizar}
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


