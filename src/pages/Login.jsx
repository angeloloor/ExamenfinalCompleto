import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'
import { AuthContext } from '../context/AuthProvider'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    const navigate = useNavigate()
    const { setAuth } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email,
                password
            })
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/dashboard')
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || 'Error al iniciar sesión',
                error: true
            })
        }
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            <div className="w-full sm:w-96 mx-4">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="mb-8">
                        <h2 className="text-center text-3xl font-bold text-gray-900">
                            Sistema de Gestion de Tickets de asistencia técnica
                        </h2>
                        <p className="text-center text-gray-600 mt-2">
                            Iniciar Sesión
                        </p>
                    </div>
                    
                    {alerta.msg && <Alerta alerta={alerta} />}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Tu Email"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Tu Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login 