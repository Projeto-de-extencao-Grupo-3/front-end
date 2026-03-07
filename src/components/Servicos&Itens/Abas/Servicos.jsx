import "./servicos.css";

function Servicos({ dados, onVisualizar }) {
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
                        <td 
                            className="dado" 
                            style={{ cursor: "pointer" }} 
                            onClick={() => onVisualizar(servico)}
                        >
                            ⋮
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Servicos;