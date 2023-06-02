import { useState } from "react";
import './style.css'
import {Link} from 'react-router-dom'
import { auth } from "../../firebase_connection";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Home(){

    const [password, setPassword] = useState('');
  
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function Login(e){
        e.preventDefault();
        if(password == '' || email == ''){
            toast.error("Preencha todos os campos!")
        }else{
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            //Ir para página ADM
            toast.success("Login bem sucedido!")
            navigate('./admin', {replace:true})
        })
        .catch((err)=>{
            toast.error("Usuário ou senha inválidos!")
            console.log(err)
        })
        }
    }

    return(
        <div className="body">
          
           <div>
            <h1>Gerenciador de Tarefas</h1>
                
           </div>

            <form  className="forms" onSubmit={Login}>
                <h2>Login</h2>
              
   
                <input 
               
                type="email"
                name=""
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Digite o seu Email..."
                id=""
                />
              
                <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Digite sua senha..." 
                type="password"
                name=""
                id="" />
                
            <button type="submit">Entrar</button>

            <Link to='/Cadastro'>Ou cadastre-se</Link>
            </form>
           
        </div>
    )
}

export default Home;