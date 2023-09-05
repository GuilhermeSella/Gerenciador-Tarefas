import { useState } from "react";
import '../Home/style.css'
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
        <div className="body">
          
          <div>
            <h1>Gerenciador de Tarefas</h1>
           </div>

        <form  className="forms" onSubmit={Cadastro}>
        <h2>Cadastre-se</h2>
            <input 
            
            type="email"
            name=""
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Digite o seu melhor Email..."

            />
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Digite uma senha..." 
            type="password"
            name=""
             />
             <input
            value={confirmP}
            onChange={(e)=>setcomfirmP(e.target.value)}
            placeholder="Confirmar senha..." 
            type="password"
            name=""
             />
        <button type="submit">Cadastrar</button>

        <Link to='/'>Voltar para Login</Link>
        </form>
       
    </div>
    )
}

 