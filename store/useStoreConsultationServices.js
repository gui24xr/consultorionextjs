import {create} from 'zustand';
import axios from 'axios'
import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/consultationservices'



const useStoreConsultationServices = create((set,get) => ({
    consultationServicesData:null,
    loading: false,
    error: null,

    fetchConsultationServicesData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            console.log(response.data)
            set({ consultationServicesData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createConsultationService: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchConsultationServicesData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteConsultationService: async (consultationServiceId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:consultationServiceId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchConsultationServicesData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStoreConsultationServices;
