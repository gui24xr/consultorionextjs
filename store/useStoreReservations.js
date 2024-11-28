import {create} from 'zustand';
import axios from 'axios'
import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/reservations'

const useStoreReservations = create((set,get) => ({
    reservationsData:null,
    loading: false,
    error: null,

    fetchReservationsData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            //console.log(response.data)
            set({ reservationsData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createReservation: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchReservationsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteReservation: async (reservationId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:reservationId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchReservationsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStoreReservations;
