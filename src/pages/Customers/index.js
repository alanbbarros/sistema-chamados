import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { authContext } from '../../context/auth'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

const Customers = () =>{

    const {loadingAuth, setLoadingAuth} = useContext(authContext);

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        setLoadingAuth(true)
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== '' ){
            await firebase.firestore().collection('clients')
            .doc()
            .set({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() =>{
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                toast.info('Empresa Cadastrada')
            })
            .catch(e =>{
                alert(e.message)
            })
        }
        else{
            toast.error('Preencha todos os campos!')
        }
        setLoadingAuth(false)

    }

    return(
        <div>
            <Header />

            <div className='content' >
                <Title name='Clientes' >
                    <FiUser size={25} />
                </Title>

                <div className='container' >
                    <form className='form-profile customers' onSubmit={e => handleAdd(e)} >
                        <label>Nome Fantasia</label>
                        <input type='text' placeholder='Nome da empresa' value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type='text' value={cnpj} onChange={e => setCnpj(e.target.value)} />
                    
                        <label>Endereço</label>
                        <input type='text' value={endereco} onChange={e => setEndereco(e.target.value)} />
                    
                        <button type='submit' > {loadingAuth ? 'Carregando...' : 'Cadastrar'} </button>
                    </form>
                </div>

            </div>

        </div>
    )
}
export default Customers;