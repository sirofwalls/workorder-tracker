import {FaTrashAlt} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {deleteClient} from '../features/clients/clientSlice'
import { confirmAlert } from 'react-confirm-alert'; // Import Confirm Modal
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css for Confirm Modal

function ClientItem({client, tech}) {
    const dispatch = useDispatch()

    const onDelete = () =>
    confirmAlert({
        title: 'Confirm to delete',
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
    <tr>
      <td>{client.clientNumber}</td>
      <td>{client.clientName}</td>
      {(tech.role === 'admin'
        ) ? (
            <td><button onClick={onDelete} className="close"><FaTrashAlt/></button></td>
        ) : (
      <></>)}
    </tr>

  )
}

export default ClientItem