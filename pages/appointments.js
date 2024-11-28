import React from 'react';
import CreateAppointmentsForm from '../components/CreateAppointmentsForm';
import AppointmentsList from '../components/AppointmentsList';
import CreateReservation from '../components/CreateReservation';
import ReservationsList from '../components/ReservationsList';


const Appointments = () => {
    return (
       
          
         <div style={{ display: 'flex', padding: '20px'}}>
        <div>
            <CreateAppointmentsForm/>
            <AppointmentsList/>
        </div>
        <div>
            <CreateReservation/>
            <ReservationsList/>
            </div>
        </div>
    );
}

export default Appointments;
