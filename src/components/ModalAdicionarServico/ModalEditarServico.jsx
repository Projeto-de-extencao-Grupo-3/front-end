import { useState, useEffect } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarServico.css";
import { formatarTexto } from "../../utils/formatarTexto.js";
import { useParams } from "react-router-dom";

function ModalEditarServico({ isOpen, onClose, placa, servico, onUpdate }) {
    const [formData, setFormData] = useState({
        id_registro_servico: "",
        preco_cobrado: "",
        parte_veiculo: "",
        lado_veiculo: "",
        cor: "",
        especificacao_servico: "",
        tipo_servico: "",
        tipo_pintura: ""
    });

    const { idOrdemServico } = useParams();

    useEffect(() => {
        let timer;

        if (isOpen && servico) {
            timer = setTimeout(() => {
                setFormData({
                    id_registro_servico: servico.id_item_servico,
                    preco_cobrado: servico.preco_cobrado || "",
                    parte_veiculo: servico.parte_veiculo || "",
                    lado_veiculo: servico.lado_veiculo || "",
                    cor: servico.cor || "-",
                    especificacao_servico: servico.especificacao_servico || "",
                    tipo_servico: servico.tipo_servico || "FUNILARIA",
                    tipo_pintura: servico.tipo_pintura || "NAO_APLICAVEL"
                });
            }, 0);
        }

        return () => clearTimeout(timer);

    }, [isOpen, servico, formatarTexto]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async () => {
        try {
            // Garante que o tipo_pintura vá preenchido corretamente
            const dadosParaSalvar = {
                ...formData,
                tipo_pintura: formData.tipo_servico === "PINTURA" ? formData.tipo_pintura : "NAO_APLICAVEL"
            };
            await onUpdate(dadosParaSalvar);
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title titulo-modal">Editar Serviço</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body pt-2">
                            <OrdemServicoCard 
                                marca={placa.marca}
                                modelo={placa.modelo}
                                prefixo={placa.prefixo}
                                cliente={placa.nome_cliente}
                                placa={placa.placa}
                                idOrdemServico={idOrdemServico}
                            />
                            <div className="card-info-servico text-start mt-3">
                                <div className="titulo-servico mb-2">
                                    <i className='bx bx-edit-alt'></i> Informações Registradas
                                </div>

                                <div className="badge-tipo-servico mb-3">
                                    {formData.tipo_servico}
                                </div>

                                <div className="row g-3">
                                    {/* Campos Comuns: Parte e Lado */}
                                    <div className="col-md-6">
                                        <label>Parte do Veículo *</label>
                                        <select
                                            name="parte_veiculo"
                                            className="form-control form-select"
                                            value={formData.parte_veiculo}
                                            onChange={handleChange}
                                        >
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
                                        >
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

                                    {/* Campos específicos de PINTURA */}
                                    {formData.tipo_servico === "PINTURA" && (
                                        <>
                                            <div className="col-md-6">
                                                <label>Tipo de Pintura *</label>
                                                <select
                                                    name="tipo_pintura"
                                                    className="form-control form-select"
                                                    value={formData.tipo_pintura}
                                                    onChange={handleChange}
                                                >
                                                    <option value="NAO_APLICAVEL" disabled>Selecione</option>
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
                                                />
                                            </div>
                                        </>
                                    )}

                                    {/* Descrição: Editável para todos, mas essencial para OUTROS */}
                                    <div className="col-12">
                                        <label>Descrição {formData.tipo_servico === "OUTROS" ? "*" : ""}</label>
                                        <textarea
                                            name="especificacao_servico"
                                            className="form-control"
                                            value={formatarTexto(formData.especificacao_servico)}
                                            onChange={handleChange}
                                            placeholder="Descreva os detalhes do serviço"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label>Preço Cobrado *</label>
                                        <input
                                            name="preco_cobrado"
                                            className="form-control"
                                            value={formData.preco_cobrado}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="botoes-modal mt-4">
                                    <button className="btn-adicionar" onClick={handleSalvar}>
                                        Salvar Alterações
                                    </button>
                                    <button className="btn-cancel" onClick={onClose}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalEditarServico;