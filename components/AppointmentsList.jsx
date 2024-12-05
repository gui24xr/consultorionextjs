import React,{useEffect} from 'react';
import useStoreAppointments from '../store/useStoreAppointments';
import './styles/SpecialtiesList.css'

const AppointmentsList = () => {

    const {appointmentsData,fetchAppointmentsData,deleteAppointment} = useStoreAppointments()

    useEffect(()=>{
        fetchAppointmentsData()
    },[])

    
  
  const handlerDeleteBtn = (id) =>{
    deleteAppointment(id)
  }

    return (
        <div>
        <h3>Lista de turnos</h3>
        
        {/* Tabla para mostrar las especialidades */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Numero</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Servicio</th>
              <th>Medico</th>
              <th>Reservado por</th>
              <th>Acciones</th>    
            </tr>
          </thead>
          <tbody>
            {
              appointmentsData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.appointmentNumber}</td>
                  <td>{item.date}</td>
                  <td>{item.hour}</td>
                  <td>{item.appointmentType}</td>
                  <td>{item.appointmentStatus}</td>
                  <td> {item.consultationServiceData?.serviceName}</td>
                  <td>{item.consultationServiceData?.medicData?.personalData?.lastName} {item.consultationServiceData?.medicData?.personalData?.firstName}</td>
                  <td>{item.reservation?.patient?.patientRecord} {item.reservation?.patient?.personalData?.firstName} {item.reservation?.patient?.personalData?.firstName}</td>
                  <td>
                  
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

export default AppointmentsList;
