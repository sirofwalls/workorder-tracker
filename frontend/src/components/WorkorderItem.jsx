import {FaTrashAlt} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {deleteWorkorder} from '../features/workorders/workorderSlice'
import { confirmAlert } from 'react-confirm-alert'; // Import Confirm Modal
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for Confirm Modal


function WorkorderItem({workorder, tech}) {
    const dispatch = useDispatch()

    const onDelete = () =>
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => dispatch(deleteWorkorder(workorder.id))
          },
          {
            label: 'No',
          }
        ]
      })

    return (
    <div className="workorder">
        <div>
            {(
                tech.id === workorder.id || tech.role === 'admin'
            ) ? (
                <button onClick={onDelete} className="close"><FaTrashAlt/></button>
            ) : (<></>)}

            {new Date(workorder.createdAt).toLocaleDateString('en-US')}
            {<h2>{workorder.clientName}</h2>}

            {<p>Tech Name: {workorder.techName}</p>}

            {<p>Start Time: {workorder.startTime}</p>}

            {<p>End Time: {workorder.endTime}</p>}

            {workorder.milesTraveled > 0 ? (<p>Miles traveled: {workorder.milesTraveled}</p>) : (<></>)}

            {workorder.timeTraveled > 0 ? (<p>Time traveled: {workorder.timeTraveled}</p>) : (<></>)}

            {workorder.changeNotes ? (<p>Change Notes: {workorder.changeNotes}</p>) : (<></>)}

            {<p>Job Notes: {workorder.jobNotes}</p>}

            {workorder.verifyNetwork ? (<p>Verify Network: Yes</p>) : (<p>Verify Network: No</p>)}

            {workorder.verifyNetwork ? (<p>Verify WiFi: Yes</p>) : (<></>)}

            {workorder.verifyNetwork ? (<p>Up Speed: {workorder.speedUp}</p>) : (<></>)}

            {workorder.verifyNetwork ? (<p>Down Speed: {workorder.speedDown}</p>) : (<></>)}
            
        </div>
    </div>
    )
}

export default WorkorderItem