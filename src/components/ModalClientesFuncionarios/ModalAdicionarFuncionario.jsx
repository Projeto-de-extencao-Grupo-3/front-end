import { useState } from "react";
import './ModalAdicionar.css';

function ModalAdicionarFuncionario({ isOpen, onClose, onSave }) {
    const [etapa, setEtapa] = useState("pesquisa");

    const estadoInicial = {
        nome: "",
        cargo: "",
        especialidade: "",
        telefone: "",
        email: "",
        senha: "",
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
        setFormData(estadoInicial);
        onClose();
    };

    const handleFinalizar = async () => {
        try {
            await onSave(formData);
            handleCancelar();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar funcionário.");
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
                            <h2 className="modal-title fw-bold titulo-modal">Informações do Funcionário</h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            <label className="form-label fw-semibold">Nome</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="form-control mb-3" placeholder="Nome Completo" />
                            
                            <label className="form-label fw-semibold">Cargo</label>
                            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="form-control mb-3" placeholder="Ex: Mecânico" />
                            
                            <label className="form-label fw-semibold">Especialidade</label>
                            <input type="text" name="especialidade" value={formData.especialidade} onChange={handleChange} className="form-control mb-3" placeholder="Ex: Suspensão" />
                            
                            <label className="form-label fw-semibold">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control mb-3" placeholder="email@oficina.com" />
                            
                            <label className="form-label fw-semibold">Telefone</label>
                            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="form-control mb-3" placeholder="(00) 00000-0000" />
                            
                            <label className="form-label fw-semibold">Senha</label>
                            <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="form-control mb-3" placeholder="Digite a senha" />
                            
                            <button className="btn btn-primary w-100 mb-3" onClick={handleFinalizar}>
                                Salvar Funcionário
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAdicionarFuncionario;