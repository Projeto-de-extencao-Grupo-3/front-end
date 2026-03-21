export function formatarTexto(texto) {
    if (!texto) return "";

    return texto
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