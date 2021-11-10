import { createContext, useState, useEffect } from "react";
import firebase from '../services/firebaseConnection';
import { toast } from "react-toastify";


export const authContext = createContext();

const AuthProvider = ({children}) =>{

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);

    useEffect(() =>{

        const loadStorage = () =>{
            const storageUser = localStorage.getItem('SistemaUser');
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }
        loadStorage();
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: email
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem vindo!')
        })
        .catch(e =>{
            alert(e.message)
            setLoadingAuth(false)
            toast.error('Tente novamente!')

        })
 
    }

    async function signUp(name, email, password){
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: name,
                avatarUrl: null
            })
            .then(() =>{
                let data={
                    uid: uid,
                    nome: name,
                    email: email,
                    avatarUrl: null
                }
                setUser(data);  
                storageUser(data);
                setLoadingAuth(false)
                toast.success('Bem vindo!')
            })
        })
        .catch(e =>{
            alert(e.message)
            setLoadingAuth(false)
            toast.error('Tente novamente!')
        }) 
    }

    const storageUser = data =>{
        localStorage.setItem('SistemaUser', JSON.stringify(data))
    }

    async function signOut(){
        await firebase.auth().signOut;
        localStorage.removeItem('SistemaUser')
        setUser(null)
    }


    return(
        <authContext.Provider value={{ 
        signed: !!user,
        user,
        setUser,
        loading,
        signUp,
        signOut, 
        signIn, 
        loadingAuth,
        setLoadingAuth,
        storageUser
        }} >
            {children}
        </authContext.Provider>
    )
} 
export default AuthProvider;

