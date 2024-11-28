import React,{useEffect} from 'react';
import './styles/SpecialtiesList.css'
import useStoreClinicBranchs from '../store/useClinicBranchsStore';
import { isHTTPMethod } from 'next/dist/server/web/http';

const ClinicBranchsList = () => {

    const {clinicBranchsData,fetchClinicBranchsData,deleteClinicBranch} = useStoreClinicBranchs()

    useEffect(()=>{
        fetchClinicBranchsData()
    },[])

    const handlerDeleteBtn = (clinicBranchId) =>{
        deleteClinicBranch(clinicBranchId)
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
                <tr key={item.clinicBranchId}>
                  <td>{item.clinicBranchId}</td>
                  <td>{item.name}</td>
                  <td>IMPLEMENTAR</td>
                  <td>IMPLEMENTAR</td>
                
                  <td>{item.consultingRoomsList?.length || 'S/D' }</td>
                  <td>
                  
                    {/* Aquí puedes agregar botones para acciones adicionales */}
                    <button>Ver más</button>
                    <button type='button' onClick={()=>handlerDeleteBtn(item.clinicBranchId)}>Eliminar</button>
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
