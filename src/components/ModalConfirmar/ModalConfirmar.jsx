import "./ModalConfirmar.css";

function ModalConfirmar({ isOpen, onClose, itemData }) {

    const handleDesativar = () => {
        console.log("Item desativado:", itemData);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="overlay-modal"
                    onClick={onClose}
                    style={{ zIndex: 1040 }}
                />
            )}

            <div
                className={`modal-container ${isOpen ? "ativo" : ""}`}
                style={{ zIndex: 1050 }}
            >
                <div className="modal-box">
                    <div className="modal-content-confirmar">

                        <div className="modal-topo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                fill="#810606" viewBox="0 0 24 24"
                                style={{ marginRight: "8px" }}>
                                <path d="M11 9h2v6h-2zm0 8h2v2h-2z"></path>
                                <path d="M12.87 2.51c-.35-.63-1.4-.63-1.75 0l-9.99 18c-.17.31-.17.69.01.99.18.31.51.49.86.49h20c.35 0 .68-.19.86-.49a1 1 0 0 0 .01-.99zM3.7 20 12 5.06 20.3 20z"></path>
                            </svg>
                            <h2 className="titulo-modal">
                                Confirmar Desativação
                            </h2>
                        </div>


                        <div className="modal-corpo">

                            <div className="alerta-desativar">
                                <span>
                                    Atenção! Esta ação não pode ser desfeita!
                                </span>
                            </div>

                            <div className="botoes-modal">
                                <button
                                    className="btn-desativar"
                                    onClick={handleDesativar}
                                >
                                    Desativar
                                </button>

                                <button
                                    className="btn-cancelar"
                                    onClick={onClose}
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

export default ModalConfirmar;