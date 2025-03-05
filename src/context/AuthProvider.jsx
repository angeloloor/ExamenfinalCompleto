import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/perfil`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setAuth(data)
            } catch (error) {
                console.log(error)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider