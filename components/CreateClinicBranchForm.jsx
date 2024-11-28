import React, { useEffect,useRef } from 'react';
import { faker } from '@faker-js/faker';
import useStoreClinicBranchs from '../store/useClinicBranchsStore';



const CreateClinicBranchForm = () => {
    const {createClinicBranch} = useStoreClinicBranchs()
    const formRef = useRef()

   
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createClinicBranch(formValues)
    }

   
    const mockIt = () =>{
         formRef.current.name.value = faker.location.city()
    }

    return (
       <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Crear Sede</h1>
        <form onSubmit={handleSubmit}
          ref ={formRef}
        >

        
<div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Nombre Sede:</label>
          <input
            type="text"
            id="name"
            name="name"
        
            placeholder="Ingresar nombre sede..."
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
            Crear Sede
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

export default CreateClinicBranchForm;
