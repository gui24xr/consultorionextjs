import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreReservations from '../store/useStoreReservations';

const ReservationsList = () => {
    const {fetchReservationsData, reservationsData, deleteReservation} = useStoreReservations()

    useEffect(()=>{
        fetchReservationsData()
    },[])

    const handlerDeleteBtn = (id) =>{
        deleteReservation(id)
      } 
    return (
        <div>
        <h3>Lista de sedes clinica</h3>
        
        {/* Tabla para mostrar las especialidades */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Status</th>
              <th>Paciente</th>
              <th>Servicio</th>
              <th>Turno</th>
              <th>Acciones</th>    
            </tr>
          </thead>
          <tbody>
            {
              reservationsData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.code}</td>
                  <td>{item.status}</td>
                  <td>{item.patient?.patientRecord}</td>
                  <td>{item.appointment?.consultationServiceData?.serviceName}</td>
                  <td>{item.appointment?.appointmentNumber}</td>
                
                 
                  <td>
                  
                    {/* Aquí puedes agregar botones para acciones adicionales */}
                    <button>Ver más</button>
                    <button type='button' onClick={()=>handlerDeleteBtn(item.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
}

export default ReservationsList;
