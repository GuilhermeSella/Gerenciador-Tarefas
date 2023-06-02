import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Cadastro from '../pages/Cadastro'
import Admin from '../pages/Admin'
import Private from './Private'


function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/cadastro' element={<Cadastro/>}/>
                <Route path='/admin' element={<Private> <Admin/> </Private>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp