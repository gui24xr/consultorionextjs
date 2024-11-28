import React, { useEffect, useRef } from 'react';
import useStorePatients from '../store/useStorePatients';
import { faker } from '@faker-js/faker';



const CreatePatientForm = () => {

    const { createPatient } = useStorePatients()
    const formRef = useRef() //Para mockear el form

        

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createPatient(formValues)
    }

   
    const mockIt = () =>{
        //Usando facker y con formData llena el form??
         console.log(formRef.current.dni.value)
         formRef.current.dni.value = faker.string.numeric(8)
         formRef.current.firstName.value = faker.person.firstName()
         formRef.current.lastName.value = faker.person.lastName()
         formRef.current.patientRecord.value = faker.string.alphanumeric(6)
         formRef.current.dateOfBirth.value = faker.date.birthdate().toISOString().split('T')[0]
         formRef.current.dateOfRegistration.value = faker.date.past().toISOString().split('T')[0]
    }

    return (
      
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Crear Paciente</h1>
      <form onSubmit={handleSubmit}
        ref ={formRef}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
        
            placeholder="Ejemplo: 256789012345"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
       
            placeholder="Ejemplo: Joséte"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"

            placeholder="Ejemplo: Pez"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="patientRecord">Patient Record:</label>
          <input
            type="text"
            id="patientRecord"
            name="patientRecord"
            placeholder="Ejemplo: 2AAA24"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

      
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dateOfBirth">Fecha de nacimiento:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="registrationDate">Fecha ingreso:</label>
          <input
            type="date"
            id="dateOfRegistration"
            name="dateOfRegistration"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>      

        <button
          type="submit"
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
          Crear paciente
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

export default CreatePatientForm;
