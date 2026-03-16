import { useState } from "react";
import './ModalAdicionar.css';

function ModalAdicionar({ isOpen, onClose, onSave }) {
    const estadoInicial = {
        nome: "",
        cpfCnpj: "",
        tipo: "PESSOA_FISICA",
        telefone: "",
        email: "",
    };

    const [formData, setFormData] = useState(estadoInicial);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancelar = () => {
        setFormData(estadoInicial);
        onClose();
    };

    const handleFinalizar = async () => {
        try {
            await onSave(formData);
            handleCancelar();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar cliente.");
        }
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
                                Adicionar novo Cliente
                            </h2>
                        </div>

                        <div className="modal-body">
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex align-items-center mb-3 text-muted">
                                    <i className='bx bx-list-check me-2' style={{ fontSize: '1.2rem' }}></i>
                                    <span style={{ fontSize: '0.95rem' }}>Preencha os campos abaixo</span>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Nome</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Gabriel"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">CPF/CNPJ</label>
                                        <input
                                            type="text"
                                            name="cpfCnpj"
                                            value={formData.cpfCnpj}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="132913128381"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Tipo de Cliente</label>
                                        <select
                                            name="tipo"
                                            value={formData.tipo}
                                            onChange={handleChange}
                                            className="form-select bg-light border-0"
                                        >
                                            <option value="PESSOA_FISICA">PESSOA_FISICA</option>
                                            <option value="PESSOA_JURIDICA">PESSOA_JURIDICA</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="grotrack@gmail.com"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Telefone</label>
                                        <input
                                            type="text"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="11999999999"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-3">
                                <button
                                    className="btn w-100 fw-medium"
                                    onClick={handleFinalizar}
                                    style={{ backgroundColor: '#5cb85c', color: '#fff', padding: '10px 0' }}
                                >
                                    Confirmar
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

export default ModalAdicionar;