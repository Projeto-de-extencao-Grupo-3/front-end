import { useState, useEffect } from "react";
import './ModalAdicionar.css';
import { exibirAlertaErro } from "../../service/alertas";

const estadoInicial = {
    nome: "",
    cargo: "",
    especialidade: "",
    telefone: "",
    email: "",
    senha: "",
};

function ModalAdicionarFuncionario({ isOpen, onClose, onSave, funcionarioParaEditar }) {
    const [formData, setFormData] = useState(() => funcionarioParaEditar || estadoInicial);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setFormData(funcionarioParaEditar || estadoInicial);
            }, 0);
        }
    }, [isOpen, funcionarioParaEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Máscara e validação em tempo real para o Telefone
        if (name === "telefone") {
            // Remove tudo que não for número (impede letras e símbolos soltos)
            const apenasNumeros = value.replace(/\D/g, "");
            let telefoneFormatado = "";

            if (apenasNumeros.length > 0) {
                if (apenasNumeros.length <= 2) {
                    // Se digitou só o DDD (1 ou 2 números)
                    telefoneFormatado = `(${apenasNumeros}`;
                } else {
                    // Se já tem mais que o DDD, separa o DDD do resto
                    telefoneFormatado = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
                }
            }

            setFormData(prev => ({ ...prev, [name]: telefoneFormatado }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCancelar = () => {
        setFormData(estadoInicial);
        onClose();
    };

    const handleFinalizar = async () => {
        // 1. Validação de campos vazios
        const camposVazios = [];
        
        if (!formData.nome?.trim()) camposVazios.push("Nome Completo");
        if (!formData.cargo?.trim()) camposVazios.push("Cargo");
        if (!formData.especialidade?.trim()) camposVazios.push("Especialidade");
        if (!formData.email?.trim()) camposVazios.push("Email");
        if (!formData.telefone?.trim()) camposVazios.push("Telefone");
        if (!formData.senha?.trim()) camposVazios.push("Senha");

        if (camposVazios.length > 0) {
            exibirAlertaErro(`Preencha os campos obrigatórios: ${camposVazios.join(", ")}.`);
            return; 
        }

        // 2. Validação básica para garantir que o telefone tem pelo menos o DDD e um número
        const telefoneLimpo = formData.telefone.replace(/\D/g, "");
        if (telefoneLimpo.length <= 2) {
            exibirAlertaErro("O telefone informado está muito curto. Insira o DDD e o número.");
            return;
        }

        // 3. Validação de formato de E-mail
        const email = formData.email || "";
        if (!email.includes("@") || !email.includes(".")) {
            exibirAlertaErro("O e-mail informado é inválido. Certifique-se de conter '@' e '.'.");
            return;
        }

        // Se passar nas validações, tenta salvar
        try {
            const id = formData.idFuncionario || formData.id_funcionario;
            await onSave(formData, id);
            handleCancelar();
        } catch (error) {
            console.error("Erro ao salvar:", error);
            exibirAlertaErro("Erro ao salvar funcionário.");
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
                                {funcionarioParaEditar ? "Editar Funcionário" : "Adicionar novo Funcionário"}
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex align-items-center mb-3 text-muted">
                                    <i className='bx bx-briefcase me-2' style={{ fontSize: '1.2rem' }}></i>
                                    <span style={{ fontSize: '0.95rem' }}>Dados profissionais e contato</span>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Nome Completo*</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: João Silva"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Cargo*</label>
                                        <input
                                            type="text"
                                            name="cargo"
                                            value={formData.cargo || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: Mecânico"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Especialidade*</label>
                                        <input
                                            type="text"
                                            name="especialidade"
                                            value={formData.especialidade || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="Ex: Motores"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Email*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="email@oficina.com"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Telefone*</label>
                                        <input
                                            type="text"
                                            name="telefone"
                                            value={formData.telefone || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="(00) 00000000"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Senha*</label>
                                        <input
                                            type="password"
                                            name="senha"
                                            value={formData.senha || ""}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="********"
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

export default ModalAdicionarFuncionario;