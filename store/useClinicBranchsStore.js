import {create} from 'zustand';
import axios from 'axios'
import {baseURLApi} from '../constants/constants.js'

const baseURL = baseURLApi + '/clinicbranchs'

const useStoreClinicBranchs = create((set,get) => ({
    clinicBranchsData:null,
    loading: false,
    error: null,

    fetchClinicBranchsData: async ()=>{
        set({ loading: true, error: null });
        try {
         
            const response = await axios.get(baseURL);  
            //console.log(response.data)
            set({ clinicBranchsData: response.data, loading: false });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
    },

    createClinicBranch: async (formValues)=>{
        set({ loading: true, error: null });
        try{
           await axios.post(baseURL,formValues)
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchClinicBranchsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    },

    deleteClinicBranch: async (clinicBranchId)=>{
        set({ loading: true, error: null });
        try{
        const queryParams = {id:clinicBranchId}
           await axios.delete(baseURL, { params: queryParams })
            //SI salio todo ok pedimos al mismo state que actualice ka data
            get().fetchClinicBranchsData()
            //No vuelvo a ponr loading false xq se encargara el fetch
        }catch(error){
            console.error(error)
            set({ error: error.message, loading: false });
        }
    }
}));

export default useStoreClinicBranchs;
