import { useState } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarServico.css";

// Adicionamos as props 'modo' (padrão é "adicionar") e 'servico' (dados para visualização)
function ModalAdicionarServico({ isOpen, onClose, placa, modo = "adicionar", servico }) {
    const [aba, setAba] = useState("funilaria");

    if (!isOpen) return null;

    // Define qual aba/tipo de serviço está ativo. 
    // Se for visualizar, pega do objeto. Se for adicionar, pega do state clicado.
    const tipoAba = modo === "visualizar" && servico 
        ? servico.tipo?.toLowerCase() 
        : aba;

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
                                            <button className={aba === "funilaria" ? "ativo" : ""} onClick={() => setAba("funilaria")}>Funilaria</button>
                                            <button className={aba === "pintura" ? "ativo" : ""} onClick={() => setAba("pintura")}>Pintura</button>
                                            <button className={aba === "outros" ? "ativo" : ""} onClick={() => setAba("outros")}>Outros</button>
                                        </div>
                                        <p className="texto-info">Todos os itens com (*) são obrigatórios!</p>
                                    </>
                                ) : (
                                    <div className="badge-tipo-servico mb-3">
                                        {servico?.tipo || "Funilaria"}
                                    </div>
                                )}

                                {/* FORMULÁRIO DINÂMICO */}
                                <div className="row g-3">
                                    
                                    {/* CAMPO SERVIÇO: Aba Outros */}
                                    {tipoAba === "outros" && (
                                        <div className="col-12">
                                            <label>Serviço*</label>
                                            {modo === "visualizar" ? (
                                                <input className="form-control" value={servico?.nomeServico || "Não informado"} readOnly />
                                            ) : (
                                                <input className="form-control" placeholder="Informe qual foi o serviço realizado" />
                                            )}
                                        </div>
                                    )}

                                    <div className="col-md-6">
                                        <label>Parte do Veículo *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.parte || "Não informada"} readOnly />
                                        ) : (
                                            <select className="form-control form-select">
                                                <option>Selecione a parte</option>
                                            </select>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label>Lado do Veículo *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.lado || "Não informado"} readOnly />
                                        ) : (
                                            <select className="form-control form-select">
                                                <option>Selecione o lado</option>
                                            </select>
                                        )}
                                    </div>

                                    <div className="col-12">
                                        <label>Descrição *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.descricao || "Sem descrição"} readOnly />
                                        ) : (
                                            <textarea className="form-control" placeholder="Descreva o serviço a ser realizado" />
                                        )}
                                    </div>

                                    {/* CAMPOS PINTURA */}
                                    {tipoAba === "pintura" && (
                                        <>
                                            <div className="col-md-6">
                                                <label>Tipo de Pintura *</label>
                                                {modo === "visualizar" ? (
                                                    <input className="form-control" value={servico?.tipoPintura || "Não informado"} readOnly />
                                                ) : (
                                                    <select className="form-control form-select">
                                                        <option>Selecione o tipo</option>
                                                    </select>
                                                )}
                                            </div>

                                            <div className="col-md-6">
                                                <label>Cor da Pintura *</label>
                                                {modo === "visualizar" ? (
                                                    <input className="form-control" value={servico?.corPintura || "Não informada"} readOnly />
                                                ) : (
                                                    <input className="form-control" placeholder="Informe a cor" />
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className="col-12">
                                        <label>Preço (R$) *</label>
                                        {modo === "visualizar" ? (
                                            <input className="form-control" value={servico?.preco ? `R$ ${servico.preco}` : "R$ 0,00"} readOnly />
                                        ) : (
                                            <input className="form-control" placeholder="R$ 0,00" />
                                        )}
                                    </div>

                                    {/* OBSERVAÇÕES: Aba Funilaria */}
                                    {tipoAba === "funilaria" && (
                                        <div className="col-12">
                                            <label>Observações</label>
                                            {modo === "visualizar" ? (
                                                <input className="form-control" value={servico?.observacoes || "Nenhuma"} readOnly />
                                            ) : (
                                                <textarea className="form-control" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* BOTÕES DINÂMICOS */}
                                {modo === "adicionar" ? (
                                    <div className="botoes-modal mt-4">
                                        <button className="btn-adicionar">Adicionar</button>
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