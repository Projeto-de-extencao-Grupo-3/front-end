export function formatarTexto(texto) {
    if (!texto) return "";
    console.log("Input original:", texto);
    console.log("Array de bytes:", new TextEncoder().encode(texto));

    let textoCorrigido = texto;

    try {
        // Windows
        textoCorrigido = decodeURIComponent(escape(texto));
    } catch (e) {
        // Linux/Mac
        textoCorrigido = texto; 
        console.warn("Decodificação falhou, usando texto original:", e);
    }

    return textoCorrigido
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

export const formatarMoedaBR = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) {
        return "R$ 0,00";
    }

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};