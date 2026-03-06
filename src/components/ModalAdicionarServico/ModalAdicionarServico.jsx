import { useState } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarServico.css";

function ModalAdicionarServico({ isOpen, onClose, placa }) {
    const [aba, setAba] = useState("funilaria");

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            {/* AJUSTE PARA CENTRALIZAÇÃO NA TELA: d-flex e justify-content-center */}
            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">

                        {/* HEADER */}
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title titulo-modal">
                                Adicionar Serviço
                            </h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body pt-2">

                            <OrdemServicoCard placa={placa} />

                            <div className="card-info-servico text-start">

                                <div className="titulo-servico">
                                    <i className='bx bx-wrench'></i>
                                    Informações do Serviço
                                </div>

                                {/* TABS */}
                                <div className="tabs-servico">
                                    <button
                                        className={aba === "funilaria" ? "ativo" : ""}
                                        onClick={() => setAba("funilaria")}
                                    >
                                        Funilaria
                                    </button>

                                    <button
                                        className={aba === "pintura" ? "ativo" : ""}
                                        onClick={() => setAba("pintura")}
                                    >
                                        Pintura
                                    </button>

                                    <button
                                        className={aba === "outros" ? "ativo" : ""}
                                        onClick={() => setAba("outros")}
                                    >
                                        Outros
                                    </button>
                                </div>

                                <p className="texto-info">
                                    Todos os itens com (*) são obrigatórios!
                                </p>

                                {/* FORM */}
                                <div className="row g-3">
                                    
                                    {/* CAMPO SERVIÇO: Visível apenas na aba "Outros" */}
                                    {aba === "outros" && (
                                        <div className="col-12">
                                            <label>Serviço*</label>
                                            <input
                                                className="form-control"
                                                placeholder="Informe qual foi o serviço realizado"
                                            />
                                        </div>
                                    )}

                                    <div className="col-md-6">
                                        <label>Parte do Veículo *</label>
                                        <select className="form-control">
                                            <option>Selecione a parte</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Lado do Veículo *</label>
                                        <select className="form-control">
                                            <option>Selecione o lado</option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label>Descrição *</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Descreva o serviço a ser realizado"
                                        />
                                    </div>

                                    {/* CAMPOS PINTURA: Visíveis apenas na aba "Pintura" */}
                                    {aba === "pintura" && (
                                        <>
                                            <div className="col-md-6">
                                                <label>Tipo de Pintura *</label>
                                                <select className="form-control">
                                                    <option>Selecione o tipo</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                                <label>Cor da Pintura *</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Informe a cor"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="col-md-12">
                                        <label>Preço (R$) *</label>
                                        <input
                                            className="form-control"
                                            placeholder="R$ 0,00"
                                        />
                                    </div>

                                    {/* OBSERVAÇÕES: Visível apenas na aba "Funilaria" (oculto no 'Outros' e 'Pintura') */}
                                    {aba === "funilaria" && (
                                        <div className="col-12">
                                            <label>Observações</label>
                                            <textarea className="form-control" />
                                        </div>
                                    )}
                                </div>

                                {/* BOTÕES */}
                                <div className="botoes-modal">
                                    <button className="btn-adicionar">
                                        Adicionar
                                    </button>

                                    <button className="btn-cancel" onClick={onClose}>
                                        Cancelar
                                    </button>
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