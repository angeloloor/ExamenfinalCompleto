import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider, { AuthContext } from './context/AuthProvider'
import RutaProtegida from './components/RutaProtegida'
import Login from './pages/Login'
import Dashboard from './layout/Dashboard'
import Clientes from './pages/clientes/Clientes'
import Tecnicos from './pages/tecnicos/Tecnicos'
import Tickets from './pages/tickets/Tickets'
import Modulos from './pages/Modulos'
import { useContext } from 'react'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="/dashboard" element={<RutaProtegida />}>
            <Route element={<Dashboard />}>
              <Route index element={<Modulos />} />
              <Route path="modulos" element={<Modulos />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="tecnicos" element={<Tecnicos />} />
              <Route path="tickets" element={<Tickets />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext)
  return !auth._id ? children : <Navigate to="/dashboard" />
}

export default App
