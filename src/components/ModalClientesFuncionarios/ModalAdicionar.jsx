import { useState } from "react";
import './ModalAdicionar.css';

function ModalAdicionar({ isOpen, onClose, onSave }) {
    const [etapa, setEtapa] = useState("pesquisa");

    const estadoInicial = {
        nome: "",
        cpfCnpj: "",
        tipo: "Pessoa Física",
        telefone: "",
        email: "",
    };

    const [formData, setFormData] = useState(estadoInicial);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancelar = () => {
        setEtapa("pesquisa");
        setFormData(estadoInicial); // Usa a constante para resetar tudo
        onClose();
    };

    const handleFinalizar = async () => {
        try {
            await onSave(formData);
            handleCancelar(); // Reset e fechar
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar cliente.");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleCancelar} style={{ zIndex: 1040 }} />

            <div className={`modal fade show d-block`} style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-entrada">
                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">Informações do Cliente</h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            {etapa === "pesquisa" && (
                                <>
                                    <label className="form-label fw-semibold">Nome</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="form-control mb-3" placeholder="Maria Oliveira" />
                                    
                                    <label className="form-label fw-semibold">CPF/CNPJ</label>
                                    <input type="text" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} className="form-control mb-3" placeholder="000.000.000-00" />
                                    
                                    <label className="form-label fw-semibold">Email</label>
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control mb-3" placeholder="maria.oliveira@email.com" />
                                    
                                    <label className="form-label fw-semibold">Telefone</label>
                                    <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="form-control mb-3" placeholder="(00) 00000-0000" />
                                    
                                    <label className="form-label fw-semibold">Tipo</label>
                                    <input type="text" name="tipo" value={formData.tipo} onChange={handleChange} className="form-control mb-3" placeholder="Pessoa Física" />
                                    
                                    <button className="btn btn-primary w-100 mb-3" onClick={handleFinalizar}>
                                        Adicionar Novo Cliente
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

export default ModalAdicionar;
