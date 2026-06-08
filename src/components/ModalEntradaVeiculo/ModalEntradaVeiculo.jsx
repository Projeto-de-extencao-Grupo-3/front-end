import { useRef, useState } from "react";
import './ModalEntradaVeiculo.css';
import { useNavigate } from "react-router-dom";
import ReconhecimentoPlaca from "../../service/ReconhecimentoPlaca";
import heic2any from "heic2any";

function ModalEntradaVeiculo({ isOpen, onClose }) {
    const { send_to_gateway } = ReconhecimentoPlaca();
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [etapa, setEtapa] = useState("opcoes");

    const handleVeiculoCadastrado = () => {
        setEtapa("foto");
    };

    const handleUploadImag = () => {
        fileInputRef.current.click();
    }

    const handleArquivoSelecionado = async (e) => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;

        let arquivoFinal = arquivo;

        const tipo = arquivo.type.toLowerCase();
        const nome = arquivo.name.toLowerCase();
        const isHeic = tipo === "image/heic" || tipo === "image/heif" || nome.endsWith(".heic") || nome.endsWith(".heif");
        const isJpeg = tipo === "image/jpeg" || tipo === "image/jpg" || nome.endsWith(".jpg") || nome.endsWith(".jpeg");

        try {
            if (isHeic) {
                // HEIC/HEIF (iPhone padrão) → converte para JPEG via heic2any
                const blobConvertido = await heic2any({
                    blob: arquivo,
                    toType: "image/jpeg",
                    quality: 0.92,
                });

                const blob = Array.isArray(blobConvertido) ? blobConvertido[0] : blobConvertido;
                const nomeSemExtensao = arquivo.name.replace(/\.[^/.]+$/, "");
                arquivoFinal = new File([blob], `${nomeSemExtensao}.jpg`, { type: "image/jpeg" });

            } else if (isJpeg) {
                // JPEG com EXIF de rotação (Android e iPhone em modo compatível)
                // Usa Canvas para normalizar orientação e re-exportar limpo
                const blobUrl = URL.createObjectURL(arquivo);
                const blob = await new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error("Falha ao carregar imagem")); };
                    img.onload = () => {
                        URL.revokeObjectURL(blobUrl);
                        const canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        canvas.getContext("2d").drawImage(img, 0, 0);
                        canvas.toBlob(resolve, "image/jpeg", 0.92);
                    };
                    img.src = blobUrl;
                });

                const nomeSemExtensao = arquivo.name.replace(/\.[^/.]+$/, "");
                arquivoFinal = new File([blob], `${nomeSemExtensao}.jpg`, { type: "image/jpeg" });
            }
            // outros formatos (PNG, WebP) são enviados direto sem conversão

        } catch (erro) {
            console.warn("[Modal] Conversão falhou, enviando arquivo original:", erro.message);
            arquivoFinal = arquivo;
        }

        await send_to_gateway(arquivoFinal);
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
                                            capture="environment"
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