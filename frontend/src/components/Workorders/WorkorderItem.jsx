import {FaTrashAlt, FaEye} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {deleteWorkorder} from '../../features/workorders/workorderSlice'
import { confirmAlert } from 'react-confirm-alert'; // Import Confirm Modal
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for Confirm Delete
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react'


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

      const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
      <tr>
      <td>{workorder.id}</td>
      <td>{new Date(workorder.createdAt).toLocaleDateString('en-US')}</td>
      <td>{workorder.clientName}</td>
      <td><Button variant="outline-warning" onClick={handleShow}>
        <FaEye/>
      </Button></td>
      {(tech.role === 'admin'
        ) ? (
          <>
            <td>{workorder.techName}</td>
            <td><Button onClick={onDelete} variant="outline-danger"><FaTrashAlt/></Button></td>
          </>
        ) : (
      <></>)}
    </tr>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><b>Workorder # {workorder.id}</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Made By:</b> {workorder.techName}</p>
          <p><b>Client:</b> {workorder.clientName}</p>
          <p><b>Miles Traveled:</b> {workorder.milesTraveled}</p>
          <p><b>Time Traveled:</b> {workorder.timeTraveled}</p>
          <p><b>Start Time:</b> {workorder.startTime}</p>
          <p><b>End Time:</b> {workorder.endTime}</p>
          <p><b>Change Notes:</b> {workorder.changeNotes}</p>
          <p><b>Job Notes:</b> {workorder.jobNotes}</p>
          <p><b>Verified Network:</b> {workorder.verifyNetwork ? ('Yes') : ('No')}</p>
          <p><b>Verified WiFi:</b> {workorder.verifyWifi ? ('Yes') : ('No')}</p>
          <p><b>ISP Speed Up:</b> {workorder.speedUp}</p>
          <p><b>ISP Speed Dowm:</b> {workorder.speedDown}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</>
    )
}

export default WorkorderItem