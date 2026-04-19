import { useState } from "react";
import { exibirAlertaErro } from "../../service/alertas";

const contatoInicial = {
    telefone: "",
    email: "",
    nome_contato: "",
    departamento_contato: "",
};

function ModalAdicionarContatos({ isOpen, onClose, onSaveContatos }) {
    const [contatoAtual, setContatoAtual] = useState(contatoInicial);
    const [contatos, setContatos] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContatoAtual((prev) => ({ ...prev, [name]: value }));
    };

    const limparContatoAtual = () => {
        setContatoAtual(contatoInicial);
    };

    const adicionarContatoNaLista = () => {
        if (!contatoAtual.telefone?.trim() || !contatoAtual.email?.trim()) {
            exibirAlertaErro("Preencha Telefone e Email para adicionar o contato.");
            return false;
        }

        setContatos((prev) => [...prev, { ...contatoAtual }]);
        limparContatoAtual();
        return true;
    };

    const removerContato = (index) => {
        setContatos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFinalizar = async () => {
        const contatoTemValor = Object.values(contatoAtual).some((valor) => String(valor).trim() !== "");
        let contatosParaSalvar = contatos;

        if (contatoTemValor) {
            if (!contatoAtual.telefone?.trim() || !contatoAtual.email?.trim()) {
                exibirAlertaErro("Preencha Telefone e Email para adicionar o contato.");
                return;
            }

            // Evita depender da atualização assíncrona do estado antes do envio final.
            contatosParaSalvar = [...contatos, { ...contatoAtual }];
        }

        await onSaveContatos(contatosParaSalvar);
        setContatos([]);
        limparContatoAtual();
        onClose();
    };

    const handleCancelar = () => {
        setContatos([]);
        limparContatoAtual();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" onClick={handleCancelar} style={{ zIndex: 1040 }} />
            <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 p-3" style={{ borderRadius: "12px" }}>
                        <div className="modal-header border-0 pb-0">
                            <h2 className="fw-medium" style={{ fontSize: "1.75rem", color: "#000" }}>
                                Informações de Contato
                            </h2>
                        </div>

                        <div className="modal-body">
                            <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: "#f8f9fa" }}>
                                <div className="d-flex align-items-center mb-3 text-muted">
                                    <i className="bx bx-phone me-2" style={{ fontSize: "1.2rem" }}></i>
                                    <span style={{ fontSize: "0.95rem" }}>Adicione quantos contatos desejar</span>
                                </div>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Telefone*</label>
                                        <input
                                            type="text"
                                            name="telefone"
                                            value={contatoAtual.telefone}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="(11) 99999-9999"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label mb-1 text-dark fw-normal">Email*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={contatoAtual.email}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                            placeholder="contato@empresa.com"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Nome do Contato</label>
                                        <input
                                            type="text"
                                            name="nome_contato"
                                            value={contatoAtual.nome_contato}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label mb-1 text-dark fw-normal">Departamento</label>
                                        <input
                                            type="text"
                                            name="departamento_contato"
                                            value={contatoAtual.departamento_contato}
                                            onChange={handleChange}
                                            className="form-control bg-light border-0"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark w-100"
                                            onClick={adicionarContatoNaLista}
                                        >
                                            + Adicionar contato na lista
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {contatos.length > 0 && (
                                <div className="p-3 border rounded-3 mb-4" style={{ backgroundColor: "#fff" }}>
                                    <div className="fw-medium mb-2">Contatos adicionados</div>
                                    <div className="d-grid gap-2">
                                        {contatos.map((contato, index) => (
                                            <div key={`${contato.email}-${index}`} className="d-flex justify-content-between align-items-center border rounded p-2">
                                                <small>
                                                    {contato.telefone} | {contato.email}
                                                </small>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removerContato(index)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="d-flex gap-3">
                                <button
                                    className="btn w-100 fw-medium"
                                    onClick={handleFinalizar}
                                    style={{ backgroundColor: "#5cb85c", color: "#fff", padding: "10px 0" }}
                                >
                                    Finalizar Cadastro
                                </button>
                                <button
                                    className="btn w-100 fw-medium border"
                                    onClick={handleCancelar}
                                    style={{ backgroundColor: "#fff", color: "#333", padding: "10px 0" }}
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

export default ModalAdicionarContatos;
