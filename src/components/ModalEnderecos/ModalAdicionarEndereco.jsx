import { useState, useEffect } from "react";
import './ModalAdicionarEndereco.css';
import useEndereco from "../../service/Endereco";

const estadoInicial = {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
};

function ModalAdicionarEndereco({ isOpen, onClose, onSaveEndereco }) {
    const [formData, setFormData] = useState(estadoInicial);
    const { buscarEnderecoViaCEP, loading } = useEndereco();

    useEffect(() => {
        const cep = formData.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            autocompletarEndereco(cep);
        }
    }, [formData.cep]);

    const autocompletarEndereco = async (cep) => {
        const dados = await buscarEnderecoViaCEP(cep);
        if (dados) {
            setFormData(prev => ({
                ...prev,
                logradouro: dados.logradouro || "",
                bairro: dados.bairro || "",
                cidade: dados.localidade || dados.cidade || "",
                estado: dados.uf || dados.estado || ""
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCancelar = () => {
        setFormData(estadoInicial);
        onClose();
    };

    const handleFinalizar = async () => {
        await onSaveEndereco(formData);
        handleCancelar();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleCancelar} style={{ zIndex: 1040 }} />
            <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-entrada">
                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">Informações do Endereço</h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>
                        <div className="modal-body">
                            <label className="form-label fw-semibold">CEP</label>
                            <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="form-control mb-3" placeholder="00000-000" />

                            <div className="row">
                                <div className="col-8">
                                    <label className="form-label fw-semibold">Logradouro</label>
                                    <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} className="form-control mb-3" />
                                </div>
                                <div className="col-4">
                                    <label className="form-label fw-semibold">Nº</label>
                                    <input type="text" name="numero" value={formData.numero} onChange={handleChange} className="form-control mb-3" />
                                </div>
                            </div>

                            <label className="form-label fw-semibold">Complemento</label>
                            <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} className="form-control mb-3" />

                            <label className="form-label fw-semibold">Bairro</label>
                            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="form-control mb-3" />

                            <div className="row">
                                <div className="col-8">
                                    <label className="form-label fw-semibold">Cidade</label>
                                    <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="form-control mb-3" />
                                </div>
                                <div className="col-4">
                                    <label className="form-label fw-semibold">UF</label>
                                    <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="form-control mb-3" />
                                </div>
                            </div>

                            <button className="btn btn-primary w-100 mb-3" onClick={handleFinalizar}>
                                Finalizar Cadastro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAdicionarEndereco;