// store/useStore.js

import {create} from 'zustand';
import axios from 'axios'

import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/specialties'
//const baseURL = 'http://localhost:8080/api/specialties'

const useStoreSpecialties = create((set,get) => ({
    specialtiesData: null,
    loading: false,
    error: null,

    fetchSpecialtiesData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            set({ specialtiesData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createSpecialty: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchSpecialtiesData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteSpecialty: async (specialtyId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:specialtyId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchSpecialtiesData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }

   
}))

export default useStoreSpecialties;
