import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createInvoice} from '../features/invoices/invoiceSlice'


function InvoiceForm() {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        clientName: '',
        startTime: '',
        endTime: '',
        milesTraveled: 0,
        timeTraveled: 0,
        changeNotes: '',
        jobNotes: '',
        verifyNetwork: false,
        verifyWifi: false,
        speedUp: 0,
        speedDown: 0
    })

    const {
        clientName,
        startTime,
        endTime,
        milesTraveled,
        timeTraveled,
        changeNotes,
        jobNotes,
        verifyNetwork,
        verifyWifi,
        speedUp,
        speedDown
    } = formData

    // Function to control the state of the itmes being typed
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onCheck = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createInvoice(formData))
        setFormData({
            clientName: '',
            startTime: '',
            endTime: '',
            milesTraveled: 0,
            timeTraveled: 0,
            changeNotes: '',
            jobNotes: '',
            verifyNetwork: false,
            verifyWifi: false,
            speedUp: 0,
            speedDown: 0
        })

    }

    return (
    <section className="form">
        <form onSubmit={onSubmit} >
            <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
                <input type="text" name='clientName' id='clientName' value={clientName} onChange={onChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input type="time" name='startTime' id='startTime' value={startTime} onChange={onChange} required/>
            </div>
            <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input type="time" name='endTime' id='endTime' value={endTime} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="milesTraveled">Miles Traveled</label>
                <input type="number" name='milesTraveled' id='milesTraveled' value={milesTraveled} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="timeTraveled">Time Traveled</label>
                <input type="number" name='timeTraveled' id='timeTraveled' value={timeTraveled} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="changeNotes">Change Notes (Documentation)</label>
                <textarea type="textarea" name='changeNotes' id='changeNotes' value={changeNotes} onChange={onChange} />
            </div>
            <div className="form-group">
                <label htmlFor="jobNotes">Job Notes (Work on Site)</label>
                <textarea type="textarea" name='jobNotes' id='jobNotes' value={jobNotes} onChange={onChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="verifyNetwork">Verify Network</label>
                <input type="checkbox" name='verifyNetwork' id='verifyNetwork' value={!verifyNetwork} checked={verifyNetwork} onChange={onCheck} />
            </div>
            {verifyNetwork ?
            <>
                <div className="form-group">
                <label htmlFor="verifyWifi">Verify WiFi</label>
                <input type="checkbox" name='verifyWifi' id='verifyWifi' value={!verifyWifi} checked={verifyWifi} onChange={onCheck} />
                </div>
                <div className="form-group">
                    <label htmlFor="speedUp">Speed Up</label>
                    <input type="number" name='speedUp' id='speedUp' value={speedUp} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="speedDown">Speed Down</label>
                    <input type="number" name='speedDown' id='speedDown' value={speedDown} onChange={onChange} />
                </div>
            </> : null}
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Submit</button>
            </div>
        </form>
    </section>
    )
}

export default InvoiceForm