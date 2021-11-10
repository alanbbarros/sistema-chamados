import './signin.css'
import { useState } from 'react';
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { authContext } from '../../context/auth';

function SignIn() {


    const { signIn, loadingAuth } = useContext(authContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
      e.preventDefault();
      if(email !== '' && password !== ''){
        signIn(email, password)
      }
    }


    return (
      <div className="container-center">
        <div className='login'>
          <div className='logo-area' >
            <img src={logo} alt='logo do site' />
          </div>

          <form onSubmit={e => handleSubmit(e)} >
            <h1>Entrar</h1>
            <input placeholder='Email' type='text'  value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input placeholder='******' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
          </form>

          <Link to='/register' >Criar Conta</Link>
        </div>
      </div>
    );
  }
  
  export default SignIn;
  