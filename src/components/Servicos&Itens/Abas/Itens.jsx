import "./servicos.css";
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

function Itens({ dados, pagina, carregarOrdem, placa }) {
    const [modalSaida, setModalSaida] = useState(false);
    const [dadosSaida, setDadosSaida] = useState(null);

    const [modalExcluirProduto, setModalExcluirProduto] = useState(false);
    const [modalEditarProduto, setModalEditarProduto] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const { excluirProduto ,editarProduto } = ServicosEItensLogic();

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

    return (
        <>
            <table className="tabela">
                <thead className="titles">
                    <tr className="config-titles">
                        <th className="title">Código Est.</th>
                        <th className="title">Item</th>
                        <th className="title">Visibilidade</th>
                        <th className="title">Quantidade</th>
                        <th className="title">Preço Unid.</th>
                        <th className="title">Saída Est.</th>
                        <th className="title">Opções</th>
                    </tr>
                </thead>
                <tbody className="dados">
                    {dados.map((item) => (
                        <tr key={item.id_item_produto} className="config-dados">
                            <td className="dado">{formatarTexto(item.id_produto_estoque)}</td>
                            <td className="dado">{formatarTexto(item.nome_produto)}</td>
                            <td className="dado">{item.visivel_orcamento === true ? "Público" : "Privado"}</td>
                            <td className="dado">{item.quantidade}</td>
                            <td className="dado">{formatarMoedaBR(item.preco_peca)}</td>
                            <td className="dado">{item.baixado === true ? "Sim" : "Não"}</td>
                            <td className="dado">
                                <div className="box-options">
                                    {pagina === "orcamento" ?
                                        <>
                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconEdit})` }}
                                                onClick={() => {
                                                    setProdutoSelecionado(item);
                                                    setModalEditarProduto(true);
                                                }}
                                            ></div>

                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconLixo})` }}
                                                onClick={() => {
                                                    setProdutoSelecionado(item);
                                                    setModalExcluirProduto(true);
                                                }}>
                                            </div>

                                            <div
                                                className="icon"
                                                style={{ backgroundImage: `url(${iconBox})` }}
                                                onClick={() => {
                                                    setDadosSaida({
                                                        codigo: "00025",
                                                        itemProduto: "Tinta-Azul-Fiat",
                                                        visibilidade: "Privado",
                                                        quantidadeSaida: 8,
                                                        precoPorUnidade: "30,00",
                                                        quantidadeEstoque: 7
                                                    });
                                                    setModalSaida(true);
                                                }}
                                            ></div>
                                        </>
                                        :
                                        <div
                                            className="icon"
                                            style={{ backgroundImage: `url(${iconBox})` }}
                                            onClick={() => {
                                                setDadosSaida({
                                                    codigo: "00025",
                                                    itemProduto: "Tinta-Azul-Fiat",
                                                    visibilidade: "Privado",
                                                    quantidadeSaida: 8,
                                                    precoPorUnidade: "30,00",
                                                    quantidadeEstoque: 7
                                                });
                                                setModalSaida(true);
                                            }}
                                        ></div>
                                    }

                                    <RegistroSaidaMaterial
                                        aberto={modalSaida}
                                        aoConfirmar={(_dados) => {
                                            setModalSaida(false);
                                        }}
                                        aoCancelar={() => setModalSaida(false)}
                                        dados={dadosSaida}
                                    />

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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