import React,{useEffect,useRef} from 'react';
import useStorePatientHealthProviders from '../store/useStorePatientHealthProvider';
import useStorePatients from '../store/useStorePatients';
import useStoreHealthProviders from '../store/useHealthProvidersStore';
import { faker } from '@faker-js/faker';
const CreatePatientHealthProviderForm = () => {
    const formRef = useRef()
    const {createPatientHealthProvider} = useStorePatientHealthProviders()
    const {fetchHealthProvidersData, healthProvidersData} = useStoreHealthProviders()
    const {patientsData,fetchPatientsData} = useStorePatients()
 
    useEffect(()=>{
     fetchHealthProvidersData() //Para cargar el select
     fetchPatientsData()
 },[])
    
    const handleSubmit = (e) => {
     e.preventDefault();
     const formData = new FormData(e.target)
     const formValues = Object.fromEntries(formData.entries())
     //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
     createPatientHealthProvider(formValues)
 }
 
 
 
  const mockIt = () =>{
     
      formRef.current.memberNumber.value = faker.string.alphanumeric(16)
     
 }
 
     return (
         <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
         <h1>Crear Datos Obra Social paciente</h1>
         <form onSubmit={handleSubmit} ref={formRef}>
 
         <div style={{ marginBottom: '10px' }}>
           <label htmlFor="pais">Paciente:</label>
           <select
             id="patientId"
              name="patientId"
              style={{ width: '100%', padding: '8px' }}
              >
           {
             patientsData?.map(item => (<option 
                 key={item.patientId} 
                 value={item.patientId}>
                     {"Leg:"+ item.patientRecord + " - " +item.personalData?.memberNumber + " - " +item.personalData?.firstName}  
                 </option>))
           }
          </select> 
         </div>
 
 
         <div style={{ marginBottom: '10px' }}>
           <label htmlFor="pais">Obra Social/Plan:</label>
           <select
             id="healthProviderId"
              name="healthProviderId"
              style={{ width: '100%', padding: '8px' }}
              >
           {
             healthProvidersData?.map(item => (<option 
                 key={item.healthProviderId} 
                 value={item.healthProviderId}>
                     { item.providerName + " -- " + item.planName}  
                 </option>))
           }
          </select> 
         </div>
 
         <div style={{ marginBottom: '10px' }}>
           <label htmlFor="memberNumber">Numero de afiliado:</label>
           <input
             type="text"
             id="memberNumber"
             name="memberNumber"
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
             Crear datos de obra social
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

export default CreatePatientHealthProviderForm;
