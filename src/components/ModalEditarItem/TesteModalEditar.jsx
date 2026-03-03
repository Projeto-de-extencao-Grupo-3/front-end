import { useState } from "react";
import ModalEditarItem from "./ModalEditarItem";

function TesteModal() {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <div className="container mt-5">
            <h1>Teste do Modal</h1>
            <ModalEditarItem
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
            />
        </div>
    );
}

export default TesteModal;