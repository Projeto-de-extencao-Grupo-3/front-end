import "./servicos.css";

function Itens({ dados }) {
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
                        <td className="dado">{item.nome}</td>
                        <td className="dado">{item.visibilidade}</td>
                        <td className="dado">{item.quantidade} Unid</td>
                        <td className="dado">R${item.preco}</td>
                        <td className="dado">{item.status}</td>
                        <td className="dado">⋮</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Itens;