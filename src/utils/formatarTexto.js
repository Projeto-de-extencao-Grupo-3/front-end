export function formatarTexto(texto) {
    if (!texto) return "";

    return texto
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
}