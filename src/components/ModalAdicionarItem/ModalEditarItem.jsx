import { useState, useEffect } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarItem.css";
import { useParams } from "react-router-dom";
import { formatarTexto } from "../../utils/formatarTexto.js";

function ModalEditarItem({ isOpen, onClose, placa, produto, onUpdate }) {
    const { idOrdemServico } = useParams();

    const [formData, setFormData] = useState({
        id_item_produto: "",
        fk_ordem_servico: idOrdemServico,
        fk_produto: "",
        nome_produto: "",
        visibilidade: "",
        quantidade: "",
        preco_produto: "",
        baixado: ""
    });

    useEffect(() => {
        if (!produto) return;

        setTimeout(() => {
            console.log("produto: ", produto);
            setFormData({
                id_item_produto: produto.id_item_produto,
                fk_ordem_servico: idOrdemServico,
                fk_produto: produto.id_produto_estoque,
                nome_produto: produto.nome_produto,
                visibilidade: produto.visivel_orcamento_cliente ? "publico" : "privado",
                quantidade: produto.quantidade,
                preco_produto: produto.preco_peca,
                baixado: produto.baixado
            });
        }, 50); 
    }, [produto, idOrdemServico]);

    const handleClose = () => {
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAtualizar = async () => {
        try {
            await onUpdate(formData);
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    if (!isOpen || !produto) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">

                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title titulo-modal">
                                Editar Item/Produto
                            </h5>
                            <button className="btn-close" onClick={handleClose}></button>
                        </div>

                        <div className="modal-body pt-2">

                            <OrdemServicoCard
                                marca={placa?.marca}
                                modelo={placa?.modelo}
                                prefixo={placa?.prefixo}
                                cliente={placa?.nome_cliente || placa?.cliente}
                                placa={placa?.placa}
                                idOrdemServico={idOrdemServico}
                            />

                            <div className="card-info-servico text-start">

                                <div className="titulo-servico">
                                    <i className='bx bx-briefcase' style={{ fontSize: '24px' }}></i>
                                    Informações do Material
                                </div>

                                <div className="linha-separadora mb-3"></div>

                                <div className="row g-3">

                                    <div className="col-12">
                                        <label>Item/Produto*</label>
                                        <select
                                            name="fk_produto"
                                            className="form-control form-select"
                                            disabled
                                        >      {console.log(formData)}
                                            <option value={formData.fk_produto}>
                                                {formatarTexto(formData.nome_produto)}
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label>Visibilidade do Item no Orcamento*</label>
                                        <div className="radio-group">
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="visibilidade"
                                                    value={0}
                                                    className="radio-custom"
                                                    checked={formData.visibilidade === "privado"}
                                                    disabled
                                                />
                                                Privado
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="visibilidade"
                                                    value={1}
                                                    className="radio-custom"
                                                    checked={formData.visibilidade === "publico"}
                                                    disabled
                                                />
                                                Público
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Quantidade*</label>
                                        <input
                                            name="quantidade"
                                            className="form-control"
                                            type="number"
                                            value={formData.quantidade}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label>Preço por Unidade (R$)*</label>
                                        <input
                                            name="preco_produto"
                                            className="form-control"
                                            type="number"
                                            value={formData.preco_produto}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="botoes-modal mt-4">
                                    <button className="btn-adicionar" onClick={handleAtualizar}>
                                        Atualizar
                                    </button>

                                    <button className="btn-cancel" onClick={handleClose}>
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

export default ModalEditarItem;