import {create} from 'zustand';
import axios from 'axios'
import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/patients'

const useStorePatients = create((set,get) => ({
    patientsData:null,
    loading: false,
    error: null,

    fetchPatientsData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            set({ patientsData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createPatient: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchPatientsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deletePatient: async (medicId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:medicId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchPatientsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStorePatients;
