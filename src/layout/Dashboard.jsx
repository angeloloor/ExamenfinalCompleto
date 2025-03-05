import { Outlet, Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { UserCircleIcon, HomeIcon } from '@heroicons/react/24/solid'

const Dashboard = () => {
    const { auth } = useContext(AuthContext)

    return (
        <div className="min-h-screen w-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 flex-shrink-0">
                <div className="p-6 flex flex-col items-center">
                    <UserCircleIcon className="h-24 w-24 text-white mb-4" />
                    <h2 className="text-xl font-bold text-white text-center">Sistema de asistencia de tickets</h2>
                    <p className="text-gray-400 text-sm mt-2 text-center">
                        Bienvenido - {auth.nombre || 'Usuario'}
                    </p>
                </div>
                <nav className="mt-6">
                    <Link 
                        to="/dashboard/modulos"
                        className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700"
                    >
                        <HomeIcon className="h-5 w-5 mr-2" />
                        Volver a Módulos
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden bg-gray-100">
                <header className="bg-white shadow">
                    <div className="w-full px-8 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <UserCircleIcon className="h-10 w-10 text-gray-500" />
                            <h2 className="text-lg font-medium text-gray-700">
                                Bienvenido - {auth.nombre || 'Usuario'}
                            </h2>
                        </div>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            onClick={() => {
                                localStorage.removeItem('token')
                                window.location.href = '/'
                            }}
                        >
                            Salir
                        </button>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Dashboard 