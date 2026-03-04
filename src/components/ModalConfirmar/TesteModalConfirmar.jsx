import { useState } from "react";
import ModalConfirmar from "./ModalConfirmar";

function TesteModalConfirmar() {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <div className="container mt-5">
            <h1>Teste do Modal</h1>
            <ModalConfirmar
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
            />
        </div>
    );
}

export default TesteModalConfirmar;