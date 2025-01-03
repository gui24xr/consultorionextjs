import React, {  useEffect } from 'react';
import useStoreMedics from '../store/useStoreMedics';
import './styles/SpecialtiesList.css'

const MedicsList = () => {
  
  const { medicsData, fetchMedicsData, deleteMedic } = useStoreMedics() 


  useEffect(() => {
    fetchMedicsData()
  }, []);

  
  const handlerDeleteBtn = (id) =>{
    deleteMedic(id)
  }

  return (
    <div>
      <h3>Lista de Medicos</h3>
      
      {/* Tabla para mostrar las especialidades */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Legajo</th>
            <th>Matricula</th>
            <th>Especialidad</th> {/* Si necesitas alguna acción, como editar o eliminar */}
            <th>DNI</th>
            <th>Apellido y nombre</th>
            <th>Fecha inicio</th>
          </tr>
        </thead>
        <tbody>
          {
            medicsData?.reverse().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.medicRecord}</td>
                <td>{item.medicLicenceNumber}</td>
                <td>{item.specialty?.name}</td>
                <td>{item.personalInformation?.dni}</td>
                <td>{item.personalInformation?.lastName} {item.personalInformation?.firstName}</td>
                <td>{item.dateOfRegistration}</td>
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

export default MedicsList;
