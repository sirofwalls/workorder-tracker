import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createWorkorder} from '../../features/workorders/workorderSlice'


function WorkorderForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


  const {clients} = useSelector((state) => state.clients)

    const [formData, setFormData] = useState({
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

    const [selectData, setSelectData] = useState({
        clientName: '',
        clientNumber: ''
    })

    const {
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

    const {
        clientName,
        clientNumber
    } = selectData

    const allData = {
        ...selectData, ...formData
    }

    // Function to control the state of the itmes being typed
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onCheck = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }))
    }

    const onSelect = (e) => {
        const idx = e.target.selectedIndex;
        const option = e.target.querySelectorAll('option')[idx];
        const number = option.getAttribute('number');
        setSelectData((prevState) => ({
            ...prevState,
            clientName: e.target.value,
            clientNumber: number
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createWorkorder(allData))
        
        setFormData({
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

        setSelectData({
            clientName: '',
            clientNumber: ''
        })

        navigate('/')
    }

    return (
    <section className="form">
        <form onSubmit={onSubmit} >
            <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
                <select onChange={onSelect}>
                    <option></option>
                    {clients.map((client) => (
                        <option key={client.id} name={client.clientName} value={client.clientName} number={client.clientNumber}>{client.clientName}</option>
                    ))}
                 </select>
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
                <button className="btn btn-block btn-dark" type='submit'>Submit</button>
            </div>
        </form>
    </section>
    )
}

export default WorkorderForm