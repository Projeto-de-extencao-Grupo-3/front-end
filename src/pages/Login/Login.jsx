import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../service/api';
import logo from '../../assets/images/logo.svg';
import { validarCamposLogin } from '../../validacao/loginValidacao';

function Login() {
  const navigate = useNavigate();
  

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin() {
    setErro('');

    const validacao = validarCamposLogin(email, senha);

    
    if (!validacao.status) {
      setErro(validacao.mensagem);
      return;
    }

    
    try {
      const response = await api.post('/oficinas/login', {
        email,
        senha
      });

      
      localStorage.setItem("token", response.data.token);
      sessionStorage.setItem('ID_OFICINA_USUARIO', response.data.id_oficina);
      sessionStorage.setItem('NOME_USUARIO', response.data.nome);
      sessionStorage.setItem('CARGO_USUARIO', response.data.cargo);

      console.log("Dados retornados do Login: ", response.data);

      if (response.data.token != null) {
        navigate("/painelControle");
      }
      
    } catch (error) {
      setErro('E-mail ou senha inválidos. Tente novamente.');
      console.error("Erro no login:", error);
    }
  }

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-10">
            <div className="card login-card shadow-lg d-flex flex-md-row">

              {/* Lado Esquerdo - Formulário */}
              <div className="col-md-6 p-4">
                <h2 className="fw-bold">Bem vindo Teste</h2>
                <p className="text-muted">Faça seu login para acessar sua página:</p>

                <div className="mt-4">
                  <div className='d-flex flex-column gap-4'>
                    <input 
                      type="text" 
                      className={`form-control input-custom ${erro && !email ? 'is-invalid' : ''}`}
                      placeholder="Email:" 
                      value={email}
                      onChange={e => setEmail(e.target.value)} 
                    />

                    <input 
                      type="password" 
                      className={`form-control input-custom ${erro && !senha ? 'is-invalid' : ''}`}
                      placeholder="Senha:" 
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </div>

                  {/* Exibição de Erros (Validação ou API) */}
                  {erro && <p className="text-danger mt-3 fw-semibold" style={{ fontSize: '14px' }}>{erro}</p>}

                  <div className="form-check mt-3">
                    <input type="checkbox" className="form-check-input" id="manter" />
                    <label className="form-check-label" htmlFor="manter">
                      Manter Conectado
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-primary mt-4 px-4 w-100"
                    onClick={handleLogin}
                  >
                    Entrar
                  </button>
                </div>
              </div>

              {/* Lado Direito - Logo */}
              <div className="col-md-6 login-img d-flex justify-content-center align-items-center">
                <img src={logo} className="img-fluid w-75" alt="Logo" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;