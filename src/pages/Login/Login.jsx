import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../service/api';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  
  async function handleLogin() {
    try {
      const response = await api.post('/oficinas/login', {
        email,
        senha
      });

        // salva o token
      localStorage.setItem('TOKEN', response.data.token);
      console.log("vamo ve se salva o token mesmo", response.data.token)
      
      if (response.data.token != null) {
        navigate("/painelControle")
      }
    } catch (error) {
      setErro('Email ou senha inválidos');
    }
  }


  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">

          {/* celular(col-X) tablet(col-md) desktop(col-lg) */}
          <div className="col-12 col-md-10 col-lg-10">
            <div className="card login-card shadow-lg d-flex flex-md-row">

              {/* Esquerda */}
              <div className="col-md-6 p-4">
                <h2 className="fw-bold">Bem vindo</h2>
                <p className="text-muted">Faça seu login para acessar sua página:</p>

                <div className="mt-4">
                  <div className='d-flex flex-column gap-4'>
                    <input type="text" className="form-control input-custom" placeholder="Email:" value={email}
                      onChange={e => setEmail(e.target.value)} />

                    <input type="password" className="form-control input-custom" placeholder="Senha:" value={senha}
                      onChange={e => setSenha(e.target.value)}/>
                  </div>

                    {erro && <p className="text-danger mt-3">{erro}</p>}

                  <div className="form-check mt-3">
                    <input type="checkbox" className="form-check-input" id="manter" />
                    <label className="form-check-label" htmlFor="manter">
                      Manter Conectado
                    </label>
                  </div>

                  <button
                    className="btn btn-outline-primary mt-4 px-4"
                    onClick={handleLogin}
                  >
                    Entrar
                  </button>
                </div>
              </div>

              {/* Direita */}
              <div className="col-md-6 login-img d-flex justify-content-center align-items-center">
                <img src="/src/assets/images/logo.svg" className="img-fluid w-75" alt="Logo" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
