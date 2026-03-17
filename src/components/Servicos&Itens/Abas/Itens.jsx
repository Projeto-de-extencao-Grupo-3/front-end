import "./servicos.css";
import { useState } from "react";

import RegistroSaidaMaterial from "../../Modais/RegistrarSaida/RegistroSaidaMaterial.jsx"

import iconBox from "../../../assets/icons/boxItens icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";

function Itens({ dados, pagina }) {
    const [modalSaida, setModalSaida] = useState(false);
    const [dadosSaida, setDadosSaida] = useState(null);
    console.log("Página atual no Itens compone:", pagina);
    return (
        <table className="tabela">
            <thead className="titles">
                <tr className="config-titles">
                    <th className="title">Código</th>
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
                    <tr key={item.id} className="config-dados">
                        <td className="dado">{item.codigo}</td>
                        <td className="dado">{item.nome_produto}</td>
                        <td className="dado">{item.visivel_orcamento === true ? "Público" : "Privado"}</td>
                        <td className="dado">{item.quantidade} Unid</td>
                        <td className="dado">R${item.preco_peca}</td>
                        <td className="dado">{item.baixado === true ? "Sim" : "Não"}</td>
                        <td className="dado">
                            <div className="box-options">
                                {pagina === "orcamento" ?
                                    <>
                                        <div className="icon" style={{ backgroundImage: `url(${iconEdit})` }}></div>

                                        <div className="icon" style={{ backgroundImage: `url(${iconLixo})` }}></div>

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
    );
}

export default Itens;