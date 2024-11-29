import React from 'react';
import CreateHealthProviderForm from '../components/CreateHealthProviderForm';
import HealthProvidersList from '../components/HealthProvidersList';
import CreatePatientHealthProviderForm from '../components/CreatePatientHealthProviderForm';
import PatientHealthProvidersList from '../components/PatientHealthProvidersList';


const Healthsproviders = () => {
    return (
        <div style={{ display: 'flex', padding: '20px'}}>
            <div>
                <CreateHealthProviderForm/>
                <HealthProvidersList/>
           </div>
            <div>
                <CreatePatientHealthProviderForm/>
                <PatientHealthProvidersList/>
            </div>
          

        </div>
    );
}

export default Healthsproviders;
