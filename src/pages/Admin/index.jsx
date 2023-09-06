
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
        <div className='h-screen w-screen flex flex-col items-center justify-start py-10 px-5 bg-slate-50'>
         
            <form  className='w-screen pt-12 flex flex-col items-center gap-4 pb-10 ' onSubmit={AdicionarTarefa}>
                <h2  className="text-center text-4xl font-semibold pb-7">Tarefas</h2>
                <textarea 
                cols="30"
                rows="10"
                placeholder='Digite a sua tarefa'
                value={tarefa}
                className='border border-slate-200 h-24 w-10/12 rounded p-3 resize-none outline-none'
                onChange={(e)=>setTarefa(e.target.value)}
                >
                    
                </textarea>
               {Object.keys(edit).length > 0 ? (
                 <button type="submit" className='p-2 bg-purple-700 rounded w-10/12 '>Atualizar</button>
               ) : (
                <button className='p-2 rounded w-10/12  bg-slate-800 text-white' type="submit" >Adicionar</button>
               )}
            </form>

            {listTarefas.map((item)=>(
              <section key={item.id} className='border border-slate-800 p-3 rounded-sm'>
                 
                <div className=''>
                    <p>{item.tarefa}</p>
                </div>
                <div className='flex gap-3'>
                    <button onClick={() => editTarefa(item)} className='buttonEditar'>Editar</button>
                   <button onClick={()=>deleteTarefa(item.id)} className='buttonConcluir'>Concluir</button>
                </div>
              </section>  
            ))}
           
            <button className='fixed left-5 bottom-16 bg-red-400 py-2 rounded text-white w-20' onClick={signOut}>Sair</button>
        </div>
    )
}