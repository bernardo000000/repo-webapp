import React, { useEffect } from "react";
import { Route,Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx';
import { ProtectedRoute } from './componentes/ProtectedRoute.jsx';
import ActualizarEstadosPagos from './componentes/ActualizarEstadosPagos';
import dotenv from 'dotenv';

import Home from './componentes/Home'
import HomeT from './componentes/HomeT.jsx'
import Login from './componentes/Login'
import LoginT from './componentes/LoginT.jsx'
import Registrarse from './componentes/Registrarse'

import Clientes from './componentes/gerente/Clientes.jsx'
import Proyecto from './componentes/gerente/Proyecto.jsx'
import Crearcliente from './componentes/gerente/Crearcliente.jsx'
import Editarcliente from './componentes/gerente/Editarcliente.jsx'
import Verdetalle from './componentes/gerente/Verdetalle.jsx'
import Crearproyecto from './componentes/gerente/Crearproyecto.jsx'
import Editarproyecto from './componentes/gerente/Editarproyecto.jsx'
import Crearacuerdo from './componentes/gerente/Crearacuedo.jsx';
import Editaracuerdo from './componentes/gerente/Editaracuerdo.jsx';
import Crearpago from './componentes/gerente/Crearpago.jsx';
import Editarpago from './componentes/gerente/Editarpago.jsx';
import Crearavance from './componentes/gerente/Crearavance.jsx';
import Editaravance from './componentes/gerente/Editaravance.jsx';


import VerdetalleT from './componentes/trabajador/VerdetalleT.jsx';
import ProyectoT from './componentes/trabajador/ProyectoT.jsx'
import ClientesT from './componentes/trabajador/ClientesT.jsx'
import CrearavanceT from './componentes/trabajador/CrearavanceT.jsx';
import EditaravanceT from './componentes/trabajador/EditaraavanceT.jsx';
import ExtraT from './componentes/trabajador/ExtraT.jsx';

import UserRoleRedirect from './componentes/inicio/UserRoleRedirect.jsx';

import { requestForToken, onMessageListener } from './firebaseMessaging';

function App() { 
  useEffect(() => {
    requestForToken();
  }, []);

  useEffect(() => {
    onMessageListener()
      .then(payload => {
        console.log('Message received. ', payload);
        // Display the notification
      })
      .catch(err => console.log('failed: ', err));
  }, []);;



  return (
    <>
      <div className='flex min-h-screen'>
       <AuthProvider>
        <Routes>
          <Route path='/Redic' element = {<UserRoleRedirect />} />
          <Route path='/' element = { <ProtectedRoute> <Home /> </ProtectedRoute> } />
          <Route path='/T' element = { <ProtectedRoute> <HomeT /> </ProtectedRoute> } />
          <Route path='/Clientes' element = {<ProtectedRoute> <Clientes /> </ProtectedRoute> } />
          <Route path='/ClientesT' element = {<ProtectedRoute> <ClientesT /> </ProtectedRoute> } />
          <Route path='/Proyecto' element = {<ProtectedRoute> <Proyecto /> </ProtectedRoute> } />
          <Route path='/ProyectoT' element = {<ProtectedRoute> <ProyectoT /> </ProtectedRoute> } />
          <Route path='/Crearcliente' element = {<ProtectedRoute> <Crearcliente /> </ProtectedRoute> } />
          <Route path='/Crearproyecto' element = {<ProtectedRoute> <Crearproyecto /> </ProtectedRoute> } />
          <Route path='/Crearacuerdo/:id' element = {<ProtectedRoute> <Crearacuerdo /> </ProtectedRoute> } />
          <Route path='/Crearpago/:id' element = {<ProtectedRoute> <Crearpago /> </ProtectedRoute> } />
          <Route path='/Editarcliente/:id' element = {<ProtectedRoute> <Editarcliente /> </ProtectedRoute>} />
          <Route path='/Editarproyecto/:id' element = {<ProtectedRoute> <Editarproyecto /> </ProtectedRoute>}/>
          <Route path='/Editaracuerdo/:id/:acuerdoId' element = {<ProtectedRoute> <Editaracuerdo /> </ProtectedRoute>}/>
          <Route path='/Editarpago/:id/:pagoId' element = {<ProtectedRoute> <Editarpago /> </ProtectedRoute>}/>
          <Route path='/Verdetalle/:id' element = {<ProtectedRoute> <Verdetalle /> </ProtectedRoute>} />
          <Route path='/VerdetalleT/:id' element = {<ProtectedRoute> <VerdetalleT /> </ProtectedRoute>} />
          <Route path='/Crearavance/:id' element = {<ProtectedRoute> <Crearavance /> </ProtectedRoute>} />
          <Route path='/CrearavanceT/:id' element = {<ProtectedRoute> <CrearavanceT /> </ProtectedRoute>} />
          <Route path='/ExtraT/:id' element = {<ProtectedRoute> <ExtraT /> </ProtectedRoute>} />
          <Route path='/Editaravance/:id/:avanceId' element={<ProtectedRoute> <Editaravance /> </ProtectedRoute>} />
          <Route path='/EditaravanceT/:id/:avanceId' element={<ProtectedRoute> <EditaravanceT /> </ProtectedRoute>} />

          <Route path='/Login' element = {<Login />} />
          <Route path='/LoginT' element = {<LoginT />} />
          <Route path='/Registrarse' element = {<Registrarse />} />
        </Routes>
       </AuthProvider>

       
      </div>
    </>
  )
}

export default App
