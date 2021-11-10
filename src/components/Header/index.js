import './header.css'
import { useContext } from 'react';
import { authContext } from '../../context/auth';
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiStar, FiLogOut } from 'react-icons/fi'


const Header = () =>{

    const { user, signOut } = useContext(authContext);

    return(
        <div className='sidebar' >

            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='foto perfil' />
            </div>

            <Link to='/dashboard' >
                <FiHome className='icon' color='white' size={24} />
                Chamados
            </Link>

            <Link to='/customers' >
                <FiUser className='icon' color='white' size={24} />
                Clientes
            </Link>

            <Link to='/profile' >
                <FiSettings className='icon' color='white' size={24} />
                Configurações
            </Link>

            <Link to='/' onClick={signOut} >
                <FiLogOut className='icon' color='white' size={24} />
                Sair
            </Link>
        </div>
    )
}
export default Header;