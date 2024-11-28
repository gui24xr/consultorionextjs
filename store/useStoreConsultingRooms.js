import {create} from 'zustand';
import axios from 'axios'

import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/consultingrooms'

const useStoreConsultingRooms = create((set,get) => ({
    consultingRoomsData:null,
    loading: false,
    error: null,

    fetchConsultingRoomsData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            //console.log(response.data)
            set({ consultingRoomsData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createConsultingRoom: async (formValues)=>{
        console.log(formValues)
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchConsultingRoomsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteConsultingRoom: async (consultingRoomId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:consultingRoomId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchConsultingRoomsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStoreConsultingRooms;
