import React, {  useEffect } from 'react';
import useStoreMedics from '../store/useStoreMedics';
import './styles/SpecialtiesList.css'

const MedicsList = () => {
  
  const { medicsData, fetchMedicsData, deleteMedic } = useStoreMedics() 


  useEffect(() => {
    fetchMedicsData()
  }, []);

  
  const handlerDeleteBtn = (medicId) =>{
    deleteMedic(medicId)
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
              <tr key={item.medicId}>
                <td>{item.medicId}</td>
                <td>{item.medicRecord}</td>
                <td>{item.medicLicenceNumber}</td>
                <td>{item.specialty?.name}</td>
                <td>{item.personalData?.dni}</td>
                <td>{item.personalData?.lastName} {item.personalData?.firstName}</td>
                <td>{item.dateOfRegistration}</td>
                <td>
                  {/* Aquí puedes agregar botones para acciones adicionales */}
                  <button>Ver más</button>
                  <button type='button' onClick={()=>handlerDeleteBtn(item.medicId)}>Eliminar</button>
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
