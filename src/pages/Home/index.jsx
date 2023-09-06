import { useState } from "react";

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
        <div className="w-screen bg-slate-50 p-2.5 h-screen flex flex-col items-center justify-center" >
          
           <div>
            <h1 className="text-center text-4xl text-blue-950 font-bold ">Gerenciador de Tarefas</h1>
                
           </div>

            <form  className=" w-screen pt-12 flex flex-col items-center gap-5 " onSubmit={Login}>
                <h2 className="text-center text-2xl font-semibold pb-7">Entre com sua conta</h2>    
                <input 
                type="email"
                name=""
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Digite o seu Email..."
                className="border w-10/12 md:w-5/12 outline-none text-lg border-slate-200 rounded p-3"
                />
        
             
              
                <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Digite sua senha..." 
                type="password"
                name=""
                className="border w-10/12 md:w-5/12 outline-none text-lg border-slate-200 rounded p-3"
                 />
                
            <button className="bg-slate-700 w-10/12 md:w-5/12 text-white p-2.5 font-semibold rounded" type="submit">Entrar</button>

            <Link className="text-center underline " to='/Cadastro'>Ou cadastre-se</Link>
            </form>
           
        </div>
    )
}

export default Home;