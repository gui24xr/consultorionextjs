import React from 'react';
import CreateClinicBranchForm from '../components/CreateClinicBranchForm';
import ClinicBranchsList from '../components/ClinicBranchsList';
import CreateConsultingRoomForm from '../components/CreateConsultingRoomForm';
import ConsultingRoomsList from '../components/ConsultingRoomsList';

const Rooms = () => {
    return (
        <div style={{ display: 'flex', padding: '20px'}}>
            <div>
                <CreateClinicBranchForm/>
                <ClinicBranchsList/>
           </div>
            <div>
            <CreateConsultingRoomForm/>
            <ConsultingRoomsList/>
            </div>
          

        </div>
    );
}

export default Rooms;
