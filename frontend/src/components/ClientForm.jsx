import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createClient} from '../features/clients/clientSlice'

function ClientForm() {
    const dispatch = useDispatch()

    const [clientData, setClientData] = useState({
        clientName: '',
        clientNumber: 0
    })

    const {
        clientName,
        clientNumber
    } = clientData


    const onChange = (e) => {
        setClientData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createClient(clientData))

        setClientData({
            clientName: '',
            clientNumber: 0
        })
    }

    return (
    <>
    <section className="form">
        <form onSubmit={onSubmit} >
            <div className="form-group">
                <label htmlFor="name">Client Name</label>
                <input name='clientName' id='clientName' value={clientName} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="name">Client Number</label>
                <input type="number" name='clientNumber' id='clientNumber' value={clientNumber} onChange={onChange}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block btn-dark" type='submit'>Add Client</button>
            </div>
        </form>
    </section>
    </>
    )
}

export default ClientForm