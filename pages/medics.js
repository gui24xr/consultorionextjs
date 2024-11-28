import { useState,useEffect } from 'react';
import  axios from 'axios';
import CreateMedicForm from '../components/CreateMedicForm';
import MedicsList from '../components/MedicsList';

export default function Medics() {





  return (
    <div>
        <CreateMedicForm/>
        <MedicsList/>
    </div>
  );
}
