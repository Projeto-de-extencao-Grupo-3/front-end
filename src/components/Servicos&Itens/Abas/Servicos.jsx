import "./servicos.css";
import iconBook from "../../../assets/icons/bookService icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";
import {formatarTexto} from "../../../utils/formatarTexto.js";

function Servicos({ dados, pagina, onVisualizar }) {
    return (
        <table className="tabela">
            <thead className="titles">
                <tr className="config-titles">
                    <th className="title">Tipo Serviço</th>
                    <th className="title">Parte</th>
                    <th className="title">Lado</th>
                    <th className="title">Tipo de Pintura:</th>
                    <th className="title">Cor</th>
                    <th className="title">Preço</th>
                    <th className="title">Opções</th>
                </tr>
            </thead>
            <tbody className="dados">
                {dados.map((servico) => (
                    <tr key={servico.id_ordem_servico} className="config-dados">
                        <td className="dado">{formatarTexto(servico.tipo_servico)}</td>
                        <td className="dado">{formatarTexto(servico.parte_veiculo)}</td>
                        <td className="dado">{formatarTexto(servico.lado_veiculo)}</td>
                        <td className="dado">{servico.tipoPintura}</td>
                        <td className="dado">{servico.cor}</td>
                        <td className="dado">R${servico.preco_cobrado}</td>

                        {/* aq chama no modo de visualizar */}
                        <td className="dado">
                            <div className="box-options">
                                {pagina === "orcamento" ?
                                    <>
                                        <div className="icon" style={{ backgroundImage: `url(${iconEdit})` }}></div>

                                        <div className="icon" style={{ backgroundImage: `url(${iconLixo})` }}></div>

                                        {/* <div className="icon" style={{ backgroundImage: `url(${iconBook})` }} onClick={() => onVisualizar(servico)}></div> */}
                                    </>
                                    :
                                    <div className="icon" style={{ backgroundImage: `url(${iconBook})` }} onClick={() => onVisualizar(servico)}></div>
                                }
                            </div>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Servicos;