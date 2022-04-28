import {FaTrashAlt} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {deleteClient} from '../features/clients/clientSlice'
import { confirmAlert } from 'react-confirm-alert'; // Import Confirm Modal
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for Confirm Modal

function ClientItem({client, tech}) {
    const dispatch = useDispatch()

    const onDelete = () =>
    confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => dispatch(deleteClient(client._id))
          },
          {
            label: 'No',
          }
        ]
      })

  return (
    <div className="invoice">
        <div>
            {(
                tech.role === 'admin'
            ) ? (
                <button onClick={onDelete} className="close"><FaTrashAlt/></button>
            ) : (<></>)}

            {<p>Client Name: {client.clientName}</p>}

            {<p>Client Number: {client.clientNumber}</p>}
            
        </div>
    </div>
  )
}

export default ClientItem