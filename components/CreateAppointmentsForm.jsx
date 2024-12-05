import React, { useEffect,useRef } from 'react';
import { faker } from '@faker-js/faker';
import useStoreConsultationServices from '../store/useStoreConsultationServices';
import useStoreAppointments from '../store/useStoreAppointments';

const CreateAppointmentsForm = () => {

    const {createAppointment} = useStoreAppointments() 
    const {consultationServicesData,fetchConsultationServicesData} = useStoreConsultationServices()
      const formRef = useRef() //Para mockear el form

    useEffect(()=>{
        fetchConsultationServicesData()
    },[])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createAppointment(formValues)
    }

   
    const mockIt = () =>{
        const randomDate = faker.date.future()
        const randomDateHour = randomDate.getHours() < 10 ? ('0' + randomDate.getHours().toString()) : (randomDate.getHours().toString())
        const randomDateMinutes = randomDate.getMinutes() < 10 ? ('0' + randomDate.getMinutes().toString()) : (randomDate.getMinutes().toString())
        const randomHour = randomDateHour + ':' + randomDateMinutes
         
        formRef.current.date.value = randomDate.toISOString().split('T')[0]
        formRef.current.hour.value = randomHour
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Crear Turno</h1>
        <form onSubmit={handleSubmit}
          ref ={formRef}
        >

        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pais">Servicio de consulta:</label>
          <select
            id="consultationServiceId"
             name="consultationServiceId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            consultationServicesData?.map(item => (<option 
                key={item.id} 
                value={item.id}>{item.serviceName}
                </option>))
          }
         </select> 
        </div>

        <div style={{ marginBottom: '10px' }}>
          <p>Seleccionar tipo de turno:</p>
          <input type="radio" id="turno" name="appointmentType" value="Turno"/>
          <label for="html">Turno</label><br/>
          <input type="radio" id="sobreturno" name="appointmentType" value="Sobreturno"/>
          <label for="css">Sobreturno</label><br/>
        </div>
      
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              name="date"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="dateOfBirth">Hora:</label>
            <input
              type="time"
              id="hour"
              name="hour"
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
            Crear turno
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

export default CreateAppointmentsForm;
