import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreHealthProviders from '../store/useHealthProvidersStore';

const HealthProvidersList = () => {

    const {fetchHealthProvidersData, healthProvidersData, deleteHealthProvider} = useStoreHealthProviders()
    useEffect(()=>{
        fetchHealthProvidersData()
    },[])

    const handlerDeleteBtn = (id) =>{
        deleteHealthProvider(id)
      } 
    return (
        <div>
        <h3>Lista de sedes clinica</h3>
        
        {/* Tabla para mostrar las especialidades */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Cantidad Pacientes</th>
            </tr>
          </thead>
          <tbody>
            {
              healthProvidersData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.providerName}</td>
                  <td>{item.planName}</td>
                  <td>{item.status}</td>
                  <td>{item.patientsList?.length}</td>
               
                
                 
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

export default HealthProvidersList;
