import React from 'react';
import { useRef } from 'react';
import useStoreSpecialties from '../store/useStoreSpecialties';
import { faker } from '@faker-js/faker';


const CreateSpecialtyForm = () => {

    const {createSpecialty} = useStoreSpecialties()
    const formRef = useRef()
    const handleSubmit = (e) => {
         e.preventDefault();
         const formData = new FormData(e.target)
         const formValues = Object.fromEntries(formData.entries())
         //Lo mando a, store a crear, el mismo va a dar error o actualziar lista
         createSpecialty(formValues)
    }

    
   
    const mockIt = () =>{
      //Usando facker y con formData llena el form??
       const generatedSpecialty = faker.helpers.arrayElement(especialidadesMedicas)
       formRef.current.name.value = generatedSpecialty.nombre
       formRef.current.code.value = generatedSpecialty.codigo
    
  }
     
    return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
 
      <form ref={formRef}onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="code" style={{ display: 'block' }}>
            Código de Especialidad:
          </label>
          <input
            type="text"
            id="code"
            name="code"
            
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block' }}>
            Nombre de Especialidad:
          </label>
          <input
            type="text"
            id="name"
            name="name"
         
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Crear Especialidad
        </button>
  
      </form>

      <button
          type="button"
          onClick={mockIt}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            width: '100%'
          }}
        >
          Mockear Datos
        </button>

    </div>
    );
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


