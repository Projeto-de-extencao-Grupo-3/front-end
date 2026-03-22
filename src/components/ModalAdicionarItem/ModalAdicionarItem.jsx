import { useState, useEffect } from "react";
import OrdemServicoCard from "../ServicoCard/OrdemServicoCard";
import "./ModalAdicionarItem.css";
import ServicosEItensLogic from "../../service/ServicosEItens.js";
import { formatarTexto, formatarMoedaBR } from "../../utils/formatarTexto.js";

function ModalAdicionarItem({ isOpen, onClose, placa, onSave, salvarNaOrdem }) {

    const { buscarProdutos } = ServicosEItensLogic();

    const [visibilidade, setVisibilidade] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [_produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [formData, setFormData] = useState({
        fk_ordem_servico: salvarNaOrdem,
        fk_produto: "",
        quantidade: "",
        preco_produto: ""
    });

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                const dados = await buscarProdutos();
                setProdutos(dados || []);
            } catch (error) {
                console.log("Erro ao carregar produtos", error);
            }
        };
        if (isOpen) {
            carregarProdutos();
        }
    }, [isOpen]);


    const handleSelecionarProduto = (e) => {
        const idProduto = Number(e.target.value);
        const produto = produtos.find(p => p.id_peca === idProduto);

        if (!produto) return;

        setProdutoSelecionado(produto);
        setVisibilidade(produto.visivel_orcamento ? "publico" : "privado");

        setFormData(prev => ({
            ...prev,
            fk_produto: idProduto,
            preco_produto: produto.preco_venda
        }));
    };

    const handleClose = () => {
        setVisibilidade(null);

        setFormData({
            fk_ordem_servico: 1,
            fk_produto: "",
            quantidade: "",
            preco_produto: ""
        });

        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFinalizar = async () => {
        try {

            if (!formData.fk_produto || !formData.quantidade || !formData.preco_produto) {
                alert("Preencha todos os campos obrigatórios");
                return;
            }

            const dados = {
                ...formData,
                fk_produto: Number(formData.fk_produto),
                quantidade: Number(formData.quantidade),
                preco_produto: Number(formData.preco_produto)
            };

            await onSave(dados);

            onClose();

        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>

            <div className="modal fade show d-block d-flex align-items-center justify-content-center" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-servico border-0">

                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title titulo-modal">
                                Adicionar Item/Produto
                            </h5>
                            <button className="btn-close" onClick={handleClose}></button>
                        </div>

                        <div className="modal-body pt-2">

                            <OrdemServicoCard placa={placa} />

                            <div className="card-info-servico text-start">

                                <div className="titulo-servico">
                                    <i className='bx bx-briefcase' style={{ fontSize: '24px' }}></i>
                                    Informações do Material
                                </div>

                                <p className="texto-info mb-2">
                                    Todos os itens com * são obrigatórios!
                                </p>

                                <div className="linha-separadora"></div>

                                <div className="row g-3">

                                    {/* SELECT PRODUTOS */}
                                    <div className="col-12">
                                        <label>Item/Produto*</label>
                                        <select
                                            name="fk_produto"
                                            className="form-control form-select"
                                            onChange={handleSelecionarProduto}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Informe o nome do Produto
                                            </option>
                                            {produtos.map(produto => (
                                                <option key={produto.id_peca} value={produto.id_peca}>
                                                    {formatarTexto(produto.nome)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* VISIBILIDADE */}
                                    <div className="col-12">
                                        <label>Visibilidade*</label>
                                        <div className="radio-group">
                                            <label className="radio-label">

                                                <input
                                                    type="radio"
                                                    className="radio-custom"
                                                    checked={visibilidade === "privado"}
                                                    disabled
                                                />
                                                Privado
                                            </label>

                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    className="radio-custom"
                                                    checked={visibilidade === "publico" || visibilidade === "público"}
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
                                            placeholder="Informe a quantidade"
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
                                            placeholder="R$ 0,00"
                                            type="number"
                                            value={formData.preco_produto}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="botoes-modal mt-4">
                                    <button className="btn-adicionar" onClick={handleFinalizar}>
                                        Adicionar
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

export default ModalAdicionarItem;