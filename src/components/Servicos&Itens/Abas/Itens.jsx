import "./abas.css";
import { useState } from "react";
import { formatarTexto, formatarMoedaBR } from "../../../utils/formatarTexto.js";

import ModalConfirmacao from "../../Modais/Confirmacoes/confirmacoes.jsx";
import ModalEditarItem from "../../ModalAdicionarItem/ModalEditarItem.jsx";
import RegistroSaidaMaterial from "../../Modais/RegistrarSaida/RegistroSaidaMaterial.jsx"

import deleteProdutoIcon from "../../../assets/icons/deleteProduto icon.png";
import iconBox from "../../../assets/icons/boxItens icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";
import AlterarEstoque from "../../../service/Produtos";

function Itens({ dados, pagina, carregarOrdem, placa }) {
    const [modalSaida, setModalSaida] = useState(false);
    const [modalExcluirProduto, setModalExcluirProduto] = useState(false);
    const [modalEditarProduto, setModalEditarProduto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const { excluirProduto, editarProduto, baixarProduto } = ServicosEItensLogic();
    const { atualizarQuantidadeEstoque } = AlterarEstoque();

    const handleExcluir = async () => {
        try {
            await excluirProduto(produtoSelecionado.id_item_produto);
            setProdutoSelecionado(false);
            await carregarOrdem();
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    const handleAtualizar = async (dadosEditados) => {
        try {
            await editarProduto(dadosEditados.id_item_produto, dadosEditados);
            setModalEditarProduto(false);
            setProdutoSelecionado(null);
            await carregarOrdem();
        } catch (error) {
            console.error("Erro ao processar atualização no componente:", error);
        }
    };

    const handleDarBaixa = async (produtoParaBaixa, novaQuantidadeEstoque) => {
        try {
            await atualizarQuantidadeEstoque(produtoParaBaixa.id_produto_estoque, { id: produtoParaBaixa.id_produto_estoque, quantidade_estoque: novaQuantidadeEstoque });
            await baixarProduto(produtoParaBaixa.id_item_produto);
            setModalSaida(false);
            setProdutoSelecionado(null);
            await carregarOrdem();
        } catch (error) {
            console.error("Erro ao dar baixa no material:", error);
        }
    };

    return (
        <>
            <table className="tabela">
                <thead className="titles">
                    <tr className="config-titles">
                        <th className="title codigo">ID Est.</th>
                        <th className="title item">Item</th>
                        <th className="title">Visibilidade</th>
                        <th className="title">Quantidade</th>
                        <th className="title">Preço Unid.</th>
                        <th className="title">Preço Total</th>
                        <th className="title">Saída Est.</th>
                        <th className="title">Opções</th>
                    </tr>
                </thead>
                <tbody className="dados">
                    {dados.map((item) => (
                        <tr key={item.id_item_produto} className="config-dados">
                            <td className="dado codigo">{formatarTexto(item.id_produto_estoque)}</td>
                            <td className="dado item">{formatarTexto(item.nome_produto)}</td>
                            <td className="dado">{item.visivel_orcamento_cliente === true ? "Público" : "Privado"}</td>
                            <td className="dado">{item.quantidade}</td>
                            <td className="dado">{formatarMoedaBR(item.preco_peca)}</td>
                            <td className="dado">{formatarMoedaBR(item.preco_peca * item.quantidade)}</td>
                            <td className="dado">{item.baixado === true ? "Sim" : "Não"}</td>
                            <td className="dado">
                                <div className="box-options">
                                    {pagina === "orcamento" ?
                                        <>
                                            {!item.baixado && (
                                                <>
                                                    <div
                                                        className="icon"
                                                        style={{ backgroundImage: `url(${iconEdit})` }}
                                                        onClick={() => {
                                                            setProdutoSelecionado(item);
                                                            setModalEditarProduto(true);
                                                        }}
                                                    ></div>
                                                </>
                                            )}
                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconLixo})` }}
                                                onClick={() => {
                                                    setProdutoSelecionado(item);
                                                    setModalExcluirProduto(true);
                                                }}
                                            ></div>

                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconBox})` }}
                                                onClick={() => {
                                                    setProdutoSelecionado(item);
                                                    setModalSaida(true);
                                                }}
                                            ></div>
                                        </>
                                        :
                                        <div
                                            className="icon"
                                            style={{ backgroundImage: `url(${iconBox})` }}
                                            onClick={() => {
                                                setProdutoSelecionado(item);
                                                setModalSaida(true);
                                            }}
                                        ></div>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <RegistroSaidaMaterial
                aberto={modalSaida}
                aoConfirmar={(produtoConfirmado, novoEstoque) => {
                    handleDarBaixa(produtoConfirmado, novoEstoque);
                }}
                aoCancelar={() => {
                    setModalSaida(false);
                    setProdutoSelecionado(null);
                }}
                produto={produtoSelecionado}
            />

            <ModalEditarItem
                isOpen={modalEditarProduto}
                onClose={() => {
                    setModalEditarProduto(false);
                    setProdutoSelecionado(null);
                }}
                placa={placa}
                produto={produtoSelecionado}
                onUpdate={handleAtualizar}
            />

            <ModalConfirmacao
                aberto={modalExcluirProduto}
                aoConfirmar={() => {
                    handleExcluir();
                    setModalExcluirProduto(false);
                }}
                aoCancelar={() => setModalExcluirProduto(false)}
                icone={deleteProdutoIcon}
                titulo="Excluir produto"
                descricao="Deseja realmente excluir este produto?"
            />
        </>
    );
}

export default Itens;