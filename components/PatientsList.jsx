import React, { useState, useEffect } from 'react';
import useStorePatients from '../store/useStorePatients';
import './styles/SpecialtiesList.css'

const PatientsList = () => {
  
  const { patientsData, fetchPatientsData, deletePatient } = useStorePatients() 


  useEffect(() => {
    fetchPatientsData()
  }, []);

  
  const handlerDeleteBtn = (patientId) =>{
    deletePatient(patientId)
  }

  return (
    <div>
      <h3>Lista de Pacientes</h3>
      
      {/* Tabla para mostrar las especialidades */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Legajo</th>
            <th>Fecha de nacimiento</th>
            <th>Fecha de registracion</th> {/* Si necesitas alguna acción, como editar o eliminar */}
            <th>DNI</th>
            <th>Apellido y nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
            patientsData?.reverse().map((item) => (
              <tr key={item.patientId}>
                <td>{item.patientId}</td>
                <td>{item.patientRecord}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.dateOfRegistration}</td>
                <td>{item.personalData?.dni}</td>
                <td>{item.personalData?.lastName} {item.personalData?.firstName}</td>
                <td>{item.personalData?.email}</td>
                <td>
                  {/* Aquí puedes agregar botones para acciones adicionales */}
                  <button>Ver más</button>
                  <button type='button' onClick={()=>handlerDeleteBtn(item.patientId)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default PatientsList;
