import React, { useEffect, useRef } from 'react';
import useStoreMedics from '../store/useStoreMedics';
import useStoreSpecialties from '../store/useStoreSpecialties';
import { faker } from '@faker-js/faker';



const CreatePatientForm = () => {

    const { createMedic } = useStoreMedics()
    const { specialtiesData, fetchSpecialtiesData} = useStoreSpecialties()
    const formRef = useRef() //Para mockear el form

    useEffect(()=>{
        fetchSpecialtiesData() //Para cargar el select
    },[])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createMedic(formValues)
    }

   
    const mockIt = () =>{
        //Usando facker y con formData llena el form??
         console.log(formRef.current.dni.value)
         formRef.current.dni.value = faker.string.numeric(8)
         formRef.current.firstName.value = faker.person.firstName()
         formRef.current.lastName.value = faker.person.lastName()
         formRef.current.medicRecord.value = faker.string.alphanumeric(6)
         formRef.current.medicLicenceNumber.value = faker.string.alphanumeric(10)
    }

    return (
      
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Crear Médico</h1>
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
          <label htmlFor="medicRecord">Medic Record:</label>
          <input
            type="text"
            id="medicRecord"
            name="medicRecord"
            placeholder="Ejemplo: 2AAA24"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="medicLicenceNumber">Medic Licence Number:</label>
          <input
            type="text"
            id="medicLicenceNumber"
            name="medicLicenceNumber"
            placeholder="Ejemplo: 224AQW"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
        <label htmlFor="pais">Seleccionar especialidad:</label>
        <select
          id="specialtyId"
          name="specialtyId" >
          {
            specialtiesData?.map(item => (<option 
                key={item.id} 
                value={item.id}>{item.name}/{item.code}
                </option>))
          }
        </select> 
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
          Crear Médico
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
