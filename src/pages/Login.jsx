import './Login.css'

function Login() {

  return (
    <div className='mainLogin'>
      <div className='divContent'>
        <div className='divCabecalho'>
          <h2>Bem vindo</h2>
          <p>Faça seu login para acessar sua página:</p>
        </div>
        <div className='divFormLogin'>
          <input type="text" className='iptDados' placeholder='Email:'/>
          <input type="text" className='iptDados' placeholder='Senha:'/>
          <div className='divCheckMark'>
            <input type="checkbox" /> Manter conectado
          </div>
          <div className='divEntrar'>
            <button className='btnBordaAzul'>Entrar</button>
          </div>
        </div>
      </div>
      <div className='divLogo'>
        <img src="/src/assets/images/logo.svg" alt="Logo" />
      </div>
    </div>
  )
}

export default Login;
