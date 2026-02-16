function Servicos({ dados }) {
    return (
        <table className="tabela">
            <thead>
                <tr>
                    <th>Tipo Serviço</th>
                    <th>Parte</th>
                    <th>Lado</th>
                    <th>Preço</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {dados.map((servico) => (
                    <tr key={servico.id}>
                        <td>{servico.tipo}</td>
                        <td>{servico.parte}</td>
                        <td>{servico.lado}</td>
                        <td>R${servico.preco}</td>
                        <td>⋮</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Servicos;