import { useState } from "react";
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
    const { buscarEnderecoViaCEP, _loading } = useEndereco();

    const handleCEPChange = async (valor) => {
        setFormData(prev => ({ ...prev, cep: valor }));

        const cepLimpo = valor.replace(/\D/g, '');
        
        if (cepLimpo.length === 8) {
            const dados = await buscarEnderecoViaCEP(cepLimpo);
            if (dados) {
                setFormData(prev => ({
                    ...prev,
                    logradouro: dados.logradouro || prev.logradouro,
                    bairro: dados.bairro || prev.bairro,
                    cidade: dados.localidade || dados.cidade || prev.cidade,
                    estado: dados.uf || dados.estado || prev.estado
                }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "cep") {
            handleCEPChange(value);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
                            <input 
                                type="text" 
                                name="cep" 
                                value={formData.cep} 
                                onChange={handleChange} 
                                className="form-control mb-3" 
                                placeholder="00000-000"
                                maxLength={9} 
                            />
                            
                            {/* Exibindo um feedback visual enquanto busca */}
                            {_loading && <small className="text-primary d-block mb-2">Buscando endereço...</small>}

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

                            <button className="btn btn-primary w-100 mb-3" onClick={handleFinalizar} disabled={_loading}>
                                {_loading ? "Carregando..." : "Finalizar Cadastro"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAdicionarEndereco;