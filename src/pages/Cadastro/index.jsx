import { useState } from "react";

import {Link} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { auth } from "../../firebase_connection";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Cadastro(){

    const [password, setPassword] = useState('');
    const [confirmP, setcomfirmP] = useState("");
    const [email, setEmail] = useState('');
    const navigate = useNavigate()
    async function Cadastro(e){
        e.preventDefault();
        if(password == '' || email == '' || confirmP == ""){
            toast.error("Preencha todos os campos!")
        }
        
        else if(confirmP != password){
            toast.error("As senhas não coincidem!")
        }
        else{
           await createUserWithEmailAndPassword(auth, email, password)
           .then(()=>{
            toast.success("Usuário cadastrado!")
            navigate('/', {replace:true})
           })
           .catch((err)=>{
            if(err.code === 'auth/week-password'){
                toast.error("Senha muito fraca! No mínimo 6 dígitos.")
            } else if(err.code === 'auth/email-already-in-use'){
                toast.error("Email já cadastrado!")
            }
           
           })
        }
    }


    return(
        <div className="w-screen bg-slate-50 p-2.5 h-screen flex flex-col items-center justify-center">
          
          <div>
            <h1 className="text-center text-4xl text-blue-950 font-bold ">Gerenciador de Tarefas</h1>
           </div>

        <form  className=" w-screen pt-12 flex flex-col items-center gap-5 " onSubmit={Cadastro}>
        <h2 className="text-center text-2xl font-semibold pb-7">Cadastre-se</h2>
            <input 
            
            type="email"
            name=""
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Digite o seu melhor Email..."
            className="border w-10/12 md:w-5/12 outline-none text-lg border-slate-200 rounded p-3"
            />
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Digite uma senha..." 
            type="password"
            name=""
            className="border w-10/12 md:w-5/12 outline-none text-lg border-slate-200 rounded p-3"
             />
             <input
            value={confirmP}
            onChange={(e)=>setcomfirmP(e.target.value)}
            placeholder="Confirmar senha..." 
            type="password"
            name=""
            className="border w-10/12 md:w-5/12 outline-none text-lg border-slate-200 rounded p-3"
             />
        <button className="bg-slate-700 w-10/12 md:w-5/12 text-white p-2.5 font-semibold rounded" type="submit">Cadastrar</button>

        <Link className="text-center underline " to='/'>Voltar para Login</Link>
        </form>
       
    </div>
    )
}

 