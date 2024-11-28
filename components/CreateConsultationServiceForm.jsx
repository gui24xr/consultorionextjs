import React, { useEffect, useRef } from 'react';
import useStoreMedics from '../store/useStoreMedics';
import useStoreSpecialties from '../store/useStoreSpecialties';
import useStoreConsultationServices from '../store/useStoreConsultationServices';
import useStoreConsultingRooms from '../store/useStoreConsultingRooms';



const CreateConsultationServiceForm = () => {

    const {createConsultationService} = useStoreConsultationServices()
    const {specialtiesData, fetchSpecialtiesData} = useStoreSpecialties()
    const {medicsData,fetchMedicsData} = useStoreMedics()
    const {consultingRoomsData, fetchConsultingRoomsData} = useStoreConsultingRooms()
    const formRef = useRef()

    useEffect(()=>{
        fetchSpecialtiesData(),
        fetchMedicsData(),
        fetchConsultingRoomsData()

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createConsultationService(formValues)
    }

    const mockIt = () =>{
        //Usando facker y con formData llena el form??
    /*     console.log(formRef.current.dni.value)
         formRef.current.dni.value = faker.string.numeric(8)
         formRef.current.firstName.value = faker.person.firstName()
         formRef.current.lastName.value = faker.person.lastName()
         formRef.current.medicRecord.value = faker.string.alphanumeric(6)
         formRef.current.medicLicenceNumber.value = faker.string.alphanumeric(10)
         formRef.current.dateOfRegistration.value = faker.date.past().toISOString().split('T')[0]
         */alert('Mokckit aun no implemnetado')
    }


    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Crear servicio de consulta</h1>
      <form onSubmit={handleSubmit}
        ref ={formRef}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="serviceName">Nombre servicio:</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            placeholder="Ejemplo: 256789012345"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

   
     
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pais">Seleccionar especialidad:</label>
          <select
            id="specialties"
             name="specialtyId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            specialtiesData?.map(item => (<option 
                key={item.specialtyId} 
                value={item.specialtyId}>{item.name}/{item.code}
                </option>))
          }
         </select> 
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="medicId">Seleccionar medico:</label>
          <select
            id="medicId"
             name="medicId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            medicsData?.map(item => (<option 
                key={item.medicId} 
                value={item.medicId}>
                  <span style={{ fontWeight: 'bold'}}>{item.personalData?.lastName} {item.personalData?.firstName}</span> /
                  {item.specialty?.name} // 
                  Legajo:{item.medicRecord}'
                </option>))
          }
         </select> 
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="consultingRoomId">Seleccionar consultorio:</label>
          <select
            id="consultingRoomId"
             name="consultingRoomId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            consultingRoomsData?.map(item => (<option 
                key={item.consultingRoomId} 
                value={item.consultingRoomId}>{item.name}
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
          Crear servicio de consulta
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

export default CreateConsultationServiceForm;
