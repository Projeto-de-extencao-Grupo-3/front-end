import { useState } from "react";
import ModalQtdItem from "./ModalQtdItem";

function TesteModalQtd() {
    const [modalAberto, setModalAberto] = useState(true);

    return (
        <div className="container mt-5">
            <h1>Teste do Modal</h1>
            <ModalQtdItem
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
            />
        </div>
    );
}

export default TesteModalQtd;