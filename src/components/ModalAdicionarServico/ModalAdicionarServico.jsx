import { useState, useEffect } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarServico.css";

// Adicionamos as props 'modo' (padrão é "adicionar") e 'servico' (dados para visualização)
function ModalAdicionarServico({ isOpen, onClose, placa, modo = "adicionar", servico, onSave, salvarNaOrdem }) {
    const [aba, setAba] = useState("FUNILARIA");

    const [formData, setFormData] = useState({
        fk_ordem_servico: salvarNaOrdem,
        preco_cobrado: "",
        parte_veiculo: "",
        lado_veiculo: "",
        cor: "",
        especificacao_servico: "",
        observacoes_item: "Nenhuma"
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                tipo_servico: aba
            }));
        }, 0);

        return () => clearTimeout(timer);
    }, [aba]);

    if (!isOpen) return null;

    // Define qual aba/tipo de serviço está ativo. 
    // Se for visualizar, pega do objeto. Se for adicionar, pega do state clicado.
    const tipoAba = modo === "visualizar" && servico
        ? servico.tipo?.toLowerCase()
        : aba;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFinalizar = async () => {
        try {

            const dados = {
                ...formData,
                tipo_servico: tipoAba,
                placa: placa
            };

            await onSave(dados);

            onClose();

        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">

                        {/* HEADER: Aparece SOMENTE no modo adicionar */}
                        {modo === "adicionar" && (
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title titulo-modal">
                                    Adicionar Serviço
                                </h5>
                                <button className="btn-close" onClick={onClose}></button>
                            </div>
                        )}

                        {/* Se for visualizar, o padding top é um pouco maior pois não tem header */}
                        <div className={`modal-body ${modo === "visualizar" ? "p-3" : "pt-2"}`}>

                            <OrdemServicoCard placa={placa} />

                            <div className={`card-info-servico text-start ${modo === "visualizar" ? "mt-3" : ""}`}>

                                <div className="titulo-servico mb-2">
                                    <i className='bx bx-wrench'></i>
                                    Informações do Serviço
                                </div>

                                {/* TABS OU BADGE DE VISUALIZAÇÃO */}
                                {modo === "adicionar" ? (
                                    <>
                                        <div className="tabs-servico">
                                            <button className={aba === "FUNILARIA" ? "ativo" : ""} onClick={() => setAba("FUNILARIA")}>Funilaria</button>
                                            <button className={aba === "PINTURA" ? "ativo" : ""} onClick={() => setAba("PINTURA")}>Pintura</button>
                                            <button className={aba === "OUTROS" ? "ativo" : ""} onClick={() => setAba("OUTROS")}>Outros</button>
                                        </div>
                                        <p className="texto-info">Todos os itens com (*) são obrigatórios!</p>
                                    </>
                                ) : (
                                    <div className="badge-tipo-servico mb-3">
                                        {servico?.tipo || "FUNILARIA"}
                                    </div>
                                )}

                                {/* FORMULÁRIO DINÂMICO */}
                                <div className="row g-3">

                                    {/* CAMPO SERVIÇO: Aba Outros */}
                                    {tipoAba === "OUTROS" && (
                                        <div className="col-12">
                                            <label>Serviço*</label>
                                            {modo === "visualizar" ? (
                                                <input className="form-control" value={servico?.nomeServico || "Não informado"} readOnly />
                                            ) : (
                                                <input
                                                    name="tipo_servico"
                                                    className="form-control"
                                                    placeholder="Informe qual foi o serviço realizado"
                                                    value={formData.tipo_servico || ""}
                                                    onChange={handleChange}
                                                />
                                            )}
                                        </div>
                                    )}

                                    <div className="col-md-6">
                                        <label>Parte do Veículo *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.parte || "Não informada"} readOnly />
                                        ) : (
                                            <select
                                                name="parte_veiculo"
                                                className="form-control form-select"
                                                value={formData.parte_veiculo}
                                                onChange={handleChange}>

                                                <option value="" disabled>Selecione a parte</option>
                                                <option value="PARACHOQUE">PARACHOQUE</option>
                                                <option value="GRADE">GRADE</option>
                                                <option value="CAPO">CAPO</option>
                                                <option value="TETO">TETO</option>
                                                <option value="SAIA">SAIA</option>
                                                <option value="PAINEL">PAINEL</option>
                                                <option value="TAMPA_DO_MOTOR">TAMPA DO MOTOR</option>
                                                <option value="PORTA_BAGAGEIRO">PORTA BAGAGEIRO</option>
                                                <option value="CAIXA_DE_RODA">CAIXA DE RODA</option>
                                                <option value="CURVAO">CURVAO</option>
                                                <option value="PORTA">PORTA</option>
                                                <option value="PORTA_DE_SERVICO">PORTA DE SERVICO</option>
                                            </select>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label>Lado do Veículo *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.lado || "Não informado"} readOnly />
                                        ) : (
                                            <select
                                                name="lado_veiculo"
                                                className="form-control form-select"
                                                value={formData.lado_veiculo}
                                                onChange={handleChange}>

                                                <option value="" disabled>Selecione o lado</option>
                                                <option value="DIANTEIRO">DIANTEIRO</option>
                                                <option value="TRASEIRO">TRASEIRO</option>
                                                <option value="COMPLETO">COMPLETO</option>
                                                <option value="DIREITO">DIREITO</option>
                                                <option value="ESQUERDO">ESQUERDO</option>
                                                <option value="DIANTEIRO_DIREITO">DIANTEIRO DIREITO</option>
                                                <option value="DIANTEIRO_ESQUERDO">DIANTEIRO ESQUERDO</option>
                                                <option value="TRASEIRO_DIREITO">TRASEIRO DIREITO</option>
                                                <option value="TRASEIRO_ESQUERDO">TRASEIRO ESQUERDO</option>
                                                <option value="SAIA">SAIA</option>
                                            </select>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label>Descrição *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.descricao || "Sem descrição"} readOnly />
                                        ) : (
                                            <textarea
                                                name="especificacao_servico"
                                                className="form-control"
                                                placeholder="Descreva o serviço a ser realizado"
                                                value={formData.especificacao_servico}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>

                                    {/* CAMPOS PINTURA */}
                                    {tipoAba === "PINTURA" && (
                                        <>
                                            <div className="col-md-6">
                                                <label>Tipo de Pintura *</label>
                                                {modo === "visualizar" ? (
                                                    <input className="form-control" value={servico?.tipoPintura || "Não informado"} readOnly />
                                                ) : (
                                                    <select className="form-control form-select">
                                                        {/* Não esta salvando esse */}
                                                        {/* Verificar se existe esse campo no banco de dados */}
                                                        <option>Selecione o tipo</option>
                                                    </select>
                                                )}
                                            </div>

                                            <div className="col-md-6">
                                                <label>Cor da Pintura *</label>
                                                {modo === "visualizar" ? (
                                                    <input
                                                        name="cor"
                                                        className="form-control"
                                                        value={servico?.cor || "Não informada"}
                                                        onChange={handleChange}
                                                        readOnly />
                                                ) : (
                                                    <input
                                                        name="cor"
                                                        className="form-control"
                                                        placeholder="Informe a cor"
                                                        value={formData.cor}
                                                        onChange={handleChange}
                                                    />
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className="col-12">
                                        <label>Preço (R$) *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.preco ? `R$ ${servico.preco}` : "R$ 0,00"} readOnly />
                                        ) : (
                                            <input
                                                name="preco_cobrado"
                                                className="form-control"
                                                placeholder="R$ 0,00"
                                                value={formData.preco_cobrado}
                                                onChange={handleChange}
                                            />
                                        )}
                                    </div>

                                    {/* OBSERVAÇÕES: Aba FUNILARIA */}
                                    {tipoAba === "FUNILARIA" && (
                                        <div className="col-12">
                                            <label>Observações</label>
                                            {modo === "visualizar" ? (
                                                <input
                                                    name="observacoes_item"
                                                    className="form-control"
                                                    value={formData?.observacoes_item || "Nenhuma"}
                                                    onChange={handleChange}
                                                    readOnly />
                                            ) : (
                                                <textarea
                                                    name="observacoes_item"
                                                    className="form-control"
                                                    value={formData.observacoes_item}
                                                    onChange={handleChange}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* BOTÕES DINÂMICOS */}
                                {modo === "adicionar" ? (
                                    <div className="botoes-modal mt-4">
                                        <button className="btn-adicionar" onClick={handleFinalizar}>Adicionar</button>
                                        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        {/* w-100 do bootstrap faz o botão ocupar 100% da largura na visualização */}
                                        <button className="btn-cancel w-100" onClick={onClose}>Fechar</button>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAdicionarServico;