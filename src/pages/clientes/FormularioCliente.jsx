import { useState, useEffect } from 'react'
import axios from 'axios'

const FormularioCliente = ({ clienteEditar, setAlerta, setClientes, setMostrarFormulario }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        fecha_nacimiento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        email: '',
        dependencia: ''
    })

    useEffect(() => {
        if (clienteEditar) {
            const clienteFormateado = {
                ...clienteEditar,
                fecha_nacimiento: new Date(clienteEditar.fecha_nacimiento).toISOString().split('T')[0]
            }
            setFormData(clienteFormateado)
        }
    }, [clienteEditar])

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

            if (clienteEditar) {
                await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/cliente/${clienteEditar._id}`,
                    formData,
                    config
                )
                setAlerta({ msg: 'Cliente actualizado correctamente', error: false })
            } else {
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/cliente`,
                    formData,
                    config
                )
                setAlerta({ msg: 'Cliente agregado correctamente', error: false })
            }

            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/clientes`,
                config
            )
            setClientes(data)
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
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el nombre"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Apellido
                    </label>
                    <input
                        type="text"
                        value={formData.apellido}
                        onChange={e => setFormData({...formData, apellido: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el apellido"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Cédula
                    </label>
                    <input
                        type="text"
                        value={formData.cedula}
                        onChange={e => setFormData({...formData, cedula: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la cédula"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        value={formData.telefono}
                        onChange={e => setFormData({...formData, telefono: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese el teléfono"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Ciudad
                    </label>
                    <input
                        type="text"
                        value={formData.ciudad}
                        onChange={e => setFormData({...formData, ciudad: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la ciudad"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        value={formData.fecha_nacimiento}
                        onChange={e => setFormData({...formData, fecha_nacimiento: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Dependencia
                    </label>
                    <input
                        type="text"
                        value={formData.dependencia}
                        onChange={e => setFormData({...formData, dependencia: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la dependencia"
                    />
                </div>

                <div className="mb-4 col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Dirección
                    </label>
                    <textarea
                        value={formData.direccion}
                        onChange={e => setFormData({...formData, direccion: e.target.value})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingrese la dirección"
                        rows="3"
                    />
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {clienteEditar ? 'Actualizar' : 'Guardar'}
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

export default FormularioCliente