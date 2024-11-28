import {create} from 'zustand';
import axios from 'axios'
import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/medics'

const useStoreMedics = create((set,get) => ({
    medicsData:null,
    loading: false,
    error: null,

    fetchMedicsData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            set({ medicsData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createMedic: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchMedicsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteMedic: async (medicId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:medicId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchMedicsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStoreMedics;
