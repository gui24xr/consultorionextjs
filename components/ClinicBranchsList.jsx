import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreClinicBranchs from '../store/useClinicBranchsStore';


const ClinicBranchsList = () => {

    const {clinicBranchsData,fetchClinicBranchsData,deleteClinicBranch} = useStoreClinicBranchs()

    useEffect(()=>{
        fetchClinicBranchsData()
    },[])

    const handlerDeleteBtn = (id) =>{
        deleteClinicBranch(id)
      }

    return (
         <div>
        <h3>Lista de sedes clinica</h3>
        
        {/* Tabla para mostrar las especialidades */}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre Sede</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Cantidad consultorios</th>
              <th>Acciones</th>    
            </tr>
          </thead>
          <tbody>
            {
              clinicBranchsData?.reverse().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>IMPLEMENTAR</td>
                  <td>IMPLEMENTAR</td>
                
                  <td>{item.consultingRooms?.length || 'S/D' }</td>
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

export default ClinicBranchsList;
