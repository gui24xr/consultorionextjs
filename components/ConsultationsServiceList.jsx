import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreConsultationServices from '../store/useStoreConsultationServices';


const ConsultationsServiceList = () => {

    const {consultationServicesData,fetchConsultationServicesData,deleteConsultationService} = useStoreConsultationServices()

    

  useEffect(() => {
    fetchConsultationServicesData()
  }, []);

  
  const handlerDeleteBtn = (consultationServiceId) =>{
    deleteConsultationService(consultationServiceId)
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
                <tr key={item.consultationServiceId}>
                  <td>{item.consultationServiceId}</td>
                  <td>{item.serviceName}</td>

                  <td>{item.specialtyData?.name}</td>
                  <td>{item.specialtyData?.code}</td>
                  <td>{item.medicData?.personalData?.lastName} {item.medicData?.personalData?.firstName}</td>
                  <td>{item.consultingRoom?.name}</td>
                
                  <td>
                    <button>Ver más</button>
                    <button type='button' onClick={()=>handlerDeleteBtn(item.consultationServiceId)}>Eliminar</button>
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
