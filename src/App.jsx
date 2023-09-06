import { useState } from 'react'
import RoutesApp from './routes'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  
 

  return (
    <div className='app'>
      <ToastContainer autoClose={2000}/>
      <RoutesApp >
        
      </RoutesApp>
    </div>
  )
}

export default App;
