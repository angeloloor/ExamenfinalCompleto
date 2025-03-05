import { useState, useEffect } from 'react'
import axios from 'axios'

const FormularioTicket = ({ ticketEditar, setAlerta, setTickets, setMostrarFormulario }) => {
    const [clientes, setClientes] = useState([])
    const [tecnicos, setTecnicos] = useState([])
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        id_cliente: '',
        id_tecnico: ''
    })

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const [clientesRes, tecnicosRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/clientes`, config),
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/tecnicos`, config)
                ])
                setClientes(clientesRes.data)
                setTecnicos(tecnicosRes.data)
            } catch (error) {
                console.error(error)
                setAlerta({
                    msg: 'Error al cargar los datos',
                    error: true
                })
            }
        }
        obtenerDatos()
    }, [])

    useEffect(() => {
        if (ticketEditar) {
            setFormData({
                codigo: ticketEditar.codigo,
                descripcion: ticketEditar.descripcion,
                id_cliente: ticketEditar.id_cliente?._id,
                id_tecnico: ticketEditar.id_tecnico?._id
            })
        }
    }, [ticketEditar])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (Object.values(formData).includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            if (ticketEditar) {
                await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/ticket/${ticketEditar._id}`,
                    formData,
                    config
                )
                setAlerta({ msg: 'Ticket actualizado correctamente', error: false })
            } else {
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/ticket`,
                    formData,
                    config
                )
                setAlerta({ msg: 'Ticket agregado correctamente', error: false })
            }

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/tickets`,
                config
            )
            setTickets(data)
            setMostrarFormulario(false)
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg || 'Hubo un error',
                error: true
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Código
                    </label>
                    <input
                        type="text"
                        value={formData.codigo}
                        onChange={e => setFormData({...formData, codigo: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el código"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Cliente
                    </label>
                    <select
                        value={formData.id_cliente}
                        onChange={e => setFormData({...formData, id_cliente: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">-- Seleccione un cliente --</option>
                        {clientes.map(cliente => (
                            <option key={cliente._id} value={cliente._id}>
                                {cliente.nombre} {cliente.apellido} - {cliente.cedula}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Técnico
                    </label>
                    <select
                        value={formData.id_tecnico}
                        onChange={e => setFormData({...formData, id_tecnico: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">-- Seleccione un técnico --</option>
                        {tecnicos.map(tecnico => (
                            <option key={tecnico._id} value={tecnico._id}>
                                {tecnico.nombre} {tecnico.apellido}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Descripción
                    </label>
                    <textarea
                        value={formData.descripcion}
                        onChange={e => setFormData({...formData, descripcion: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese una descripción del problema"
                        rows="3"
                        required
                    />
                </div>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {ticketEditar ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default FormularioTicket