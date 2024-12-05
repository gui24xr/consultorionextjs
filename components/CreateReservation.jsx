import React, { useEffect,useRef } from 'react';
import { faker } from '@faker-js/faker';
import useStoreReservations from '../store/useStoreReservations';
import useStorePatients from '../store/useStorePatients';
import useStoreAppointments from '../store/useStoreAppointments';

const CreateReservation = () => {

    const { createReservation } = useStoreReservations()
    const { fetchPatientsData, patientsData } = useStorePatients()
    const { fetchAppointmentsData, appointmentsData } = useStoreAppointments()
    const formRef = useRef() //Para mockear el form

    useEffect(()=>{
        fetchPatientsData()
        fetchAppointmentsData()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createReservation(formValues)
    }

    
    const mockIt = () =>{
       formRef.current.code.value = faker.string.alphanumeric(6)
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Crear Reserva</h1>
        <form onSubmit={handleSubmit}
          ref ={formRef}
        >

        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="dateOfBirth">Codigo Reserva:</label>
            <input
              type="code"
              id="code"
              name="code"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
  
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pais">Turno:</label>
          <select
            id="appointmentId"
             name="appointmentId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            appointmentsData?.map(item => (<option 
                key={item.id} 
                value={item.id}>
                    {item.consultationServiceData?.serviceName} -- {"Turno num " + item.appointmentNumber} -- {item.date} --{item.hour}
                </option>))
          }
         </select> 
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pais">Paciente:</label>
          <select
            id="patientId"
             name="patientId"
             style={{ width: '100%', padding: '8px' }}
             >
          {
            patientsData?.map(item => (<option 
                key={item.id} 
                value={item.id}>
                    {"Leg:"+ item.patientRecord + " - " +item.personalData?.lastName + " - " +item.personalData?.firstName}  
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
            Crear reserva
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

export default CreateReservation;
