import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreConsultationServices from '../store/useStoreConsultationServices';


const ConsultationsServiceList = () => {

    const {consultationServicesData,fetchConsultationServicesData,deleteConsultationService} = useStoreConsultationServices()

    

  useEffect(() => {
    fetchConsultationServicesData()
  }, []);

  
  const handlerDeleteBtn = (id) =>{
    deleteConsultationService(id)
  }

    return (
        <div>
        <h3>Lista de Servicios de consulta</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Codigo Especialidad</th> 
              <th>Medico</th>
               <th>Consultorio actual</th>
            </tr>
          </thead>
          <tbody>
            {
              consultationServicesData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.serviceName}</td>
                  <td>{item.medic?.specialty?.name}</td>
                  <td>{item.medic?.specialty?.code}</td>
                  <td>{item.medic?.personalInformation?.lastName} {item.medic?.personalInformation?.firstName}</td>
                  <td>{item.consultingRoom?.name}</td>
                
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

export default ConsultationsServiceList;
