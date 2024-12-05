import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStorePatientHealthProviders from '../store/useStorePatientHealthProvider';


const PatientHealthProvidersList = () => {

    const {patientHealthProvidersData, fetchPatientHealthProvidersData, deletePatientHealthProvider} = useStorePatientHealthProviders()

    useEffect(()=>{
        fetchPatientHealthProvidersData()
    },[])

    const handlerDeleteBtn = (id) =>{
        deletePatientHealthProvider(id)
      } 

    return (
        <div>
        <h3>Pacientes-Obras Sociales</h3>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Paciente</th>
              <th>Datos Obra Social</th>
              <th>Acciones</th>    
            </tr>
          </thead>
          <tbody>
            {
              patientHealthProvidersData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.patient?.patientRecord} + "||" {item.patient?.personalData?.lastName + item.patient?.personalData?.firstName} </td>
                  <td>{item.healthProvider?.providerName} {item.healthProvider?.planName} {" || " + item.healthProvider?.status}</td>
            
                
                 
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

export default PatientHealthProvidersList;
