import { useState, useEffect, useCallback } from "react";
import "./ModalEditar.css";
import api from "../../service/api";

function ModalEditarCliente({ isOpen, onClose, clienteParaEditar, onSave }) {
    const [abaAtiva, setAbaAtiva] = useState("cliente");
    const [dadosEditados, setDadosEditados] = useState(null);
    const [detalhesEndereco, setDetalhesEndereco] = useState(null);

    const buscarEndereco = useCallback(async (id) => {
        try {
            const response = await api.get(`/enderecos/${id}`);
            setDetalhesEndereco(response.data);
        } catch (error) {
            console.error("Erro ao carregar detalhes do endereço:", error);
        }
    }, []);

    useEffect(() => {
        if (clienteParaEditar && isOpen) {
            const timer = setTimeout(() => {
                setDadosEditados({ ...clienteParaEditar });

                const idEnd = clienteParaEditar.id_endereco || clienteParaEditar.fk_endereco;

                if (idEnd && typeof idEnd !== 'object') {
                    buscarEndereco(idEnd);
                } else if (typeof idEnd === 'object') {
                    setDetalhesEndereco(idEnd);
                }
            }, 0);

            return () => clearTimeout(timer); 
        }
    }, [clienteParaEditar, isOpen, buscarEndereco]);

    if (!isOpen || !dadosEditados) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosEditados(prev => ({ ...prev, [name]: value }));
    };

    const handleChangeEndereco = (e) => {
        const { name, value } = e.target;
        setDetalhesEndereco(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const payloadEndereco = {
                id_endereco: detalhesEndereco.id_endereco || detalhesEndereco.idEndereco,
                cep: detalhesEndereco.cep,
                logradouro: detalhesEndereco.logradouro,
                complemento: detalhesEndereco.complemento,
                numero: detalhesEndereco.numero,
                bairro: detalhesEndereco.bairro,
                cidade: detalhesEndereco.cidade,
                estado: detalhesEndereco.estado
            };
            await api.put("/enderecos", payloadEndereco);

            const payloadCliente = {
                id_cliente: dadosEditados.id_cliente || dadosEditados.idCliente,
                nome: dadosEditados.nome,
                cpf_cnpj: dadosEditados.cpf_cnpj || dadosEditados.cpfCnpj,
                telefone: String(dadosEditados.telefone).replace(/\D/g, ''),
                email: dadosEditados.email,
                tipo_cliente: dadosEditados.tipo_cliente || dadosEditados.tipoCliente,
                fk_endereco: payloadEndereco.id_endereco,
                fk_oficina: 1
            };

            await onSave(payloadCliente);
            onClose();
        } catch (error) {
            console.error("Erro na atualização dupla:", error);
            alert("Erro ao salvar alterações.");
        }
    };

    const endereco = detalhesEndereco || {};

    return (
        <div className="modal-overlay">
            <div className="modal-content-custom border-0 p-4" style={{ borderRadius: '12px', maxWidth: '650px' }}>

                <div className="modal-header border-0 p-0 mb-4">
                    <h2 className="fw-medium" style={{ fontSize: '2rem' }}>Edição de Cliente</h2>
                </div>

                <div className="d-flex p-1 mb-4" style={{ backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                    <button
                        className="btn w-100 border-0"
                        style={{
                            backgroundColor: abaAtiva === "cliente" ? "#fff" : "transparent",
                            boxShadow: abaAtiva === "cliente" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                            borderRadius: '6px',
                            fontWeight: '500',
                            color: '#000'
                        }}
                        onClick={() => setAbaAtiva("cliente")}
                    >
                        Dados do Cliente
                    </button>
                    <button
                        className="btn w-100 border-0"
                        style={{
                            backgroundColor: abaAtiva === "endereco" ? "#fff" : "transparent",
                            boxShadow: abaAtiva === "endereco" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                            borderRadius: '6px',
                            fontWeight: '500',
                            color: '#000'
                        }}
                        onClick={() => setAbaAtiva("endereco")}
                    >
                        Dados do Endereço
                    </button>
                </div>

                <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: '#f9f9f9' }}>
                    <div className="d-flex align-items-center mb-4 text-muted">
                        <i className={`bx ${abaAtiva === 'cliente' ? 'bx-user' : 'bx-building-house'} me-2`} style={{ fontSize: '1.3rem' }}></i>
                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                            {abaAtiva === 'cliente' ? "Informações do Cliente" : "Informações do Endereço"}
                        </span>
                    </div>

                    {abaAtiva === "cliente" ? (
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label text-dark">Nome</label>
                                <input type="text" className="form-control bg-light border-0" name="nome" value={dadosEditados.nome || ""} onChange={handleChange} placeholder="Exemplo: Gabriel" />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">CPF/CNPJ</label>
                                <input type="text" className="form-control bg-light border-0" value={dadosEditados.cpfCnpj || dadosEditados.cpf_cnpj || ""} disabled />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">Tipo de Cliente</label>
                                <select className="form-select bg-light border-0" name="tipo_cliente" value={dadosEditados.tipo_cliente || ""} onChange={handleChange}>
                                    <option value="PESSOA_FISICA">PESSOA_FISICA</option>
                                    <option value="PESSOA_JURIDICA">PESSOA_JURIDICA</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark">Email</label>
                                <input type="email" className="form-control bg-light border-0" name="email" value={dadosEditados.email || ""} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark">Telefone</label>
                                <input type="text" className="form-control bg-light border-0" name="telefone" value={dadosEditados.telefone || ""} onChange={handleChange} />
                            </div>
                        </div>
                    ) : (
                        <div className="row g-3">
                            <div className="col-6">
                                <label className="form-label text-dark">CEP*</label>
                                <input type="text" className="form-control bg-light border-0" name="cep" value={endereco.cep || ""} onChange={handleChangeEndereco} placeholder="00000-000" />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">Número*</label>
                                <input type="text" className="form-control bg-light border-0" name="numero" value={endereco.numero || ""} onChange={handleChangeEndereco} placeholder="1010" />
                            </div>
                            <div className="col-8">
                                <label className="form-label text-dark">Logradouro*</label>
                                <input type="text" className="form-control bg-light border-0" name="logradouro" value={endereco.logradouro || ""} onChange={handleChangeEndereco} />
                            </div>
                            <div className="col-4">
                                <label className="form-label text-dark">Bairro*</label>
                                <input type="text" className="form-control bg-light border-0" name="bairro" value={endereco.bairro || ""} onChange={handleChangeEndereco} />
                            </div>
                            <div className="col-8">
                                <label className="form-label text-dark">Cidade*</label>
                                <input type="text" className="form-control bg-light border-0" name="cidade" value={endereco.cidade || ""} onChange={handleChangeEndereco} />
                            </div>
                            <div className="col-4">
                                <label className="form-label text-dark">Estado*</label>
                                <input type="text" className="form-control bg-light border-0" name="estado" value={endereco.estado || ""} onChange={handleChangeEndereco} />
                            </div>
                            <div className="col-12">
                                <label className="form-label text-dark">Complemento*</label>
                                <input type="text" className="form-control bg-light border-0" name="complemento" value={endereco.complemento || ""} onChange={handleChangeEndereco} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="d-flex gap-3">
                    <button
                        className="btn w-100 fw-medium"
                        onClick={handleSave}
                        style={{ backgroundColor: '#5cb85c', color: '#fff', height: '45px' }}
                    >
                        Editar
                    </button>
                    <button
                        className="btn w-100 fw-medium border"
                        onClick={onClose}
                        style={{ backgroundColor: '#fff', color: '#333', height: '45px' }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarCliente;