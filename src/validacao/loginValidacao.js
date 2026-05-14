export const validarCamposLogin = (email, senha) => {
  // Regex para validar se o formato do e-mail é aceitável
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validação de E-mail
  if (!email || email.trim() === "") {
    return { status: false, mensagem: "O campo de e-mail é obrigatório." };
  }
  
  if (!emailRegex.test(email)) {
    return { status: false, mensagem: "Por favor, insira um e-mail válido." };
  }

  // Validação de Senha
  if (!senha || senha.trim() === "") {
    return { status: false, mensagem: "O campo de senha é obrigatório." };
  }

  if (senha.length < 6) {
    return { status: false, mensagem: "A senha deve ter no mínimo 6 caracteres." };
  }

  // Se passar por tudo
  return { status: true, mensagem: "" };
};