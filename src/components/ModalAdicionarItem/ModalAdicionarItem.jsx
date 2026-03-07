import { useState } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarItem.css";

function ModalAdicionarItem({ isOpen, onClose, placa }) {
    // Estado para controlar os Radio Buttons de visibilidade
    const [visibilidade, setVisibilidade] = useState("privado");

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">

                        {/* HEADER */}
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title titulo-modal">
                                Adicionar Item/Produto
                            </h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <div className="modal-body pt-2">

                            <OrdemServicoCard placa={placa} />

                            <div className="card-info-servico text-start">

                                {/* TÍTULO: Ícone de maleta e texto alterado */}
                                <div className="titulo-servico">
                                    <i className='bx bx-briefcase' style={{fontSize:'24px'}}></i>
                                    Informações do Material
                                </div>

                                <p className="texto-info mb-2">
                                    Todos os itens com * (Asterisco) são obrigatórios!
                                </p>

                                {/* LINHA DIVISÓRIA DA IMAGEM */}
                                <div className="linha-separadora"></div>

                                {/* FORM */}
                                <div className="row g-3">
                                    
                                    <div className="col-12">
                                        <label>Item/Produto*</label>
                                        <select className="form-control form-select">
                                            <option>Informe o nome do Produto</option>
                                        </select>
                                    </div>

                                    {/* CAMPO DE VISIBILIDADE (RADIO BUTTONS) */}
                                    <div className="col-12">
                                        <label>Visibilidade*</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input 
                                                    type="radio" 
                                                    className="radio-custom" 
                                                    checked={visibilidade === "privado"}
                                                    onChange={() => setVisibilidade("privado")}
                                                />
                                                Privado
                                            </label>

                                            <label className="radio-label">
                                                <input 
                                                    type="radio" 
                                                    className="radio-custom" 
                                                    checked={visibilidade === "publico"}
                                                    onChange={() => setVisibilidade("publico")}
                                                />
                                                Público
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Quantidade*</label>
                                        <input
                                            className="form-control"
                                            placeholder="Informe a quantidade"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Preço por Unidade (R$)*</label>
                                        <input
                                            className="form-control"
                                            placeholder="R$ 0,00"
                                        />
                                    </div>

                                </div>

                                {/* BOTÕES */}
                                <div className="botoes-modal mt-4">
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

export default ModalAdicionarItem;