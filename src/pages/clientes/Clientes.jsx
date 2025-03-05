import { useState, useEffect } from 'react'
import axios from 'axios'
import Alerta from '../../components/Alerta'
import FormularioCliente from './FormularioCliente'
import TablaClientes from './TablaClientes'

const Clientes = () => {
    const [clientes, setClientes] = useState([])
    const [alerta, setAlerta] = useState({})
    const [clienteEditar, setClienteEditar] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/clientes`,
                    config
                )
                setClientes(data)
            } catch (error) {
                console.error(error)
            }
        }
        obtenerClientes()
    }, [])

    useEffect(() => {
        if(alerta.msg) {
            const timer = setTimeout(() => {
                setAlerta({})
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [alerta])

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black">Clientes</h1>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setClienteEditar(null)
                        setMostrarFormulario(!mostrarFormulario)
                    }}
                >
                    {mostrarFormulario ? 'Ver Clientes' : 'Agregar Cliente'}
                </button>
            </div>

            {alerta.msg && <Alerta alerta={alerta} />}

            {mostrarFormulario ? (
                <FormularioCliente 
                    clienteEditar={clienteEditar}
                    setAlerta={setAlerta}
                    setClientes={setClientes}
                    setMostrarFormulario={setMostrarFormulario}
                />
            ) : (
                <TablaClientes 
                    clientes={clientes}
                    setClienteEditar={setClienteEditar}
                    setMostrarFormulario={setMostrarFormulario}
                    setAlerta={setAlerta}
                    setClientes={setClientes}
                />
            )}
        </>
    )
}

export default Clientes