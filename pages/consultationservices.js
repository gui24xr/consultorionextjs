import React from 'react';
import CreateConsultationServiceForm from '../components/CreateConsultationServiceForm';
import ConsultationsServiceList from '../components/ConsultationsServiceList';

const Consultationservices = () => {
    return (
        <div>
            <CreateConsultationServiceForm/>
            <ConsultationsServiceList/>
        </div>
    );
}

export default Consultationservices;
