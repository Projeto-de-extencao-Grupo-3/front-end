import { useEffect, useState } from "react";
import "./ModalEditar.css";

const estadoClienteInicial = {
    id_cliente: "",
    nome: "",
    cpf_cnpj: "",
    tipo_cliente: "PESSOA_FISICA",
};

const estadoEnderecoInicial = {
    id_endereco: "",
    cep: "",
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    correspondencia: ""
};

const estadoContatoInicial = {
    id_contato: "",
    telefone: "",
    email: "",
    nome_contato: "",
    departamento_contato: ""
};

function normalizarCliente(cliente = {}) {
    return {
        ...estadoClienteInicial,
        ...cliente,
        id_cliente: cliente.id_cliente ?? cliente.idCliente ?? "",
        cpf_cnpj: cliente.cpf_cnpj ?? cliente.cpfCnpj ?? "",
        tipo_cliente: cliente.tipo_cliente ?? cliente.tipoCliente ?? "PESSOA_FISICA",
    };
}

function normalizarEndereco(endereco = {}) {
    return {
        ...estadoEnderecoInicial,
        ...endereco,
        id_endereco: endereco.id_endereco ?? endereco.idEndereco ?? "",
        correspondencia: endereco.correspondencia
    };
}

function normalizarContato(contato = {}) {
    return {
        ...estadoContatoInicial,
        ...contato,
    };
}

function ModalEditarCliente({
    isOpen,
    onClose,
    clienteParaEditar,
    onSave,
    onSaveEndereco,
    onSaveContato,
}) {
    const [abaAtiva, setAbaAtiva] = useState("cliente");
    const [clienteEditado, setClienteEditado] = useState(estadoClienteInicial);
    const [listaEnderecos, setListaEnderecos] = useState([]);
    const [listaContatos, setListaContatos] = useState([]);
    const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState("");
    const [contatoSelecionadoId, setContatoSelecionadoId] = useState("");
    const [modoEndereco, setModoEndereco] = useState("lista");
    const [modoContato, setModoContato] = useState("lista");
    const [formEndereco, setFormEndereco] = useState(estadoEnderecoInicial);
    const [formContato, setFormContato] = useState(estadoContatoInicial);

    useEffect(() => {
        if (!isOpen || !clienteParaEditar) {
            return;
        }

        const clienteNormalizado = normalizarCliente(clienteParaEditar);
        const enderecosNormalizados = Array.isArray(clienteParaEditar.enderecos)
            ? clienteParaEditar.enderecos.map(normalizarEndereco)
            : [];
        const contatosNormalizados = Array.isArray(clienteParaEditar.meios_contato)
            ? clienteParaEditar.meios_contato.map(normalizarContato)
            : Array.isArray(clienteParaEditar.contatos)
                ? clienteParaEditar.contatos.map(normalizarContato)
                : [];

        setClienteEditado(clienteNormalizado);
        setListaEnderecos(enderecosNormalizados);
        setListaContatos(contatosNormalizados);
        setAbaAtiva("cliente");
        setEnderecoSelecionadoId(enderecosNormalizados[0]?.id_endereco ?? "");
        setContatoSelecionadoId(contatosNormalizados[0]?.id_contato ?? "");
        setModoEndereco("lista");
        setModoContato("lista");
        setFormEndereco(enderecosNormalizados[0] ?? estadoEnderecoInicial);
        setFormContato(contatosNormalizados[0] ?? estadoContatoInicial);
    }, [clienteParaEditar, isOpen]);

    if (!isOpen || !clienteParaEditar) return null;

    const handleChangeCliente = (e) => {
        const { name, value } = e.target;
        setClienteEditado((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEndereco = (e) => {
        const { name, value } = e.target;
        setFormEndereco((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeContato = (e) => {
        const { name, value, type, checked } = e.target;
        setFormContato((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const abrirNovoEndereco = () => {
        setModoEndereco("novo");
        setEnderecoSelecionadoId("");
        setFormEndereco({ ...estadoEnderecoInicial });
    };

    const selecionarEndereco = (endereco) => {
        const normalizado = normalizarEndereco(endereco);
        console.log(normalizado)
        setModoEndereco("editar");
        setEnderecoSelecionadoId(normalizado.id_endereco);
        setFormEndereco(normalizado);
    };

    const abrirNovoContato = () => {
        setModoContato("novo");
        setContatoSelecionadoId("");
        setFormContato({ ...estadoContatoInicial });
    };

    const selecionarContato = (contato) => {
        const normalizado = normalizarContato(contato);
        setModoContato("editar");
        setContatoSelecionadoId(normalizado.id_contato);
        console.log(normalizado)
        setFormContato(normalizado);
    };

    const salvarCliente = async () => {
        if (typeof onSave !== "function") return;

        const payloadCliente = {
            ...clienteEditado,
            id_cliente: clienteEditado.id_cliente,
            nome: clienteEditado.nome,
            cpf_cnpj: clienteEditado.cpf_cnpj,
            tipo_cliente: clienteEditado.tipo_cliente,
        };

        await onSave(payloadCliente);
    };

    const salvarEndereco = async () => {
        if (typeof onSaveEndereco !== "function") return;

        await onSaveEndereco(formEndereco);
    };

    const salvarContato = async () => {
        if (typeof onSaveContato !== "function") return;

        console.log(formContato)

        const payloadContato = {
            id_cliente: clienteEditado.id_cliente,
            contato: {
                id_contato: formContato.id_contato,
                tipo_contato: formContato.tipo_contato,
                valor: formContato.valor,
            }
        };
        await onSaveContato(payloadContato);
    };

    const tituloAba =
        abaAtiva === "cliente"
            ? "Informações do Cliente"
            : abaAtiva === "endereco"
                ? "Informações dos Endereços"
                : "Informações de Contato";

    const subtituloAba =
        abaAtiva === "cliente"
            ? "Atualize apenas os dados gerais do cliente"
            : abaAtiva === "endereco"
                ? "Selecione um endereço para editar ou crie um novo"
                : "Selecione um contato para editar ou crie um novo";

    return (
        <div className="modal-overlay">
            <div
                className="modal-content-custom border-0 p-4"
                style={{ borderRadius: "12px", maxWidth: "1024px", width: "92vw" }}
            >
                <div className="modal-header border-0 p-0 mb-4">
                    <h2 className="fw-medium" style={{ fontSize: "2rem" }}>
                        Edição de Cliente
                    </h2>
                </div>

                <div className="d-flex p-1 mb-4" style={{ backgroundColor: "#e9ecef", borderRadius: "8px" }}>
                    <button
                        className="btn w-100 border-0"
                        style={{
                            backgroundColor: abaAtiva === "cliente" ? "#fff" : "transparent",
                            boxShadow: abaAtiva === "cliente" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "6px",
                            fontWeight: "500",
                            color: "#000",
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
                            borderRadius: "6px",
                            fontWeight: "500",
                            color: "#000",
                        }}
                        onClick={() => setAbaAtiva("endereco")}
                    >
                        Endereços
                    </button>
                    <button
                        className="btn w-100 border-0"
                        style={{
                            backgroundColor: abaAtiva === "contato" ? "#fff" : "transparent",
                            boxShadow: abaAtiva === "contato" ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                            borderRadius: "6px",
                            fontWeight: "500",
                            color: "#000",
                        }}
                        onClick={() => setAbaAtiva("contato")}
                    >
                        Contatos
                    </button>
                </div>

                <div className="p-4 border rounded-3 mb-4" style={{ backgroundColor: "#f9f9f9" }}>
                    <div className="d-flex align-items-center mb-2 text-muted">
                        <i
                            className={`bx ${abaAtiva === "cliente"
                                ? "bx-user"
                                : abaAtiva === "endereco"
                                    ? "bx-building-house"
                                    : "bx-phone"
                                } me-2`}
                            style={{ fontSize: "1.3rem" }}
                        ></i>
                        <div>
                            <div style={{ fontSize: "1.1rem", fontWeight: "500" }}>{tituloAba}</div>
                            <small className="text-muted">{subtituloAba}</small>
                        </div>
                    </div>

                    {abaAtiva === "cliente" ? (
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label text-dark">Nome</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    name="nome"
                                    value={clienteEditado.nome || ""}
                                    onChange={handleChangeCliente}
                                    placeholder="Exemplo: Gabriel"
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">CPF/CNPJ</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    name="cpf_cnpj"
                                    value={clienteEditado.cpf_cnpj || ""}
                                    onChange={handleChangeCliente}
                                    placeholder="Somente leitura opcional"
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">Tipo de Cliente</label>
                                <select
                                    className="form-select bg-light border-0"
                                    name="tipo_cliente"
                                    value={clienteEditado.tipo_cliente || "PESSOA_FISICA"}
                                    onChange={handleChangeCliente}
                                >
                                    <option value="PESSOA_FISICA">PESSOA_FISICA</option>
                                    <option value="PESSOA_JURIDICA">PESSOA_JURIDICA</option>
                                </select>
                            </div>

                            <div className="col-12 d-flex justify-content-end pt-2">
                                <button
                                    className="btn fw-medium"
                                    onClick={salvarCliente}
                                    style={{ backgroundColor: "#5cb85c", color: "#fff", minWidth: "180px" }}
                                >
                                    Salvar Cliente
                                </button>
                            </div>
                        </div>
                    ) : abaAtiva === "endereco" ? (
                        <div className="row g-4">
                            <div className="col-12 col-lg-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <strong>Lista de endereços</strong>
                                    <button className="btn btn-sm btn-outline-dark" onClick={abrirNovoEndereco}>
                                        + Adicionar
                                    </button>
                                </div>

                                <div className="d-grid gap-2">
                                    {listaEnderecos.length > 0 ? (
                                        listaEnderecos.map((endereco) => {
                                            const ativo = String(endereco.id_endereco) === String(enderecoSelecionadoId);

                                            return (
                                                <button
                                                    key={endereco.id_endereco || `${endereco.logradouro}-${endereco.numero}`}
                                                    className={`btn text-start ${ativo ? "btn-primary" : "btn-outline-secondary"}`}
                                                    onClick={() => selecionarEndereco(endereco)}
                                                >
                                                    <div className="fw-medium">{endereco.logradouro || "Endereço sem logradouro"}</div>
                                                    <small>
                                                        {endereco.numero || "S/N"} - {endereco.cidade || "Cidade"}/{endereco.estado || "UF"}
                                                    </small>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="border rounded-3 p-3 bg-white text-muted">
                                            Nenhum endereço vinculado. Use o botão de adicionar para criar o primeiro.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-lg-8">
                                <div className="border rounded-3 p-3 bg-white h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <strong>
                                            {modoEndereco === "novo"
                                                ? "Novo endereço"
                                                : "Editar endereço selecionado"}
                                        </strong>
                                        <span className="badge text-bg-light border text-uppercase">{modoEndereco}</span>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-6">
                                            <label className="form-label text-dark">CEP*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="cep"
                                                value={formEndereco.cep || ""}
                                                onChange={handleChangeEndereco}
                                                placeholder="00000-000"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label text-dark">Número*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="numero"
                                                value={formEndereco.numero || ""}
                                                onChange={handleChangeEndereco}
                                                placeholder="1010"
                                            />
                                        </div>
                                        <div className="col-8">
                                            <label className="form-label text-dark">Logradouro*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="logradouro"
                                                value={formEndereco.logradouro || ""}
                                                onChange={handleChangeEndereco}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label className="form-label text-dark">Bairro*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="bairro"
                                                value={formEndereco.bairro || ""}
                                                onChange={handleChangeEndereco}
                                            />
                                        </div>
                                        <div className="col-8">
                                            <label className="form-label text-dark">Cidade*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="cidade"
                                                value={formEndereco.cidade || ""}
                                                onChange={handleChangeEndereco}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label className="form-label text-dark">Estado*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="estado"
                                                value={formEndereco.estado || ""}
                                                onChange={handleChangeEndereco}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark">Complemento</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="complemento"
                                                value={formEndereco.complemento || ""}
                                                onChange={handleChangeEndereco}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="enderecoCorrespondencia"
                                                    name="correspondencia"
                                                    checked={Boolean(formEndereco.correspondencia)}
                                                    onChange={handleChangeEndereco}
                                                />
                                                <label className="form-check-label" htmlFor="enderecoCorrespondencia">
                                                    Endereço de correspondência
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mt-4">
                                        <button
                                            className="btn w-100 fw-medium"
                                            onClick={salvarEndereco}
                                            style={{ backgroundColor: "#5cb85c", color: "#fff", height: "45px" }}
                                        >
                                            Salvar Endereço
                                        </button>
                                        <button
                                            className="btn w-100 fw-medium border"
                                            onClick={abrirNovoEndereco}
                                            style={{ backgroundColor: "#fff", color: "#333", height: "45px" }}
                                        >
                                            Limpar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            <div className="col-12 col-lg-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <strong>Lista de contatos</strong>
                                    <button className="btn btn-sm btn-outline-dark" onClick={abrirNovoContato}>
                                        + Adicionar
                                    </button>
                                </div>

                                <div className="d-grid gap-2">
                                    {listaContatos.length > 0 ? (
                                        listaContatos.map((contato) => {
                                            const ativo = String(contato.id_contato) === String(contatoSelecionadoId);

                                            return (
                                                <button
                                                    key={contato.id_contato || `${contato.tipo_contato}-${contato.valor}`}
                                                    className={`btn text-start ${ativo ? "btn-primary" : "btn-outline-secondary"}`}
                                                    onClick={() => selecionarContato(contato)}
                                                >
                                                    <div className="fw-medium">{contato.tipo_contato || "Contato"}</div>
                                                    <small>{contato.valor || "Sem valor informado"}</small>
                                                </button>
                                            );
                                        })
                                    ) : (
                                        <div className="border rounded-3 p-3 bg-white text-muted">
                                            Nenhum contato vinculado. Use o botão de adicionar para criar o primeiro.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12 col-lg-8">
                                <div className="border rounded-3 p-3 bg-white h-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <strong>
                                            {modoContato === "novo"
                                                ? "Novo contato"
                                                : "Editar contato selecionado"}
                                        </strong>
                                        <span className="badge text-bg-light border text-uppercase">{modoContato}</span>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label text-dark">Telefone*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="descricao"
                                                value={formContato.telefone || ""}
                                                onChange={handleChangeContato}
                                                placeholder="Ex.: contato financeiro"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark">Email*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="valor"
                                                value={formContato.email || ""}
                                                onChange={handleChangeContato}
                                                placeholder="(11) 99999-9999 ou email@dominio.com"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label text-dark">Nome do Contato</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="nome_contato"
                                                value={formContato.nome_contato || ""}
                                                onChange={handleChangeContato}
                                                placeholder="Ex.: contato financeiro"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label text-dark">Departamento</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="departamento"
                                                value={formContato.departamento_contato || ""}
                                                onChange={handleChangeContato}
                                                placeholder="Ex.: contato financeiro"
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mt-4">
                                        <button
                                            className="btn w-100 fw-medium"
                                            onClick={salvarContato}
                                            style={{ backgroundColor: "#5cb85c", color: "#fff", height: "45px" }}
                                        >
                                            Salvar Contato
                                        </button>
                                        <button
                                            className="btn w-100 fw-medium border"
                                            onClick={abrirNovoContato}
                                            style={{ backgroundColor: "#fff", color: "#333", height: "45px" }}
                                        >
                                            Limpar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="d-flex gap-3">
                    <button
                        className="btn w-100 fw-medium border"
                        onClick={onClose}
                        style={{ backgroundColor: "#fff", color: "#333", height: "45px" }}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarCliente;