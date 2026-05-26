import { useState, useRef, useEffect } from "react";
import "./ModalEditarPerfil.css";

export default function ModalEditarPerfil({ aberto, onFechar, usuario, onSalvar }) {
  const [foto, setFoto] = useState(null);
  const [email, setEmail] = useState(usuario?.email || "");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onFechar?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFechar]);

  if (!aberto) return null;

  const nome  = usuario?.nome  ?? sessionStorage.getItem("NOME_USUARIO")  ?? "Usuário";
  const cargo = usuario?.cargo ?? sessionStorage.getItem("CARGO_USUARIO") ?? "Colaborador";

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFoto(url);
  };

  const validar = () => {
    if (novaSenha && novaSenha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return false;
    }
    if (novaSenha && novaSenha.length < 6) {
      setErroSenha("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setErroSenha("");
    return true;
  };

  const handleSalvar = async () => {
    if (!validar()) return;
    setSalvando(true);
    await new Promise((r) => setTimeout(r, 800)); // simula requisição
    
    onSalvar?.({ email, novaSenha: novaSenha || undefined, foto });
    
    setSalvando(false);
    setSucesso(true);
    setTimeout(() => { setSucesso(false); onFechar?.(); }, 1500);
  };

  return (
    <>
      <div className="mep-overlay" onClick={(e) => { if (e.target === e.currentTarget) onFechar?.(); }}>
        <div className="mep-box">

          {/* Header */}
          <div className="mep-header">
            <h2 className="mep-title">Editar Perfil</h2>
            <button className="mep-close-btn" onClick={onFechar} aria-label="Fechar">
              <i className="bx bx-x" />
            </button>
          </div>

          {/* Avatar e Informações Estáticas */}
          <div className="mep-avatar-wrapper">
            <div className="mep-avatar-circle" onClick={() => fileRef.current?.click()} title="Alterar foto">
              {foto
                ? <img src={foto} alt="Foto de perfil" />
                : <i className="bx bxs-user" />
              }
              <span className="mep-avatar-badge">
                <i className="bx bx-upload" style={{ fontSize: 13 }} />
              </span>
            </div>
            
            {/* Nome e Cargo Exibidos na Tela */}
            <h3 className="mep-user-name-static">{nome}</h3>
            <span className="mep-role-badge">{cargo}</span>
            
            <span className="mep-avatar-hint">Clique no ícone para adicionar foto</span>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFoto} />
          </div>

          {/* Email */}
          <div className="mep-field-group">
            <label className="mep-label">Email</label>
            <div className="mep-input-wrapper">
              <span className="mep-input-icon"><i className="bx bx-envelope" /></span>
              <input
                className="mep-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <hr className="mep-divider" />

          {/* Nova Senha */}
          <div className="mep-field-group">
            <label className="mep-label">Nova Senha</label>
            <div className="mep-input-wrapper">
              <span className="mep-input-icon"><i className="bx bx-lock-alt" /></span>
              <input
                className={`mep-input ${erroSenha ? "mep-input--error" : ""}`}
                type="password"
                value={novaSenha}
                onChange={(e) => { setNovaSenha(e.target.value); setErroSenha(""); }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="mep-field-group">
            <label className="mep-label">Confirmar Senha</label>
            <div className="mep-input-wrapper">
              <span className="mep-input-icon"><i className="bx bx-lock" /></span>
              <input
                className={`mep-input ${erroSenha ? "mep-input--error" : ""}`}
                type="password"
                value={confirmarSenha}
                onChange={(e) => { setConfirmarSenha(e.target.value); setErroSenha(""); }}
                placeholder="••••••••"
              />
            </div>
            {erroSenha && (
              <p className="mep-field-error">
                <i className="bx bx-error-circle" style={{ fontSize: 14 }} />
                {erroSenha}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mep-footer">
            <button className="mep-btn-cancelar" onClick={onFechar}>Cancelar</button>
            <button className="mep-btn-salvar" onClick={handleSalvar} disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>

          {sucesso && <div className="mep-toast">✓ Perfil atualizado com sucesso!</div>}
        </div>
      </div>
    </>
  );
}