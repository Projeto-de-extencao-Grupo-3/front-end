import { useRef, useState } from "react";
import './ModalEntradaVeiculo.css';
import { useNavigate } from "react-router-dom";

function ModalEntradaVeiculo({ isOpen, onClose }) {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [etapa, setEtapa] = useState("opcoes");

    const handleVeiculoCadastrado = () => {
        setEtapa("foto");
    };

    const handleUploadImag = () => {
        fileInputRef.current.click();
    }

    const handleArquivoSelecionado = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            console.log("Arquivo selecionado:", arquivo.name);
            navigate("/painelControle/entradaCamera", { 
                state: { arquivoCapturado: arquivo } 
        });
        }
    };

    const handleCancelar = () => {
        setEtapa("opcoes");
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="modal-backdrop fade show"
                    onClick={handleCancelar}
                    style={{ zIndex: 1040 }}
                />
            )}

            <div className={`modal fade ${isOpen ? "show d-block" : ""}`} style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-entrada">

                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">
                                Nova entrada de Veículo
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">

                            {/* etapa 1 - opcoes de entrada */}
                            {etapa === "opcoes" && (
                                <>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleArquivoSelecionado}
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                    />

                                    <button className="botao-principal w-100 botao-opcao mb-3" onClick={handleVeiculoCadastrado} >
                                        <i className='bx bx-camera me-2'></i>
                                        Carro já é cadastrado
                                    </button>

                                    <button className="botao-secundario w-100 botao-opcao mb-3" onClick={() => navigate("/painelControle/entrada")}>
                                        <i className='bx bx-hourglass me-2'></i>
                                        Carro não é cadastrado
                                    </button>

                                    <button
                                        className="botao-cancelar w-100"
                                        onClick={handleCancelar}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            )}

                            {/* etapa 2 - veiculo ja cadastrado */}
                            {etapa === "foto" && (
                                <>
                                    <div className="foto-card p-3 mb-4">
                                        <p className="fw-semibold texto-foto mb-3">
                                            Clique na câmera abaixo para anexar <br />
                                            a foto da placa do carro
                                        </p>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleArquivoSelecionado}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                        />

                                        <button className="botao-principal w-100 botao-opcao mb-3" onClick={handleUploadImag} >
                                            <div className="foto-caixa d-flex flex-column 
                                                align-items-center justify-content-center">
                                                <i className='bx bx-camera bx-sm mb-2'></i>
                                                <span className="fw-semibold">Foto da Placa</span>
                                            </div>
                                        </button>
                                    </div>

                                    <button
                                        className="botao-cancelar w-100"
                                        onClick={() => setEtapa("opcoes")}
                                    >
                                        Voltar
                                    </button>
                                </>
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEntradaVeiculo;
