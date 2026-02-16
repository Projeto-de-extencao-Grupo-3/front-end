function Itens({ dados }) {
    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Item</th>
                    <th>Visibilidade</th>
                    <th>Quantidade</th>
                    <th>Preço Unid.</th>
                    <th>Saída Est.</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((item) => (
                    <tr key={item.id}>
                        <td>{item.codigo}</td>
                        <td>{item.nome}</td>
                        <td>{item.visibilidade}</td>
                        <td>{item.quantidade} Unid</td>
                        <td>R${item.preco}</td>
                        <td>{item.status}</td>
                        <td>⋮</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Itens;