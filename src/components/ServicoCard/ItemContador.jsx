import { useState } from "react";

function ItemContador({ label }) {
  const [quantidade, setQuantidade] = useState(0);

  return (
    <div className="item-row">
      <span className="item-label">{label}</span>
      <div className="contador-controls">
        <button onClick={() => setQuantidade(Math.max(0, quantidade - 1))}>—</button>
        <span className="quantidade-valor">{quantidade}</span>
        <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
      </div>
    </div>
  );
};

export default ItemContador;