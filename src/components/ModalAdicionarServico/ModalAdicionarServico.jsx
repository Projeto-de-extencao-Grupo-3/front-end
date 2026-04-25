import { useState, useEffect } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarServico.css";
import { formatarTexto, formatarMoedaBR } from "../../utils/formatarTexto.js";
import { useParams } from "react-router-dom";

function ModalAdicionarServico({ isOpen, onClose, placa, modo = "adicionar", servico, onSave, salvarNaOrdem }) {
    const [aba, setAba] = useState("FUNILARIA");

    const [formData, setFormData] = useState({
        preco_cobrado: "",
        parte_veiculo: "",
        lado_veiculo: "",
        cor: "",
        especificacao_servico: "",
        tipo_pintura: "NAO_APLICAVEL"
    });

    const { idOrdemServico } = useParams();

    useEffect(() => {
        let timer;

        if (isOpen) {
            timer = setTimeout(() => {
                if (modo === "visualizar" && servico) {
                    setAba(servico.tipo_servico?.toUpperCase() || "FUNILARIA");
                    setFormData({
                        fk_ordem_servico: salvarNaOrdem,
                        preco_cobrado: formatarMoedaBR(servico.preco_cobrado) || "",
                        parte_veiculo: formatarTexto(servico.parte_veiculo) || "",
                        lado_veiculo: formatarTexto(servico.lado_veiculo) || "",
                        cor: formatarTexto(servico.cor) || "-",
                        especificacao_servico: formatarTexto(servico.especificacao_servico) || "",
                        tipo_pintura: formatarTexto(servico.tipo_pintura) || "NAO_APLICAVEL"
                    });
                } else {
                    setAba("FUNILARIA");
                    setFormData({
                        fk_ordem_servico: salvarNaOrdem,
                        preco_cobrado: "",
                        parte_veiculo: "",
                        lado_veiculo: "",
                        cor: "",
                        especificacao_servico: "",
                        tipo_pintura: "NAO_APLICAVEL"
                    });
                }
            }, 0);
        }

        return () => clearTimeout(timer);

    }, [isOpen, modo, servico, salvarNaOrdem, formatarMoedaBR, formatarTexto]);

    if (!isOpen) return null;

    const tipoAba = aba; // Agora usa o estado 'aba' sincronizado no useEffect

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFinalizar = async () => {
        try {
            const dados = {
                ...formData,
                tipo_pintura: formData.tipo_pintura && formData.tipo_pintura !== ""
                    ? formData.tipo_pintura
                    : "NAO_APLICAVEL",
                tipo_servico: aba,
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

                        {modo === "adicionar" && (
                            <div className="modal-header border-0 pb-0">
                                <h5 className="modal-title titulo-modal">Adicionar Serviço</h5>
                                <button className="btn-close" onClick={onClose}></button>
                            </div>
                        )}

                        <div className={`modal-body ${modo === "visualizar" ? "p-3" : "pt-2"}`}>
                            <OrdemServicoCard 
                                marca={placa.marca}
                                modelo={placa.modelo}
                                prefixo={placa.prefixo}
                                cliente={placa.nome_cliente}
                                placa={placa.placa}
                                idOrdemServico={idOrdemServico}
                            />
                            <div className={`card-info-servico text-start ${modo === "visualizar" ? "mt-3" : ""}`}>
                                <div className="titulo-servico mb-2">
                                    <i className={`bx ${modo === "visualizar" ? 'bx-info-circle' : 'bx-wrench'}`}></i>
                                    Informações do Serviço
                                </div>

                                {modo === "adicionar" ? (
                                    <div className="tabs-servico">
                                        <button className={aba === "FUNILARIA" ? "ativo" : ""} onClick={() => setAba("FUNILARIA")}>Funilaria</button>
                                        <button className={aba === "PINTURA" ? "ativo" : ""} onClick={() => setAba("PINTURA")}>Pintura</button>
                                        <button className={aba === "VEDACAO" ? "ativo" : ""} onClick={() => setAba("VEDACAO")}>Vedação</button>
                                        <button className={aba === "POLIMENTO" ? "ativo" : ""} onClick={() => setAba("POLIMENTO")}>Polimento</button>
                                        <button className={aba === "RECUPERACAO" ? "ativo" : ""} onClick={() => setAba("RECUPERACAO")}>Recuperação</button>
                                        <button className={aba === "DESMONTAGEM" ? "ativo" : ""} onClick={() => setAba("DESMONTAGEM")}>Desmontagem</button>
                                        <button className={aba === "MONTAGEM" ? "ativo" : ""} onClick={() => setAba("MONTAGEM")}>Montagem</button>
                                        <button className={aba === "TROCA" ? "ativo" : ""} onClick={() => setAba("TROCA")}>Troca</button>
                                        <button className={aba === "ELETRICA" ? "ativo" : ""} onClick={() => setAba("ELETRICA")}>Elétrica</button>
                                        <button className={aba === "MECANICA" ? "ativo" : ""} onClick={() => setAba("MECANICA")}>Mecânica</button>
                                        <button className={aba === "OUTROS" ? "ativo" : ""} onClick={() => setAba("OUTROS")}>Outros</button>
                                    </div>
                                ) : (
                                    <div className="badge-tipo-servico mb-3">{aba}</div>
                                )}

                                <div className="row g-3">
                                    {tipoAba === "OUTROS" && (
                                        <div className="col-12">
                                            <label>Serviço*</label>
                                            <input
                                                name="tipo_servico"
                                                className="form-control"
                                                placeholder="OUTROS"
                                                value={formData.tipo_servico || "OUTROS"}
                                                onChange={handleChange}
                                                readOnly={modo === "visualizar"}
                                            />
                                        </div>
                                    )}

                                    <div className="col-md-6">
                                        <label>Parte do Veículo *</label>
                                        <select
                                            name="parte_veiculo"
                                            className="form-control form-select"
                                            value={formData.parte_veiculo}
                                            onChange={handleChange}
                                            disabled={modo === "visualizar"}
                                        >
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
                                    </div>

                                    <div className="col-md-6">
                                        <label>Lado do Veículo *</label>
                                        <select
                                            name="lado_veiculo"
                                            className="form-control form-select"
                                            value={formData.lado_veiculo}
                                            onChange={handleChange}
                                            disabled={modo === "visualizar"}
                                        >
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
                                    </div>

                                    <div className="col-12">
                                        <label>Descrição *</label>
                                        <textarea
                                            name="especificacao_servico"
                                            className="form-control"
                                            value={formData.especificacao_servico}
                                            onChange={handleChange}
                                            readOnly={modo === "visualizar"}
                                        />
                                    </div>

                                    {tipoAba === "PINTURA" && (
                                        <>
                                            <div className="col-md-6">
                                                <label>Tipo de Pintura *</label>
                                                <select
                                                    name="tipo_pintura"
                                                    className="form-control form-select"
                                                    value={formData.tipo_pintura}
                                                    onChange={handleChange}
                                                    disabled={modo === "visualizar"}
                                                >
                                                    <option value="NAO_APLICAVEL" disabled>Selecione o tipo</option>
                                                    <option value="COMPLETA">Completa</option>
                                                    <option value="PARCIAL">Parcial</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Cor da Pintura *</label>
                                                <input
                                                    name="cor"
                                                    className="form-control"
                                                    value={formData.cor}
                                                    onChange={handleChange}
                                                    readOnly={modo === "visualizar"}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="col-12">
                                        <label>Preço (R$) *</label>
                                        <input
                                            name="preco_cobrado"
                                            className="form-control"
                                            value={formData.preco_cobrado}
                                            onChange={handleChange}
                                            readOnly={modo === "visualizar"}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    {modo === "adicionar" ? (
                                        <div className="botoes-modal">
                                            <button className="btn-adicionar" onClick={handleFinalizar}>Adicionar</button>
                                            <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                                        </div>
                                    ) : (
                                        <button className="btn-cancel w-100" onClick={onClose}>Fechar</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAdicionarServico;