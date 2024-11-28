import React,{useEffect} from 'react';
import useStoreConsultingRooms from '../store/useStoreConsultingRooms';
import './styles/SpecialtiesList.css'
const ConsultingRoomsList = () => {
    const {consultingRoomsData,fetchConsultingRoomsData, deleteConsultingRoom}=useStoreConsultingRooms()

    useEffect(()=>{
        fetchConsultingRoomsData()
    },[])

    const handlerDeleteBtn = (consultingRoomId) =>{
        deleteConsultingRoom(consultingRoomId)
      }

    return (
        <div>
        <h3>Lista de consultorios</h3>
    
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Sede</th>
              <th>Estado</th>
              <th>Ocupacion</th>
            
            </tr>
          </thead>
          <tbody>
            {
              consultingRoomsData?.reverse().map((item) => (
                <tr key={item.consultingRoomId}>
                  <td>{item.consultingRoomId}</td>
                  <td>{item.name}</td>
                  <td>{item.clinicBranch?.name}</td>
                  <td>{item.status}</td>
                  <td>{item.consultationServiceData?.serviceName}</td>
                 
                  <td>
                    <button>Ver más</button>
                    <button type='button' onClick={()=>handlerDeleteBtn(item.consultingRoomId)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
}

export default ConsultingRoomsList;
