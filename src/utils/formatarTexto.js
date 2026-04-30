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

    // Substitui os underlines por espaços e deixa tudo minúsculo
    const textoFormatado = textoCorrigido.replaceAll("_", " ").toLowerCase();

    // Retorna a primeira letra em maiúsculo concatenada com o resto da frase
    return textoFormatado.charAt(0).toUpperCase() + textoFormatado.slice(1);
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

export function formatarTelefone(telefone) {
    if (!telefone) return "";

    // Converte para string e remove tudo que NÃO for número
    const numeroLimpo = String(telefone).replace(/\D/g, "");

    // Celular com DDD (11 dígitos): (XX) XXXXX-XXXX
    if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    
    // Fixo com DDD (10 dígitos): (XX) XXXX-XXXX
    if (numeroLimpo.length === 10) {
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    // Celular sem DDD (9 dígitos): XXXXX-XXXX
    if (numeroLimpo.length === 9) {
        return numeroLimpo.replace(/(\d{5})(\d{4})/, "$1-$2");
    }

    // Fixo sem DDD (8 dígitos): XXXX-XXXX
    if (numeroLimpo.length === 8) {
        return numeroLimpo.replace(/(\d{4})(\d{4})/, "$1-$2");
    }

    // Se tiver um tamanho diferente (ex: 0800), retorna o original
    return telefone;
}