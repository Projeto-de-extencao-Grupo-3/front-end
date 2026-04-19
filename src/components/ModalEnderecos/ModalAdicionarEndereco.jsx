import { useState } from "react";
import './ModalAdicionarEndereco.css';
import Enderecos from "../../service/Endereco";
import { exibirAlertaErro } from "../../service/alertas";

const estadoInicial = {
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    correspondencia: false,
};

function possuiValor(valor) {
    if (valor === null || valor === undefined) return false;
    return String(valor).trim() !== "";
}

function ModalAdicionarEndereco({ isOpen, onClose, onSaveEndereco }) {
    const [formData, setFormData] = useState(estadoInicial);
    const { buscarEnderecoViaCEP, _loading } = Enderecos();

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
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }

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
        const camposObrigatoriosEndereco = [
            { label: "CEP", value: formData.cep },
            { label: "Numero", value: formData.numero },
            { label: "Logradouro", value: formData.logradouro },
            { label: "Bairro", value: formData.bairro },
            { label: "Cidade", value: formData.cidade },
            { label: "Estado", value: formData.estado },
        ];

        const camposFaltantes = camposObrigatoriosEndereco
            .filter((campo) => !possuiValor(campo.value))
            .map((campo) => campo.label);

        if (camposFaltantes.length > 0) {
            exibirAlertaErro(`Preencha os campos obrigatorios do endereco: ${camposFaltantes.join(", ")}.`);
            return;
        }

        await onSaveEndereco(formData);
        handleCancelar();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleCancelar} style={{ zIndex: 1040 }} />
            <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 p-3" style={{ borderRadius: '12px' }}>

                        <div className="modal-header border-0 pb-0">
                            <h2 className="fw-medium" style={{ fontSize: '1.75rem', color: '#000' }}>
                                Informações do Endereço
                            </h2>
                        </div>

                        <div className="modal-body">
                            {/* Quadro interno cinza idêntico ao de Cliente */}
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex align-items-center mb-3 text-muted">
                                    <i className='bx bx-map-pin me-2' style={{ fontSize: '1.2rem' }}></i>
                                    <span style={{ fontSize: '0.95rem' }}>
                                        {_loading ? "Buscando endereço..." : "Preencha a localização"}
                                    </span>
                                </div>

                                <div className="row g-3">
                                    {/* CEP */}
                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">CEP*</label>
                                        <input
                                            type="text"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="00000-000"
                                            maxLength={9}
                                        />
                                    </div>

                                    {/* Logradouro e Número */}
                                    <div className="col-8">
                                        <label className="form-label mb-1 text-dark fw-normal">Logradouro*</label>
                                        <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} className="form-control bg-light border-0" placeholder="Rua..." />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label mb-1 text-dark fw-normal">Nº*</label>
                                        <input type="text" name="numero" value={formData.numero} onChange={handleChange} className="form-control bg-light border-0" placeholder="123" />
                                    </div>

                                    {/* Bairro e Complemento */}
                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Bairro*</label>
                                        <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} className="form-control bg-light border-0" />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Complemento</label>
                                        <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} className="form-control bg-light border-0" placeholder="Apto, Bloco..." />
                                    </div>

                                    {/* Cidade e UF */}
                                    <div className="col-9">
                                        <label className="form-label mb-1 text-dark fw-normal">Cidade*</label>
                                        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="form-control bg-light border-0" />
                                    </div>
                                    <div className="col-3">
                                        <label className="form-label mb-1 text-dark fw-normal">UF*</label>
                                        <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="form-control bg-light border-0" maxLength={2} />
                                    </div>

                                    <div className="col-12">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="enderecoCorrespondenciaCadastro"
                                                name="correspondencia"
                                                checked={Boolean(formData.correspondencia)}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="enderecoCorrespondenciaCadastro">
                                                Endereço de correspondência
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Botões de Ação Seguindo o Estilo */}
                            <div className="d-flex gap-3">
                                <button
                                    className="btn w-100 fw-medium"
                                    onClick={handleFinalizar}
                                    disabled={_loading}
                                    style={{ backgroundColor: '#5cb85c', color: '#fff', padding: '10px 0' }}
                                >
                                    {_loading ? "Carregando..." : "Confirmar"}
                                </button>
                                <button
                                    className="btn w-100 fw-medium border"
                                    onClick={handleCancelar}
                                    style={{ backgroundColor: '#fff', color: '#333', padding: '10px 0' }}
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

export default ModalAdicionarEndereco;