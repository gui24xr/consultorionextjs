import React, { useState, useEffect } from 'react';
import useStoreSpecialties from '../store/useStoreSpecialties';
import './styles/SpecialtiesList.css'

const SpecialtiesList = () => {
  
  const { specialtiesData, fetchSpecialtiesData, deleteSpecialty } = useStoreSpecialties() 
  const [specialtiesList, setSpecialtiesList] = useState([]);

  useEffect(() => {
    fetchSpecialtiesData()
  }, [fetchSpecialtiesData]);

  useEffect(() => {
    if (specialtiesData?.length) {
      setSpecialtiesList(specialtiesData);
    }
  }, [specialtiesData]);

  const handlerDeleteBtn = (specialtyId) =>{
    deleteSpecialty(specialtyId)
  }

  return (
    <div>
      <h3>Lista de Especialidades</h3>
      
      {/* Tabla para mostrar las especialidades */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Acción</th> {/* Si necesitas alguna acción, como editar o eliminar */}
          </tr>
        </thead>
        <tbody>
          {
            specialtiesList?.reverse().map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.code}</td>
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

export default SpecialtiesList;
