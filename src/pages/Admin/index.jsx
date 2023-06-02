import './admin.css'
import {signOut} from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase_connection'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Admin(){

    const [tarefa, setTarefa] = useState("")
    const [listTarefas, setlistTarefas] = useState([])
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})
  

    useEffect(()=>{
        
        async function loadTarefas(){
            const userDetail = localStorage.getItem('@detailUser');
            setUser(JSON.parse(userDetail))

            if(userDetail){
                const data = JSON.parse(userDetail);
                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q,(snapshot)=>{
                    let list = [];
                    snapshot.forEach((item)=>{
                        list.push({
                            id:item.id,
                            tarefa:item.data().tarefa,
                            userUid:item.data().userUid
                        })
                    })
                    console.log(list)
                    setlistTarefas(list);
                    setContador(+1)
                })
            }
    



        }
        loadTarefas();

        



    },[])

    async function AdicionarTarefa(e){
        e.preventDefault();
        if(tarefa === ""){
           toast.error("Digite sua tarefa no campo!")
            return;
        }

        if(edit?.id){
            updateTarefa();
            return;
        }

        await addDoc(collection(db,"tarefas"),{
            tarefa:tarefa,
            created: new Date(),
            userUid: user?.uid
        })
        .then(()=>{
            toast.success("Tarefa adicionada!")
            setTarefa('')
            
        })
        .catch(()=>{
            toast.error("Erro em adicionar tarefa!")
            setTarefa('')

        })
    }

    async function signOut() {
        try {
          await auth.signOut(); // Use a função signOut do objeto auth para fazer o logout do usuário
          console.log('Usuário desconectado com sucesso');
        } catch (error) {
          console.log('Erro ao fazer logout:', error);
        }
      }

     async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
        .then(()=>{
            toast.success("Tarefa concluida!")
        })
        .catch((err)=>{
            alert("erro")
        })
     }
      function editTarefa(item){
        setTarefa(item.tarefa)
        setEdit(item)
     }

     async function updateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(()=>{
            toast.success("Tarefa atualizada!")
            setEdit({})
            setTarefa('')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className='container'>
         
            <form  className='forms' onSubmit={AdicionarTarefa}>
                <h2>Tarefas</h2>
                <textarea name="" id="" cols="30" rows="10" placeholder='Digite a sua tarefa' value={tarefa}
                onChange={(e)=>setTarefa(e.target.value)}
                ></textarea>
               {Object.keys(edit).length > 0 ? (
                 <button type="submit" style={{backgroundColor: 'rgb(152, 83, 255)'}}>Atualizar</button>
               ) : (
                <button type="submit" >Adicionar</button>
               )}
            </form>

            {listTarefas.map((item)=>(
              <section key={item.id} className='listaTarefas'>
                 
                <div>
                   
                    <p>{item.tarefa}</p>
                </div>
                <div>
                    <button onClick={() => editTarefa(item)} className='buttonEditar'>Editar</button>
                   <button onClick={()=>deleteTarefa(item.id)} className='buttonConcluir'>Concluir</button>
                </div>
              </section>  
            ))}
           
            <button className='signOut' onClick={signOut}>Sair</button>
        </div>
    )
}