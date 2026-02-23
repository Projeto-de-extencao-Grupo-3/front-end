import { useState } from "react";
import ModalNovoItem from "./ModalNovoItem";

function TesteModal() {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <div className="container mt-5">
            <h1>Teste do Modal</h1>
            <ModalNovoItem
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
            />
        </div>
    );
}

export default TesteModal;