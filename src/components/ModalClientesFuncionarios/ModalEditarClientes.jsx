import React, { useState, useEffect } from "react";
import "./ModalEditar.css";
import api from "../../service/api";

function ModalEditarCliente({ isOpen, onClose, clienteParaEditar, onSave }) {
    const [abaAtiva, setAbaAtiva] = useState("cliente");
    const [dadosEditados, setDadosEditados] = useState(null);
    const [detalhesEndereco, setDetalhesEndereco] = useState(null);

    useEffect(() => {
        if (clienteParaEditar) {
            setDadosEditados({ ...clienteParaEditar });

            const idEnd = clienteParaEditar.id_endereco || clienteParaEditar.fk_endereco;
            if (idEnd && typeof idEnd !== 'object') {
                buscarEndereco(idEnd);
            } else if (typeof idEnd === 'object') {
                setDetalhesEndereco(idEnd);
            }
        }
    }, [clienteParaEditar]);

    const buscarEndereco = async (id) => {
        try {
            const response = await api.get(`/enderecos/${id}`);
            setDetalhesEndereco(response.data);
        } catch (error) {
            console.error("Erro ao carregar detalhes do endereço:", error);
        }
    };

    if (!isOpen || !dadosEditados) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosEditados(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const payload = {
            id_cliente: dadosEditados.id_cliente || dadosEditados.idCliente,
            nome: dadosEditados.nome,
            cpf_cnpj: dadosEditados.cpf_cnpj || dadosEditados.cpfCnpj,
            telefone: String(dadosEditados.telefone).replace(/\D/g, ''),
            email: dadosEditados.email,
            tipo_cliente: dadosEditados.tipo_cliente || dadosEditados.tipoCliente,
            fk_endereco: dadosEditados.id_endereco || dadosEditados.fkEndereco,
            fk_oficina: 1
        };

        onSave(payload); 
    };

    const endereco = detalhesEndereco || {};

    return (
        <div className="modal-overlay">
            <div className="modal-content-custom">
                <div className="modal-header-custom">
                    <h2>Editar Cliente: {clienteParaEditar.nome}</h2>
                </div>

                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${abaAtiva === "cliente" ? "active fw-bold text-dark" : ""}`}
                            onClick={() => setAbaAtiva("cliente")}
                        >
                            <i className='bx bx-user me-2'></i>Informações
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${abaAtiva === "endereco" ? "active fw-bold text-dark" : ""}`}
                            onClick={() => setAbaAtiva("endereco")}
                        >
                            <i className='bx bx-map me-2'></i>Endereço
                        </button>
                    </li>
                </ul>

                <div className="modal-body-custom">
                    {abaAtiva === "cliente" ? (
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label">Nome Completo</label>
                                <input type="text" className="form-control" name="nome" value={dadosEditados.nome || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF/CNPJ</label>
                                <input type="text" className="form-control" value={dadosEditados.cpfCnpj || dadosEditados.cpf_cnpj || ""} disabled />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Telefone</label>
                                <input type="text" className="form-control" name="telefone" value={dadosEditados.telefone || ""} onChange={handleChange} />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">E-mail</label>
                                <input type="email" className="form-control" name="email" value={dadosEditados.email || ""} onChange={handleChange} />
                            </div>
                        </div>
                    ) : (
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">CEP</label>
                                <input type="text" className="form-control" value={endereco?.cep || "N/A"} disabled />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Logradouro</label>
                                <input type="text" className="form-control" value={endereco?.logradouro || "Não carregado"}  />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Número</label>
                                <input type="text" className="form-control" value={endereco?.numero || ""}  />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Bairro</label>
                                <input type="text" className="form-control" value={endereco?.bairro || ""}  />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Cidade/Estado</label>
                                <input type="text" className="form-control" value={`${endereco?.cidade || ""} - ${endereco?.estado || ""}`}  />
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-footer-custom mt-4 d-flex justify-content-end gap-2">
                    <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                    <button className="btn btn-dark" onClick={handleSave}>Salvar Alterações</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarCliente;