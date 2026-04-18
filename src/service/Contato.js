import { useState } from "react";
import api from "./api";

function Contatos() {

    const atualizarContato = async (dadosContato) => {
        console.log(dadosContato)

        const payload = {
            "id_contato": dadosContato.id_contato,
            "telefone": dadosContato.telefone,
            "email": dadosContato.email
        }

        const response = api.put("/contatos", payload)
    }

    return { atualizarContato };

}