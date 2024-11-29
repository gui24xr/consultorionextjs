import {create} from 'zustand';
import axios from 'axios'

import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/patienthealths'

const useStorePatientHealthProviders = create((set,get) => ({
    patientHealthProvidersData:null,
    loading: false,
    error: null,

    fetchPatientHealthProvidersData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            //console.log(response.data)
            set({ patientHealthProvidersData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createPatientHealthProvider: async (formValues)=>{
        console.log(formValues)
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchPatientHealthProvidersData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deletePatientHealthProvider: async (patientHealthProviderId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:patientHealthProviderId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchPatientHealthProvidersData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStorePatientHealthProviders;
