import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { authContext } from '../../context/auth'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from "react-toastify";


const Profile = () =>{

    const {user, setUser, storageUser, loadingAuth, setLoadingAuth} = useContext(authContext);

    const [nome, setNome] = useState(user.nome)
    const [email, setEmail] = useState(user.email)

    const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl)
    const [imgAvatar, setImgAvatar] = useState(null)


    async function handleUpload(){
        const currentUid = user.uid;
        await firebase.storage()
        .ref(`images/${currentUid}/${imgAvatar.name}`)
        .put(imgAvatar)
        .then(async () =>{
            console.log('deu certo');
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imgAvatar.name).getDownloadURL()
            .then(async (url) =>{
                await firebase.firestore().collection('users')
                .doc(currentUid)
                .update({
                    avatarUrl: url,
                    nome: nome
                })
                .then(() =>{
                    let data ={
                        ...user,
                        nome: nome,
                        avatarUrl: url
                    }
                    setUser(data)
                    storageUser(data)
                })
            })
        })
        .catch(e =>{ 
            alert(e.message)
        })
    }
    
    function handleFile(e){
        
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImgAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
                console.log(image);
            }
            else{
                alert('Formato inválido (Apenas png ou jpg)')
                return null;
            }
        }
    }

    const handleSave = async e =>{
        e.preventDefault();
        setLoadingAuth(true)
        if(imgAvatar === null && nome !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome,
            })
            .then(() =>{
                let data ={
                    ...user,
                    nome: nome
                }
                setUser(data)
                storageUser(data)
                toast.success('Alterações realizadas com sucesso')
            })
            .catch(e =>{
                console.log(e.message);
            })
        }
        
        else if(nome !== '' && imgAvatar !== null){
            handleUpload();
            toast.success('Alterações realizadas com sucesso')
        }

        setLoadingAuth(false)
    }


    return(
        <div>
            <Header/>

            <div className='content'>
                <Title name='Meu Perfil' >
                    <FiSettings size={25} />
                </Title>

                <div className='container' >
                    <form className='form-profile' onSubmit={e => handleSave(e)} >
                        <label className='label-avatar' >
                            <span>
                                <FiUpload color='white' size={25} />
                            </span>
                            <input type='file' accept='image/*' onChange={e => handleFile(e)} /> <br/>
                            { 
                            avatarUrl ? 
                            <img src={avatarUrl} width='250' height='250' alt='' />
                            : 
                            <img src={avatar} width='250' height='250' alt=''/>
                            }
                        </label>

                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />

                        
                        <label>Email</label>
                        <input type='text' value={email} disabled={true} />
                        <button type='submit'> {loadingAuth ? 'Carregando...' : 'Salvar'} </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Profile