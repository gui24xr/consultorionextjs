import React from 'react';
import { useRef } from 'react';
import useStoreSpecialties from '../store/useStoreSpecialties';
import { faker } from '@faker-js/faker';
import "./styles/Forms.css"

const CreateSpecialtyForm = () => {
  const { createSpecialty } = useStoreSpecialties()
  const formRef = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const formValues = Object.fromEntries(formData.entries())
    //Lo mando a, store a crear, el mismo va a dar error o actualziar lista
    createSpecialty(formValues)
  }

  const mockIt = () => {
   const generatedSpecialty = faker.helpers.arrayElement(especialidadesMedicas)
    formRef.current.name.value = generatedSpecialty.nombre
    formRef.current.code.value = generatedSpecialty.codigo
  }

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Código de Especialidad:</label>
          <input type="text" id="code" name="code"/>
        </div>
        <div>
          <label htmlFor="name">Nombre de Especialidad:</label>
          <input type="text" id="name" name="name"/>
        </div>
        <button type="submit">Crear Especialidad </button>
      </form>
      <button type="button" onClick={mockIt}>Mockear Datos</button>
    </div>
  )
}

export default CreateSpecialtyForm;




//--------PARA MOCKEAR EL FORM

const especialidadesMedicas = [
  { nombre: "Cardiología", codigo: "CARD" },
  { nombre: "Neurología", codigo: "NEUR" },
  { nombre: "Pediatría", codigo: "PEDI" },
  { nombre: "Ortopedia", codigo: "ORTO" },
  { nombre: "Psiquiatría", codigo: "PSIQ" },
  { nombre: "Dermatología", codigo: "DERM" },
  { nombre: "Cirugía General", codigo: "CIRG" },
  { nombre: "Oftalmología", codigo: "OFTA" },
  { nombre: "Radiología", codigo: "RAD" },
  { nombre: "Anestesiología", codigo: "ANES" },
  { nombre: "Ginecología", codigo: "GINE" },
  { nombre: "Medicina de Emergencias", codigo: "EMER" },
  { nombre: "Medicina Interna", codigo: "MINT" }
];


