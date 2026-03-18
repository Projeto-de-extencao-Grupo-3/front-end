function ItemContador({ label, valor, setValor }) {
  return (
    <div className="item-row">
      <span className="item-label">{label}</span>
      <div className="contador-controls">
        <button onClick={() => setValor(Math.max(0, valor - 1))}>—</button>
        <span className="quantidade-valor">{valor}</span>
        <button onClick={() => setValor(valor + 1)}>+</button>
      </div>
    </div>
  );
}
export default ItemContador;