import { useState, useEffect } from 'react'
import axios from 'axios'
import Alerta from '../../components/Alerta'
import FormularioTecnico from './FormularioTecnico'
import TablaTecnicos from './TablaTecnicos'

const Tecnicos = () => {
    const [tecnicos, setTecnicos] = useState([])
    const [alerta, setAlerta] = useState({})
    const [tecnicoEditar, setTecnicoEditar] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    useEffect(() => {
        const obtenerTecnicos = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/tecnicos`,
                    config
                )
                setTecnicos(data)
            } catch (error) {
                console.error(error)
            }
        }
        obtenerTecnicos()
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
                <h1 className="text-4xl font-black">Técnicos</h1>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setTecnicoEditar(null)
                        setMostrarFormulario(!mostrarFormulario)
                    }}
                >
                    {mostrarFormulario ? 'Ver Técnicos' : 'Agregar Técnico'}
                </button>
            </div>

            {alerta.msg && <Alerta alerta={alerta} />}

            {mostrarFormulario ? (
                <FormularioTecnico 
                    tecnicoEditar={tecnicoEditar}
                    setAlerta={setAlerta}
                    setTecnicos={setTecnicos}
                    setMostrarFormulario={setMostrarFormulario}
                />
            ) : (
                <TablaTecnicos 
                    tecnicos={tecnicos}
                    setTecnicoEditar={setTecnicoEditar}
                    setMostrarFormulario={setMostrarFormulario}
                    setAlerta={setAlerta}
                    setTecnicos={setTecnicos}
                />
            )}
        </>
    )
}

export default Tecnicos