import React, { useEffect,useRef } from 'react';
import { faker } from '@faker-js/faker';
import useStoreConsultingRooms from '../store/useStoreConsultingRooms';
import useStoreClinicBranchs from '../store/useClinicBranchsStore';

const CreateConsultingRoomForm = () => {
    const {createConsultingRoom} = useStoreConsultingRooms()
    const {fetchClinicBranchsData, clinicBranchsData} = useStoreClinicBranchs()
    const formRef = useRef() //Para mockear el form

    useEffect(()=>{
        fetchClinicBranchsData()
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createConsultingRoom(formValues)
    }

   
    const mockIt = () =>{
         formRef.current.name.value = 'Consultorio ' + faker.number.int({max:30}).toString()
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Crear Consultorio</h1>
        <form onSubmit={handleSubmit}
          ref ={formRef}
        >

        
<div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Sede:</label>
          <input
            type="text"
            id="name"
            name="name"
        
            placeholder="Ingresar nombre sede..."
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="clinicBranchId">Sede:</label>
          <select
            id="clinicBranchId"
             name="clinicBranchId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            clinicBranchsData?.map(item => (<option 
                key={item.clinicBranchId} 
                value={item.clinicBranchId}>{item.name}
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
            Crear consultorio
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

export default CreateConsultingRoomForm;
