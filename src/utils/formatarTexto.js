export function formatarTexto(texto) {
    if (!texto) return "";
    let textoCorrigido = texto;

    try {
        // Windows
        textoCorrigido = decodeURIComponent(escape(texto));
    } catch {
        // Linux/Mac
        textoCorrigido = texto; 
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



export function formatarDataBR(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}