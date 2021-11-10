import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus } from 'react-icons/fi'
import './new.css'
import { useState, useEffect, useContext } from 'react'
import { authContext } from '../../context/auth'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import {useHistory, useParams} from 'react-router-dom';

const New = () =>{

    const {id} = useParams()
    const history = useHistory()
    const [idCustomer, setIdCustomer] = useState(false)

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('')

    const {user} = useContext(authContext);

    const [customers, setCustomers] = useState([]);
    const [loadCustomers, setLoadCustomers] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(0);


    useEffect(() =>{
        async function loadCustomers(){
            await firebase.firestore().collection('clients')
            .get()
            .then((snapshot) =>{
                let lista = [];

                snapshot.forEach(doc =>{
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length === 0){
                    setCustomers([{id: 1, nomeFantasia: ''}])
                    setLoadCustomers(false);
                    return
                }
                setCustomers(lista)
                setLoadCustomers(false);

                if(id){
                    loadId(lista);
                }

            })
            .catch(e =>{
                alert(e.message)
                setCustomers([{id: 1, nomeFantasia: ''}])
            })


        }

        loadCustomers();
    }, [])

    async function loadId(lista){
        await firebase.firestore().collection('chamados')
        .doc(id).get()
        .then(snapshot =>{
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setSelectedCustomer(index)
            setIdCustomer(true)
        })
        .catch(e =>{
            setIdCustomer(false)
        })
    }

    async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customers[selectedCustomer].nomeFantasia,
                clienteId: customers[selectedCustomer].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userUid: user.uid
            })
            .then(() =>{
                toast.success('Chamado editado com sucesso!!!')
                setSelectedCustomer(0)
                setComplemento('')
                history.push('/dashboard')
            })
            .catch(e =>{
                console.log(e.message);
            })
            return;
        }
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[selectedCustomer].nomeFantasia,
            clienteId: customers[selectedCustomer].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userUid: user.uid
        })
        .then(() =>{
            toast.success('Chamado criado')
            setComplemento('')
            setSelectedCustomer(0)
            history.push('/dashboard')
        })
        .catch(e =>{
            alert(e.message)
            toast.error('Erro ao registrar chamado')
        })
    }

    function handleStatusChange(e){
        setStatus(e.target.value)
    }

    function handleCustomerChange(e){
        setSelectedCustomer(e.target.value)
    }

    return(
        <div>
            <Header />

            <div className='content' >
                <Title name='Novo chamado'>
                    <FiPlus size={25} />
                </Title>

                <div className='container' >

                    <form className='form-profile' onSubmit={e =>handleRegister(e)} >
                        <label>Cliente</label>

                        {loadCustomers ? (
                            <input type='text' disabled={true} value='Carregando Clientes...' />
                        ) : (
                            
                            <select value={selectedCustomer} onChange={handleCustomerChange} > 
                            {
                            customers.map((item, index) =>{
                                return(
                                    <option key={item.id} value={index} >
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })
                            }
                        </select>
                        )}



                        <label>Assunto</label>
                        <select value={assunto} onChange={e => setAssunto(e.target.value)} >
                        <option key={1} value='Suporte' >Suporte</option>
                        <option key={2} value='Visita técnica' >Visita técnica</option>
                        <option key={3} value='Financeiro' >Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status' >
                            <input 
                            type='radio' 
                            name='radio' 
                            value='Aberto'
                            onChange={handleStatusChange}
                            checked={status === 'Aberto'}
                            />
                            <span>Em aberto</span>

                            <input 
                            type='radio' 
                            name='radio' 
                            value='progresso' 
                            onChange={handleStatusChange}
                            checked={status === 'progresso'}
                            />
                            <span>Em progresso</span>

                            <input 
                            type='radio' 
                            name='radio' 
                            value='Atendido' 
                            onChange={handleStatusChange}
                            checked={status === 'Atendido'}
                            />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                        typeof='text' 
                        placeholder='Descrição do problema (opcional)' 
                        value={complemento}
                        onChange={e => setComplemento(e.target.value)}
                        />

                        <button type='submit' >Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default New;