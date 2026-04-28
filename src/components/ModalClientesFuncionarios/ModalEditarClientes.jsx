import { useEffect, useState } from "react";
import "./ModalEditar.css";
import { exibirAlertaErro } from "../../service/alertas";
import Enderecos from "../../service/Endereco";

const estadoClienteInicial = {
    id_cliente: "",
    nome: "",
    cpf_cnpj: "",
    inscricao_estadual: "",
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
    console.log("Normalizando cliente:", cliente);

    return {
        ...estadoClienteInicial,
        ...cliente,
        id_cliente: cliente.id_cliente ?? "",
        cpf_cnpj: cliente.cpf_cnpj ?? cliente.cpfCnpj ?? "",
        inscricao_estadual: cliente.inscricao_estadual ?? cliente.inscricaoEstadual ?? "",
        tipo_cliente: cliente.tipo_cliente ?? cliente.tipoCliente ?? "PESSOA_FISICA",
    };
}

function normalizarEndereco(endereco = {}) {
    return {
        ...estadoEnderecoInicial,
        ...endereco,
        id_endereco: endereco.id_endereco ?? endereco.idEndereco ?? "",
        correspondencia: Boolean(endereco.correspondencia)
    };
}

function normalizarContato(contato = {}) {
    return {
        ...estadoContatoInicial,
        ...contato,
    };
}

function somenteNumeros(valor = "") {
    return String(valor).replace(/\D/g, "");
}

function possuiValor(valor) {
    if (valor === null || valor === undefined) return false;
    return String(valor).trim() !== "";
}

function formatarCpfOuCnpj(valor = "", isPessoaJuridica = false) {
    const digitos = somenteNumeros(valor);

    if (isPessoaJuridica) {
        const cnpj = digitos.slice(0, 14);

        return cnpj
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    const cpf = digitos.slice(0, 11);

    return cpf
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function ModalEditarCliente({
    isOpen,
    onClose,
    clienteParaEditar,
    onSave,
    onSaveEndereco,
    onSaveContato,
    onDeleteEndereco,
    onDeleteContato,
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

    const { buscarEnderecoViaCEP } = Enderecos();

    const handleCEPChange = async (e) => {
        const valor = e.target.value;

        setFormEndereco((prev) => ({ ...prev, cep: valor }));

        const cepLimpo = valor.replace(/\D/g, "");

        if (cepLimpo.length === 8) {
            try {
                const dados = await buscarEnderecoViaCEP(cepLimpo);
                const endereco = dados?.data ?? dados;

                console.log("Endereço encontrado:", endereco);

                if (endereco && !endereco.erro) {
                    setFormEndereco((prev) => ({
                        ...prev,
                        logradouro: endereco.logradouro || prev.logradouro,
                        bairro: endereco.bairro || prev.bairro,
                        cidade: endereco.cidade || endereco.localidade || prev.cidade,
                        estado: endereco.estado || endereco.uf || prev.estado,
                    }));
                }
            } catch (error) {
                exibirAlertaErro("Erro ao buscar CEP.");
            }
        }
    };

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

        setTimeout(() => {
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
        }, 0);

    }, [clienteParaEditar, isOpen]);

    if (!isOpen || !clienteParaEditar) return null;

    const handleChangeCliente = (e) => {
        const { name, value } = e.target;

        if (name === "cpf_cnpj") {
            const isPessoaJuridica = clienteEditado.tipo_cliente === "PESSOA_JURIDICA";
            const valorFormatado = formatarCpfOuCnpj(value, isPessoaJuridica);

            setClienteEditado((prev) => ({ ...prev, [name]: valorFormatado }));
            return;
        }

        setClienteEditado((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeEndereco = (e) => {
        const { name, value, type, checked } = e.target;
        setFormEndereco((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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
        setFormContato(normalizado);
    };

    const salvarCliente = async () => {
        if (typeof onSave !== "function") return;

        const payloadCliente = {
            ...clienteEditado,
            operacao: modoEndereco,
            id_cliente: clienteEditado.id_cliente,
            nome: clienteEditado.nome,
            cpf_cnpj: somenteNumeros(clienteEditado.cpf_cnpj),
            inscricao_estadual: clienteEditado.inscricao_estadual,
            tipo_cliente: clienteEditado.tipo_cliente,
        };

        await onSave(payloadCliente);
    };

    const salvarEndereco = async () => {
        if (typeof onSaveEndereco !== "function") return;

        const camposObrigatoriosEndereco = [
            { label: "CEP", value: formEndereco.cep },
            { label: "Numero", value: formEndereco.numero },
            { label: "Logradouro", value: formEndereco.logradouro },
            { label: "Bairro", value: formEndereco.bairro },
            { label: "Cidade", value: formEndereco.cidade },
            { label: "Estado", value: formEndereco.estado },
        ];

        const camposFaltantes = camposObrigatoriosEndereco
            .filter((campo) => !possuiValor(campo.value))
            .map((campo) => campo.label);

        if (camposFaltantes.length > 0) {
            exibirAlertaErro(`Preencha os campos obrigatorios do endereco: ${camposFaltantes.join(", ")}.`);
            return;
        }

        const operacao = modoEndereco === "novo" ? "novo" : "editar";

        const payloadEndereco = {
            operacao,
            id_cliente: clienteEditado.id_cliente,
            id_endereco: formEndereco.id_endereco,
            endereco: {
                cep: formEndereco.cep,
                logradouro: formEndereco.logradouro,
                complemento: formEndereco.complemento,
                numero: formEndereco.numero,
                bairro: formEndereco.bairro,
                cidade: formEndereco.cidade,
                estado: formEndereco.estado,
                correspondencia: Boolean(formEndereco.correspondencia)
            }
        };

        const retorno = await onSaveEndereco(payloadEndereco);

        if (!retorno) {
            return;
        }

        const enderecoPersistido = normalizarEndereco(
            retorno?.endereco ?? retorno
        );

        if (operacao === "novo") {
            setListaEnderecos((prev) => [...prev, enderecoPersistido]);
        } else {
            setListaEnderecos((prev) =>
                prev.map((item) =>
                    String(item.id_endereco) === String(payloadEndereco.id_endereco)
                        ? { ...item, ...enderecoPersistido }
                        : item
                )
            );
        }

        const idSelecionado =
            enderecoPersistido.id_endereco ?? payloadEndereco.id_endereco ?? "";

        setEnderecoSelecionadoId(idSelecionado);
        setFormEndereco({ ...estadoEnderecoInicial, ...enderecoPersistido });
        setModoEndereco("editar");
    };

    const salvarContato = async () => {
        if (typeof onSaveContato !== "function") return;

        const camposObrigatoriosContato = [
            { label: "Telefone", value: formContato.telefone },
            { label: "Email", value: formContato.email },
        ];

        const camposFaltantes = camposObrigatoriosContato
            .filter((campo) => !possuiValor(campo.value))
            .map((campo) => campo.label);

        if (camposFaltantes.length > 0) {
            exibirAlertaErro(`Preencha os campos obrigatorios do contato: ${camposFaltantes.join(", ")}.`);
            return;
        }

        const operacao = modoContato === "novo" ? "novo" : "editar";

        const payloadContato = {
            operacao,
            id_cliente: clienteEditado.id_cliente,
            contato: {
                id_contato: formContato.id_contato,
                telefone: formContato.telefone,
                email: formContato.email,
                nome_contato: formContato.nome_contato,
                departamento_contato: formContato.departamento_contato
            }
        };

        const retorno = await onSaveContato(payloadContato);

        if (!retorno) {
            return;
        }

        const contatoPersistido = normalizarContato(
            retorno?.contato ?? retorno
        );

        if (operacao === "novo") {
            setListaContatos((prev) => [...prev, contatoPersistido]);
        } else {
            setListaContatos((prev) =>
                prev.map((item) =>
                    String(item.id_contato) === String(payloadContato.contato.id_contato)
                        ? { ...item, ...contatoPersistido }
                        : item
                )
            );
        }

        const idSelecionado =
            contatoPersistido.id_contato ?? payloadContato.contato.id_contato ?? "";

        setContatoSelecionadoId(idSelecionado);
        setFormContato({ ...estadoContatoInicial, ...contatoPersistido });
        setModoContato("editar");
    };

    const excluirEnderecoItem = async (idEndereco) => {
        if (typeof onDeleteEndereco !== "function") return;

        const excluiu = await onDeleteEndereco({
            idCliente: clienteEditado.id_cliente,
            idEndereco,
        });

        if (!excluiu) return;

        const listaAtualizada = listaEnderecos.filter(
            (item) => String(item.id_endereco) !== String(idEndereco)
        );

        setListaEnderecos(listaAtualizada);

        const proximoEndereco = listaAtualizada[0] ?? null;
        setEnderecoSelecionadoId(proximoEndereco?.id_endereco ?? "");
        setFormEndereco(proximoEndereco ?? estadoEnderecoInicial);
        setModoEndereco(proximoEndereco ? "editar" : "lista");
    };

    const excluirContatoItem = async (idContato) => {
        if (typeof onDeleteContato !== "function") return;

        const excluiu = await onDeleteContato({
            idCliente: clienteEditado.id_cliente,
            idContato,
        });

        if (!excluiu) return;

        const listaAtualizada = listaContatos.filter(
            (item) => String(item.id_contato) !== String(idContato)
        );

        setListaContatos(listaAtualizada);

        const proximoContato = listaAtualizada[0] ?? null;
        setContatoSelecionadoId(proximoContato?.id_contato ?? "");
        setFormContato(proximoContato ?? estadoContatoInicial);
        setModoContato(proximoContato ? "editar" : "lista");
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

    const isPessoaJuridica = clienteEditado.tipo_cliente === "PESSOA_JURIDICA";

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
                                <label className="form-label text-dark">
                                    {isPessoaJuridica ? "Razão Social" : "Nome"}
                                </label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    name="nome"
                                    value={clienteEditado.nome || ""}
                                    onChange={handleChangeCliente}
                                    placeholder={isPessoaJuridica ? "Exemplo: Oficina ABC LTDA" : "Exemplo: Gabriel"}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">{isPessoaJuridica ? "CNPJ" : "CPF"}</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    name="cpf_cnpj"
                                    value={formatarCpfOuCnpj(clienteEditado.cpf_cnpj, isPessoaJuridica)}
                                    onChange={handleChangeCliente}
                                    placeholder={isPessoaJuridica ? "00.000.000/0000-00" : "000.000.000-00"}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label text-dark">Tipo de Cliente</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    name="tipo_cliente"
                                    value={clienteEditado.tipo_cliente || "PESSOA_FISICA"}
                                    disabled
                                />
                            </div>

                            {isPessoaJuridica && (
                                <div className="col-12">
                                    <label className="form-label text-dark">Inscrição Estadual</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        name="inscricao_estadual"
                                        value={clienteEditado.inscricao_estadual || ""}
                                        onChange={handleChangeCliente}
                                        placeholder="Exemplo: 123.456.789.000"
                                    />
                                </div>
                            )}

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
                                                <div
                                                    key={endereco.id_endereco || `${endereco.logradouro}-${endereco.numero}`}
                                                    className="d-flex gap-2"
                                                >
                                                    <button
                                                        className={`btn text-start flex-grow-1 ${ativo ? "btn-primary" : "btn-outline-secondary"}`}
                                                        onClick={() => selecionarEndereco(endereco)}
                                                    >
                                                        <div className="fw-medium">{endereco.logradouro || "Endereço sem logradouro"}</div>
                                                        <small>
                                                            {endereco.numero || "S/N"} - {endereco.cidade || "Cidade"}/{endereco.estado || "UF"}
                                                        </small>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger px-2"
                                                        title="Excluir endereço"
                                                        aria-label="Excluir endereço"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            excluirEnderecoItem(endereco.id_endereco);
                                                        }}
                                                    >
                                                        <i className="bx bx-trash"></i>
                                                    </button>
                                                </div>
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
                                                onChange={handleCEPChange}
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
                                                <div
                                                    key={contato.id_contato || `${contato.telefone}-${contato.email}`}
                                                    className="d-flex gap-2"
                                                >
                                                    <button
                                                        className={`btn text-start flex-grow-1 ${ativo ? "btn-primary" : "btn-outline-secondary"}`}
                                                        onClick={() => selecionarContato(contato)}
                                                    >
                                                        <div className="fw-medium">
                                                            {contato.nome_contato || "Contato"}
                                                        </div>
                                                        <small>
                                                            {contato.telefone || "Sem telefone"}
                                                            {contato.email ? ` | ${contato.email}` : ""}
                                                        </small>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger px-2"
                                                        title="Excluir contato"
                                                        aria-label="Excluir contato"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            excluirContatoItem(contato.id_contato);
                                                        }}
                                                    >
                                                        <i className="bx bx-trash"></i>
                                                    </button>
                                                </div>
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
                                                name="telefone"
                                                value={formContato.telefone || ""}
                                                onChange={handleChangeContato}
                                                placeholder="(11) 99999-9999"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label text-dark">Email*</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                name="email"
                                                value={formContato.email || ""}
                                                onChange={handleChangeContato}
                                                placeholder="contato@empresa.com"
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
                                                name="departamento_contato"
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