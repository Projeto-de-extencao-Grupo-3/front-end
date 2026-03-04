import { useState } from "react";
import ModalDesativarItem from "./ModalDesativarItem";

function TesteModalDesativar() {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <div className="container mt-5">
            <h1>Teste do Modal</h1>
            <ModalDesativarItem
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
            />
        </div>
    );
}

export default TesteModalDesativar;