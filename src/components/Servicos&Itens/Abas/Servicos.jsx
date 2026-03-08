import "./servicos.css";
import { useState, useEffect } from "react";

import iconBook from "../../../assets/icons/bookService icon.png";
import iconLixo from "../../../assets/icons/lixoService Icon.png";
import iconEdit from "../../../assets/icons/EditIcon.png";

function Servicos({ dados, pagina, onVisualizar }) {
    return (
        <table className="tabela">
            <thead className="titles">
                <tr className="config-titles">
                    <th className="title">Tipo Serviço</th>
                    <th className="title">Parte</th>
                    <th className="title">Lado</th>
                    <th className="title">Preço</th>
                    <th className="title">Opções</th>
                </tr>
            </thead>
            <tbody className="dados">
                {dados.map((servico) => (
                    <tr key={servico.id} className="config-dados">
                        <td className="dado">{servico.tipo}</td>
                        <td className="dado">{servico.parte}</td>
                        <td className="dado">{servico.lado}</td>
                        <td className="dado">R${servico.preco}</td>

                        {/* aq chama no modo de visualizar */}
                        <td className="dado">
                            <div className="box-options">
                                {pagina === "orcamento" ?
                                    <>
                                        <div className="icon" style={{ backgroundImage: `url(${iconEdit})` }}></div>

                                        <div className="icon" style={{ backgroundImage: `url(${iconLixo})` }}></div>

                                        <div className="icon" style={{ backgroundImage: `url(${iconBook})` }} onClick={() => onVisualizar(servico)}></div>
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