import {FaTrashAlt} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {deleteInvoice} from '../features/invoices/invoiceSlice'

function InvoiceItem({invoice, tech}) {
    const dispatch = useDispatch()

    // const {tech} = useSelector((state) => state.auth)

    return (
    <div className="invoice">
        <div>
            {(
                tech.id === invoice.id || tech.role === 'admin'
            ) ? (
                <button onClick={() => dispatch(deleteInvoice(invoice._id))} className="close"><FaTrashAlt/></button>
            ) : (<></>)}

            {new Date(invoice.createdAt).toLocaleDateString('en-US')}
            {<h2>{invoice.clientName}</h2>}

            {<p>Tech Name: {invoice.techName}</p>}

            {<p>Start Time: {invoice.startTime}</p>}

            {<p>End Time: {invoice.endTime}</p>}

            {invoice.milesTraveled > 0 ? (<p>Miles traveled: {invoice.milesTraveled}</p>) : (<></>)}

            {invoice.timeTraveled > 0 ? (<p>Time traveled: {invoice.timeTraveled}</p>) : (<></>)}

            {invoice.changeNotes ? (<p>Change Notes: {invoice.changeNotes}</p>) : (<></>)}

            {<p>Job Notes: {invoice.jobNotes}</p>}

            {invoice.verifyNetwork ? (<p>Verify Network: Yes</p>) : (<p>Verify Network: No</p>)}

            {invoice.verifyWifi ? (<p>Verify WiFi: Yes</p>) : (<p>Verify WiFi: No</p>)}

            {invoice.verifyNetwork ? (<p>Up Speed: {invoice.speedUp}</p>) : (<></>)}

            {invoice.verifyNetwork ? (<p>Down Speed: {invoice.speedDown}</p>) : (<></>)}
            
        </div>
    </div>
    )
}

export default InvoiceItem