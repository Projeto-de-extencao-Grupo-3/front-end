export function formatarTexto(texto) {
    if (!texto) return "";

    let textoCorrigido = texto;

    try {
        // Tenta corrigir problemas de encoding (ISO-8859-1 para UTF-8)
        // O decodeURIComponent(escape(s)) é o "truque" padrão para isso no JS
        textoCorrigido = decodeURIComponent(escape(texto));
    } catch (e) {
        // Se der erro, significa que o texto já está em UTF-8 ou é incompatível,
        // então mantemos o original para não quebrar a função.
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