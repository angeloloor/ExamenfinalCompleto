import { useState, useEffect } from 'react'
import axios from 'axios'
import Alerta from '../../components/Alerta'
import FormularioTicket from './FormularioTicket'
import TablaTickets from './TablaTickets'

const Tickets = () => {
    const [tickets, setTickets] = useState([])
    const [alerta, setAlerta] = useState({})
    const [ticketEditar, setTicketEditar] = useState(null)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    useEffect(() => {
        const obtenerTickets = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/tickets`,
                    config
                )
                setTickets(data)
            } catch (error) {
                console.error(error)
            }
        }
        obtenerTickets()
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
                <h1 className="text-4xl font-black">Tickets</h1>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setTicketEditar(null)
                        setMostrarFormulario(!mostrarFormulario)
                    }}
                >
                    {mostrarFormulario ? 'Ver Tickets' : 'Agregar Ticket'}
                </button>
            </div>

            {alerta.msg && <Alerta alerta={alerta} />}

            {mostrarFormulario ? (
                <FormularioTicket 
                    ticketEditar={ticketEditar}
                    setAlerta={setAlerta}
                    setTickets={setTickets}
                    setMostrarFormulario={setMostrarFormulario}
                />
            ) : (
                <TablaTickets 
                    tickets={tickets}
                    setTicketEditar={setTicketEditar}
                    setMostrarFormulario={setMostrarFormulario}
                    setAlerta={setAlerta}
                    setTickets={setTickets}
                />
            )}
        </>
    )
}

export default Tickets