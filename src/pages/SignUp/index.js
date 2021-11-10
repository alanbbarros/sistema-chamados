import './signup.css'
import { useState } from 'react';
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import { authContext } from '../../context/auth';
import { useContext } from 'react';

function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp, loadingAuth } = useContext(authContext);

    function handleSubmit(e){
      e.preventDefault();
      if(name !== '' && email !== '' && password !== ''){
        signUp(name, email, password)
      }

    }


    return (
      <div className="container-center">
        <div className='login'>
          <div className='logo-area' >
            <img src={logo} alt='logo do site' />
          </div>

          <form onSubmit={e => handleSubmit(e)} >
            <h1>Registrar</h1>
            <input placeholder='Nome' type='text'  value={name} onChange={(e) => setName(e.target.value)}  />
            <input placeholder='Email' type='text'  value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input placeholder='******' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
          </form>

          <Link to='/' >Já possui uma conta? Faça o Login</Link>
        </div>
      </div>
    );
  }
  
  export default SignUp;
  