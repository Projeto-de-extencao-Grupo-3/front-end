import { useState } from "react";
import "./ModalQtdItem.css";
import iconCheck from "../../assets/icons/check icon.png"

function ModalQtdItem({ isOpen, onClose }) {

    const [form, setForm] = useState({
        qtd: "",
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
                                Quantidade de Item em Estoque
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">

<div className="info"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                    fill="currentColor" viewBox="0 0 24 24" >

                                    <path d="M11 11h2v6h-2zm0-4h2v2h-2z"></path><path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10m0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8"></path>
                                </svg>

                            {/* atenção */}
                            <label className="form-label-azul">
                                

                                Atenção! Esta ação vai alterar diretamente a quantidade em Estoque pode ser desfeita!</label>
</div>

                            {/* qtd que deseja adicionar */}
                            <label className="form-label-qtd">Quantidade que deseja adicionar
                                <input
                                    type="text"
                                    className="form-control input-padrao mb-3"
                                    name="qtd"
                                    value={form.qtd}
                                    onChange={handleChange}
                                    placeholder="14 Unidades"
                                />
                            </label>




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

export default ModalQtdItem;


