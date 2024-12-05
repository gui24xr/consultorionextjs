import { create } from 'zustand'
import axios from 'axios'

const myUrl = 'https://huachitos.cl/api/animales/comuna/127'

export const useStoreAnimals = create ((set,get)=>({
    listaAnimales: null,

    fetchAnimals: async()=>{
       try{
        const result = await axios.get(myUrl)
        console.log(result.data.data)
        set({listaAnimales:result.data.data})

       }catch(err){
        console.error(err)
       }
    }

}))